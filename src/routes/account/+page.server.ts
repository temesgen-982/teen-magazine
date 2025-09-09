import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase, session } }) => {
	if (!session) {
		error(401, 'Unauthorized');
	}

	// JOIN query.
	const { data: readingHistory, error: dbError } = await supabase
		.from('reading_history')
		.select(`
			last_read_at,
			editions (
				*
			)
		`)
		.eq('user_id', session.user.id)
		.order('last_read_at', { ascending: false });

	if (dbError) {
		console.error('Error fetching reading history:', dbError);
		error(500, 'Could not fetch your reading history.');
	}

	return {
		history: readingHistory
	};
};
