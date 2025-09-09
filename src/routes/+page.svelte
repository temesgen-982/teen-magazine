<script lang="ts">
	import Hero from '$lib/components/homepage/Hero.svelte';
	import EditionsPreview from '$lib/components/homepage/EditionsPreview.svelte';
	import AnnouncementsPreview from '$lib/components/homepage/AnnouncementsPreview.svelte';

	let { data } = $props();
</script>

<div class="space-y-24 md:space-y-32">
	<Hero edition={data.latestEdition} />
	<EditionsPreview editions={data.recentEditions} />
	<AnnouncementsPreview announcements={data.recentAnnouncements} />
</div>
