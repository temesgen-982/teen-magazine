import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals: { supabase, session } }) => {
		const formData = await request.formData();

		// --- 1. Get all form data, including files ---
		const title = formData.get('title') as string;
		const description = formData.get('description') as string;
		const published_at = formData.get('published_at') as string;
		const coverImageFile = formData.get('cover_image') as File;
		const editionFile = formData.get('edition_file') as File;

		// --- Basic Validation ---
		if (!title || !published_at || !coverImageFile || !editionFile) {
			return fail(400, { error: 'All fields are required.' });
		}
		if (coverImageFile.size === 0 || editionFile.size === 0) {
			return fail(400, { error: 'Please select a valid file for both cover image and edition.' });
		}

		// --- 2. Upload the Cover Image (Public Bucket) ---
		// We'll create a unique file name to avoid conflicts
		const coverImageName = `${crypto.randomUUID()}-${coverImageFile.name}`;
		const { error: coverUploadError } = await supabase.storage
			.from('cover-images') // Your PUBLIC bucket
			.upload(coverImageName, coverImageFile);

		if (coverUploadError) {
			console.error('Error uploading cover image:', coverUploadError);
			return fail(500, { error: 'Could not upload cover image.' });
		}

		// --- 3. Upload the Edition File (Private Bucket) ---
		const editionFileName = `${crypto.randomUUID()}-${editionFile.name}`;
		const { error: editionUploadError } = await supabase.storage
			.from('edition-files') // Your PRIVATE bucket
			.upload(editionFileName, editionFile);

		if (editionUploadError) {
			console.error('Error uploading edition file:', editionUploadError);
			// Optional: Clean up by deleting the cover image we just uploaded
			await supabase.storage.from('cover-images').remove([coverImageName]);
			return fail(500, { error: 'Could not upload edition file.' });
		}
		
		// --- 4. Get the public URL for the cover image ---
		const { data: { publicUrl: cover_image_url } } = supabase.storage
			.from('cover-images')
			.getPublicUrl(coverImageName);

		// --- 5. Insert the metadata into the database ---
		const { error: dbError } = await supabase.from('editions').insert({
			title,
			description,
			published_at,
			cover_image_url: cover_image_url,      // The public URL
			file_url: editionFileName,           // Just the path for the private file
			created_by: session?.user.id,
		});

		if (dbError) {
			console.error('Error inserting edition metadata:', dbError);
			// Clean up both uploaded files on database error
			await supabase.storage.from('cover-images').remove([coverImageName]);
			await supabase.storage.from('edition-files').remove([editionFileName]);
			return fail(500, { error: 'Could not save edition to the database.' });
		}
		
		return { success: true };
	},
};
