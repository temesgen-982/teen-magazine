import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { supabase, session } }) => {
	const { data: edition, error: editionError } = await supabase
		.from('editions')
		.select('*')
		.eq('id', params.id)
		.single();

	if (editionError || !edition) {
		error(404, 'Edition not found.');
	}

	if (!edition.file_url) {
		error(500, 'This edition does not have a file associated with it.');
	}

	const { data: signedUrlData, error: urlError } = await supabase
		.storage
		.from('edition-files')
		.createSignedUrl(edition.file_url, 60 * 60);

	if (urlError) {
		console.error("Signed URL Error:", urlError);
		error(500, 'Could not retrieve magazine file.');
	}
	
if (session) {
		// create a new history record or update an existing one.
		supabase
			.from('reading_history')
			.upsert({
				user_id: session.user.id,
				edition_id: params.id,
				last_read_at: new Date().toISOString()
			}, {
				onConflict: 'user_id,edition_id'
			})
			.then(({ error }) => {
				if (error) console.error('Error recording reading history:', error);
			});
	}

	return {
		edition,
		signedPdfUrl: signedUrlData.signedUrl,
	};
};
