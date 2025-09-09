<script lang="ts">
	import EditionCard from '$lib/components/EditionCard.svelte';

	let { data } = $props();
</script>

<div class="container mx-auto px-4 py-12">
	<h1 class="text-3xl font-bold mb-8">My Account</h1>

	<section>
		<h2 class="text-2xl font-semibold mb-6">Reading History</h2>

		{#if data.history && data.history.length > 0}
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
				{#each data.history as item (item.editions.id)}
					<EditionCard edition={item.editions} />
				{/each}
			</div>
		{:else}
			<div class="text-center py-12 border-2 border-dashed rounded-lg">
				<p class="text-gray-500">You haven't read any editions yet.</p>
				<a href="/editions" class="mt-4 inline-block text-blue-600 hover:underline">
					Start exploring now!
				</a>
			</div>
		{/if}
	</section>
</div>
