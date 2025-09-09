<script lang="ts">
	import type { AnnouncementWithCategory } from '$lib/types';
	import AnnouncementCard from '$lib/components/AnnouncementCard.svelte';
	import { Button } from '$lib/components/ui/button';

	let { announcements }: { announcements: AnnouncementWithCategory[] } = $props();
</script>

<section class="container mx-auto px-4">
	<div class="text-center">
		<h2 class="text-4xl font-bold">Latest Announcements</h2>
		<p class="mx-auto mt-2 max-w-2xl text-gray-600 dark:text-gray-400">
			Stay updated with scholarship opportunities, upcoming events, volunteer programs, and exciting
			meetings that can shape your future.
		</p>
	</div>

	<div class="mx-auto mt-12 max-w-3xl space-y-8">
		{#each announcements as announcement (announcement.title)}
			<AnnouncementCard {announcement} />
		{/each}
	</div>

	<div class="mt-12 text-center">
		<a href="/announcements">
			<Button variant="outline">View all announcements</Button>
		</a>
	</div>
</section>
