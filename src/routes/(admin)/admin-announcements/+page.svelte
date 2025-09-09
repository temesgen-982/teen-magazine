<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Select from '$lib/components/ui/select/index.js';

	let { data } = $props();
	let isLoading = $state(false);
</script>

<div class="mx-auto max-w-2xl">
	<h1 class="mb-6 text-2xl font-bold">Create Announcement</h1>

	<form method="POST" enctype="multipart/form-data" onsubmit={() => (isLoading = true)}>
		<div class="grid gap-6">
			<div class="grid gap-2">
				<Label for="title">Title</Label>
				<Input name="title" id="title" required />
			</div>
			<div class="grid gap-2">
				<Label for="message">Message</Label>
				<Textarea name="message" id="message" required rows="10"/>
			</div>

			<div class="grid gap-2">
				<Label for="category">Category</Label>
				<Select.Root type="single" name="category_id">
					<Select.Trigger id="category">Select Category</Select.Trigger>
					<Select.Content>
						{#if data.categories.length > 0}
							{#each data.categories as category (category.id)}
								<Select.Item value={category.id}>
									{category.name}</Select.Item
								>
							{/each}
						{/if}
					</Select.Content>
				</Select.Root>
			</div>

			<div class="grid gap-2">
				<Label for="image">Optional Image</Label>
				<Input type="file" name="image" id="image" accept="image/*" />
			</div>
			<div class="flex items-center space-x-2">
				<Checkbox id="is_active" name="is_active" checked={true} />
				<Label for="is_active">Send email notification</Label>
			</div>
			<div class="grid gap-2">
				<Label for="source">Telegram Source (optional)</Label>
				<Input name="published_by" id="source" />
			</div>
			<Button type="submit" disabled={isLoading}>
				{isLoading ? 'Posting...' : 'Post Announcement'}
			</Button>
		</div>
	</form>
</div>
