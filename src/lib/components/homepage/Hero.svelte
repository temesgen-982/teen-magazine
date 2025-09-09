<script lang="ts">
	import type { Edition } from '$lib/types';
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight, Files, BanknoteX } from '@lucide/svelte';
	let { edition }: { edition: Edition | null } = $props();
</script>

<section class="container mx-auto px-4">
	<div class="flex flex-col items-center gap-8 md:flex-row md:gap-16">
		<div class="text-center md:w-3/5 md:text-left">
			{#if edition}
				<div
					class="mb-4 inline-flex items-center gap-x-2 rounded-full border px-3 py-1 text-sm font-semibold"
				>
					<span class="relative flex h-2 w-2">
						<span
							class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"
						></span>
						<span class="relative inline-flex h-2 w-2 rounded-full bg-primary/30"></span>
					</span>

					<span>
						Latest Issue - {new Date(edition.published_at).toLocaleDateString('en-US', {
							month: 'long',
							year: 'numeric'
						})}
					</span>
				</div>
			{/if}
			<h1 class="font-vt323 text-5xl leading-tight font-bold md:text-6xl">Teen Ethiopia</h1>
			<p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
				Discover the latest trends, career advice, scholarship opportunities, and inspiring stories
				from teens that are making a difference.
			</p>
			<ul class="mt-6 space-y-2">
				<li class="flex items-center justify-center gap-2 md:justify-start">
					<Files strokeWidth={1.5} size={20} /> Multiple editions
				</li>
				<li class="flex items-center justify-center gap-2 md:justify-start">
					<BanknoteX strokeWidth={1.5} size={20} /> Free to read
				</li>
			</ul>

			<div class="mt-8 flex justify-center gap-4 md:justify-start">
				<a href="/editions">
					<Button size="lg">
						Explore Editions <ArrowRight class="ml-2 h-5 w-5" />
					</Button>
				</a>
				<a href="/register">
					<Button size="lg" variant="outline">Sign Up</Button>
				</a>
			</div>
		</div>
		<div class="flex items-center justify-center md:w-2/5">
			{#if edition}
				<a href={`/editions/${edition.id}`} class="group relative block w-2/3">
					<img
						src={edition.cover_image_url}
						alt="Cover of the latest issue"
						class=" mx-auto aspect-[3/4] h-auto w-full max-w-sm rounded-lg shadow-2xl transition-all group-hover:shadow-2xl group-hover:ring-4 group-hover:ring-blue-500/50"
					/>

					<Button
						class="absolute top-1/2 right-0 flex translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded border-2 border-white bg-white/80 px-3 py-1 opacity-0 transition-all duration-300 group-hover:translate-x-1/4 group-hover:opacity-100"
					>
						Read now <ArrowRight class="ml-2 h-4 w-4" />
					</Button>
				</a>
			{:else}
				<div
					class="mx-auto flex aspect-[3/4] h-auto w-full max-w-sm items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800"
				>
					<p>No issues yet.</p>
				</div>
			{/if}
		</div>
	</div>
</section>
