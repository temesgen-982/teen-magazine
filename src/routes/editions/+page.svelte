<script lang="ts">
	import EditionCard from '$lib/components/EditionCard.svelte';

	let { data } = $props();
</script>

<div class="container mx-auto px-4 py-12 md:py-16">
	<div class="text-center">
		<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">Our Editions</h1>
		<p class="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
			Explore our complete collection of digital editions. Each issue is packed with inspiring
			stories, career advice, and opportunities to help you grow.
		</p>
	</div>

	{#if data.editions && data.editions.length > 0}
		<div class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{#each data.editions as edition (edition.id)}
				<EditionCard {edition} />
			{/each}
		</div>
	{:else}
		<div class="mt-12 text-center">
			<p class="text-gray-500">
				The archive is currently empty. Please check back soon for our first edition!
			</p>
		</div>
	{/if}
</div>
