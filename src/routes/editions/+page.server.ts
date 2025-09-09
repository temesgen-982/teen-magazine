import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {

    const { data: editions, error: dbError } = await supabase
        .from('editions')
        .select('*')
        .order('published_at', { ascending: false });

    if (dbError) {
        console.error('Error fetching editions:', dbError);
        error(500, 'Could not fetch editions at this time. Please try again later.');
    }
    
    return {
        editions
    };
};
