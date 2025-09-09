<script lang="ts">
	import type { Edition } from '$lib/types';
	import EditionCard from '$lib/components/EditionCard.svelte';
	import { Button } from '$lib/components/ui/button';

	let { editions }: { editions: Edition[] } = $props();
</script>

<section class="container mx-auto px-4">
	<div class="text-center">
		<h2 class="text-4xl font-bold">Our Editions</h2>
		<p class="mx-auto mt-2 max-w-2xl text-gray-600 dark:text-gray-400">
			Explore our collection of digital editions covering everything tech and entertainment to
			college prep and personal development.
		</p>
	</div>

	<div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
		{#each editions as edition (edition.published_at)}
			<EditionCard {edition} />
		{/each}
	</div>

	<div class="mt-12 text-center">
		<a href="/editions">
			<Button variant="outline">View all editions</Button>
		</a>
	</div>
</section>
