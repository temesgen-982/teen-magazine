import { redirect, error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { session, profile } }) => {

    if (!session) {
        redirect(303, '/login');
    }

    if (profile?.role !== 'admin') {
        error(403, 'Forbidden: You do not have permission to access the admin dashboard.');
    }

    return {
        session,
        profile
    };
};
