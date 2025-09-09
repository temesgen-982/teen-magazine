<script lang="ts">
	import AnnouncementCard from '$lib/components/AnnouncementCard.svelte';

	let { data } = $props();
</script>

<div class="container mx-auto px-4 py-12">
	<h1 class="mb-12 text-center text-4xl font-bold">Announcements</h1>

	{#if data.announcements.length > 0}
		<div class="mx-auto max-w-3xl space-y-8">
			{#each data.announcements as announcement (announcement.id)}
				<AnnouncementCard {announcement} />
			{/each}
		</div>
	{:else}
		<p class="text-center text-gray-500">There are no announcements at this time.</p>
	{/if}
</div>
