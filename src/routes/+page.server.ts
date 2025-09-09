import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
	const [latestEditionRes, recentEditionsRes, recentAnnouncementsRes] = await Promise.all([
		// Get the single most recent edition for the hero section
		supabase
			.from('editions')
			.select('*')
			.order('published_at', { ascending: false })
			.limit(1)
			.single(),

		// Get the next 4 recent editions for the preview grid
		supabase
			.from('editions')
			.select('*')
			.order('published_at', { ascending: false })
			.range(1, 4), // Skip the first one (which is in the hero) and get the next 4

		// Get the 3 most recent announcements for the announcement preview
		supabase
			.from('announcements')
			.select('*, announcement_categories(name)')
			.order('created_at', { ascending: false })
			.limit(3)
	]);

	if (latestEditionRes.error || recentEditionsRes.error || recentAnnouncementsRes.error) {
		console.error("Homepage data fetch error:", latestEditionRes.error || recentEditionsRes.error || recentAnnouncementsRes.error);
		error(500, 'Failed to load homepage content.');
	}

	return {
		latestEdition: latestEditionRes.data,
		recentEditions: recentEditionsRes.data,
		recentAnnouncements: recentAnnouncementsRes.data
	};
};
