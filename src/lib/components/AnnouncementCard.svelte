<script lang="ts">
	import type { AnnouncementWithCategory } from '$lib/types';
	import { getIconForCategory } from '$lib/category-icons';
	import { Button } from '$lib/components/ui/button';
	import { Calendar, Send } from '@lucide/svelte';

	let { announcement }: { announcement: AnnouncementWithCategory } = $props();

	let isExpanded = $state(false);

	const categoryName = announcement.announcement_categories?.name ?? 'Announcement';
	const IconComponent = getIconForCategory(categoryName);
	const formattedDate = new Date(announcement.created_at).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<div
	class="flex flex-col gap-6 rounded-lg border bg-white p-6 shadow-sm md:flex-row dark:border-gray-700 dark:bg-gray-800"
>
	{#if announcement.image_url}
		<div class="flex-shrink-0 md:w-1/4">
			<img
				src={announcement.image_url}
				alt="Announcement visual"
				class="aspect-[4/3] h-auto w-full rounded-md object-cover"
			/>
		</div>
	{:else}
		<div class="flex-shrink-0 md:w-1/4">
			<img
				src="/announcement-default.png"
				alt="Announcement visual"
				class="aspect-[4/3] h-auto w-full rounded-md object-cover"
			/>
		</div>
	{/if}

	<div class="flex flex-grow flex-col">
		<h2 class="text-xl font-bold text-gray-900 dark:text-white">{announcement.title}</h2>

		<div class="mt-2 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
			<div class="flex items-center gap-2">
				<IconComponent class="h-4 w-4" />
				<span>{categoryName}</span>
			</div>
			<span class="flex items-center gap-1"
				><Calendar size={16} strokeWidth={1.5} />{formattedDate}</span
			>
		</div>

		<p class="mt-4 text-gray-700 dark:text-gray-300" class:line-clamp-3={!isExpanded}>
			{announcement.message}
		</p>

		<div
			class="mt-auto flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700"
		>
			{#if announcement.published_by != 'By editorial team' && announcement.published_by != ''}
				<div class="flex items-center gap-1">
					<div
						class="flex items-center justify-start rounded-full border-[1px] border-blue-500 px-[2.5px] py-[2px] text-blue-500"
					>
						<Send size={16} strokeWidth={1.5} />
					</div>
					<span class="flex gap-1 text-sm font-semibold text-gray-500 dark:text-gray-400">
						{announcement.published_by}
					</span>
				</div>
			{:else}
				<span class="text-sm font-semibold text-gray-500 dark:text-gray-400">
					{announcement.published_by}
				</span>
			{/if}

			<Button variant="ghost" onclick={() => (isExpanded = !isExpanded)}>
				{#if isExpanded}
					Collapse
				{:else}
					Expand
				{/if}
			</Button>
		</div>
	</div>
</div>
