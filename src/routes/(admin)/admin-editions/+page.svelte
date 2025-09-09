<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';

	let { form } = $props();

	let isLoading = $state(false);
</script>

<div class="mx-auto max-w-2xl">
	<h1 class="mb-8 text-2xl font-bold">Upload New Edition</h1>

	{#if form?.success}
		<div class="mb-6 rounded-md border border-green-200 bg-green-100 p-4 text-green-800">
			Edition added successfully! You can view it <a href="/editions" class="underline">here</a>.
		</div>
	{:else if form?.error}
		<div class="mb-6 rounded-md border border-red-200 bg-red-100 p-4 text-red-800">
			<strong>Error:</strong>
			{form.error}
		</div>
	{/if}

	<form method="POST" enctype="multipart/form-data" onsubmit={() => (isLoading = true)}>
		<div class="grid gap-6">
			<div class="grid gap-2">
				<Label for="title">Title</Label>
				<Input type="text" name="title" id="title" required />
			</div>
			<div class="grid gap-2">
				<Label for="description">Description</Label>
				<Textarea name="description" id="description" placeholder="A brief summary..." />
			</div>
			<div class="grid gap-2">
				<Label for="published_at">Publication Date</Label>
				<Input type="date" name="published_at" id="published_at" required />
			</div>

			<!-- THE FIX: Change to file inputs -->
			<div class="grid gap-2">
				<Label for="cover_image">Cover Image (JPG, PNG)</Label>
				<Input
					type="file"
					name="cover_image"
					id="cover_image"
					required
					accept="image/jpeg,image/png"
				/>
			</div>
			<div class="grid gap-2">
				<Label for="edition_file">Edition File (PDF)</Label>
				<Input
					type="file"
					name="edition_file"
					id="edition_file"
					required
					accept="application/pdf"
				/>
			</div>

			<Button type="submit" disabled={isLoading} class="w-full">
				{#if isLoading}
					Uploading...
				{:else}
					Add Edition
				{/if}
			</Button>
		</div>
	</form>
</div>
