import { supabaseAdmin } from '$lib/server/supabase-admin';
import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals: { session } }) => {

    // Use ADMIN client to fetch a list of all users from the `auth.users` table.
    const { data: users, error: listUsersError } = await supabaseAdmin.auth.admin.listUsers();

    if (listUsersError) {
        error(500, 'Failed to fetch users.');
    }

    // Fetch their corresponding roles from our `profiles` table.
    const { data: profiles, error: profilesError } = await supabaseAdmin
        .from('profiles')
        .select('id, role');
    
    if (profilesError) {
        error(500, 'Failed to fetch user profiles.');
    }

    // Combine the two lists into a single, useful object.
    const usersWithRoles = users.users.map(user => {
        const profile = profiles.find(p => p.id === user.id);
        return {
            ...user,
            role: profile?.role || 'user' // Default to 'user' if no profile exists
        };
    });

usersWithRoles.sort((a, b) => {
		// Primary sort: admins always come before users.
		if (a.role === 'admin' && b.role !== 'admin') {
			return -1; // `a` comes first
		}
		if (b.role === 'admin' && a.role !== 'admin') {
			return 1; // `b` comes first
		}
		
		// Secondary sort: if roles are the same, sort alphabetically by email.
		return a.email.localeCompare(b.email);
	});

    return {
        users: usersWithRoles,
        session
    };
};

export const actions: Actions = {
    updateRole: async ({ request, locals: { supabase } }) => {
        const formData = await request.formData();
        const userId = formData.get('userId') as string;
        const newRole = formData.get('newRole') as string;

        if (!userId || !newRole) {
            return fail(400, { message: 'User ID and new role are required.' });
        }

        // Use the ADMIN client to update the profiles table, bypassing RLS.
        const { error: updateError } = await supabaseAdmin
            .from('profiles')
            .update({ role: newRole })
            .eq('id', userId);

        if (updateError) {
            return fail(500, { message: 'Failed to update user role.' });
        }

        return { success: true };
    },
deleteUser: async ({ request, locals: { session } }) => {
		const formData = await request.formData();
		const userIdToDelete = formData.get('userId') as string;

		if (!userIdToDelete) {
			return fail(400, { message: 'User ID is required.' });
		}
		
		// Prevent an admin from accidentally deleting themselves
		if (userIdToDelete === session?.user.id) {
			return fail(400, { message: 'You cannot delete your own account from the admin panel.' });
		}

		// Use the ADMIN client to delete the user.
		// This will remove the user from `auth.users`
		// Because we have "on delete cascade" in the profiles table, their profile will be deleted too.
		const { data, error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
			userIdToDelete
		);

		if (deleteError) {
			console.error('Error deleting user:', deleteError);
			return fail(500, { message: 'Failed to delete user.' });
		}

		return { success: true, message: `User ${data.user.email} has been deleted.` };
	}
};
