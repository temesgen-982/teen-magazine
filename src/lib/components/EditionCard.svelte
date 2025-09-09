<script lang="ts">
	import type { Edition } from '$lib/types';
	import * as Card from '$lib/components/ui/card'; // Import all card parts
	import { buttonVariants } from '$lib/components/ui/button'; // Import button styles
	import { cn } from '$lib/utils'; // shadcn's class-merging utility

	let { edition }: { edition: Edition } = $props();

	// Format the date for display
	const formattedDate = new Date(edition.published_at).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long'
	});
</script>

<a href={`/editions/${edition.id}`}>
<Card.Root 
	href={`/editions/${edition.id}`} 
	class="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
>
	<div class="aspect-[3/4] overflow-hidden">
		<img
			src={edition.cover_image_url || '/placeholder-cover.jpg'}
			alt={`Cover for ${edition.title}`}
			class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
		/>
	</div>
	<Card.Header>
		<Card.Title class="text-lg font-bold">
			{edition.title}
		</Card.Title>
		<Card.Description class="text-sm">
			Published: {formattedDate}
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
			{edition.description || 'No description available.'}
		</p>
	</Card.Content>
	<Card.Footer>
		
		<div class_name={cn(
			buttonVariants({ variant: 'outline' }),
			'w-full'
		)}>
			Read Now
		</div>
	</Card.Footer>
</Card.Root>
</a>
