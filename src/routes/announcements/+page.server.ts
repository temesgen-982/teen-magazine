import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {

    const { data: announcements, error: dbError } = await supabase
        .from('announcements')
        .select(`
          *,
          announcement_categories ( name )`)
        .order('created_at', { ascending: false });

    if (dbError) {
        console.error('Error fetching announcements:', dbError);
        error(500, 'Could not fetch announcements at this time. Please try again later.');
    }
    
    return {
        announcements
    };
};
