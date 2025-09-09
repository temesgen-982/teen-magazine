<script lang="ts">
	import PDFViewer from '$lib/components/PDFViewer.svelte';
	import { Button } from '$lib/components/ui/button';

	let { data } = $props();
</script>

<div class="container mx-auto px-4 py-2">
	<div class="mx-auto -mt-[20px] max-w-4xl">
		<PDFViewer pdfUrl={data.signedPdfUrl} />
	</div>

	<div class="mb-8 flex gap-4 text-center">
		<h1 class="text-xl font-bold">{data.edition.title}</h1>
		<p class="mt-2 text-gray-500">
			{new Date(data.edition.published_at).toLocaleString('en-US', {
				month: 'long',
				year: 'numeric'
			})}
		</p>
	</div>

	<a href={data.signedPdfUrl} download="{data.edition.title}.pdf">
		<Button>Download PDF</Button>
	</a>
</div>
