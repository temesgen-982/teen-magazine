import { fail, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	// Fetch available categories
	const { data: categories, error: categoryError } = await supabase
		.from('announcement_categories')
		.select('id, name')
		.order('name');

	if (categoryError) {
		error(500, 'Could not fetch announcement categories. Please try again.');
	}

	return {
		categories
	};
};

export const actions: Actions = {
	default: async ({ request, locals: { supabase, session } }) => {
		const formData = await request.formData();
    const title = formData.get('title') as string;
		const message = formData.get('message') as string;
		const imageFile = formData.get('image') as File | null;
		const isActive = formData.get('is_active') === 'on';
    const published_by = formData.get('published_by') as string;
		const categoryId = formData.get('category_id') as string;

		if (!message || !categoryId) {
			return fail(400, { error: 'Message and Category are required.' });
		}

		let imageUrl: string | null = null;

		if (imageFile && imageFile.size > 0) {
			const imageName = `${crypto.randomUUID()}-${imageFile.name}`;
			const { error: uploadError } = await supabase.storage
				.from('announcement-images')
				.upload(imageName, imageFile);

			if (uploadError) {
				return fail(500, { error: 'Failed to upload image.' });
			}
			
			const { data } = supabase.storage.from('announcement-images').getPublicUrl(imageName);
			imageUrl = data.publicUrl;
		}

		const { error: dbError } = await supabase.from('announcements').insert({
      title,
			message,
			image_url: imageUrl,
			is_active: isActive,
			created_by: session?.user.id,
      published_by,
			category_id: categoryId,
		});

		if (dbError) {
			console.error('Announcement insert error:', dbError);
			return fail(500, { error: 'Failed to save announcement.' });
		}

		return { success: true };
	}
};
