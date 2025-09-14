<script lang="ts">
	import PdfFlipbook from 'svelte-pdf-flipbook';
	import type PdfFlipbookComponent from 'svelte-pdf-flipbook';
	import { Button } from '$lib/components/ui/button';

	let { data } = $props();

	let currentPage = $state(1);
	let totalPages = $state(0);
	let errorMessage = $state('');
	let flipbookRef = $state<PdfFlipbookComponent | null>(null);

	function handleFlip(event: CustomEvent<{ page: number; oldPage: number }>) {
		currentPage = event.detail.page + 1;
		console.log('Flipped to page:', currentPage);
	}

	function handleStateChange(event: CustomEvent<{ state: string }>) {
		console.log('State changed to:', event.detail.state);
	}

	function handleLoadingComplete(event: CustomEvent<{ pageCount: number }>) {
		totalPages = event.detail.pageCount;
		console.log('PDF loaded with', totalPages, 'pages');
	}

	function handleError(event: CustomEvent<{ message: string }>) {
		errorMessage = event.detail.message;
		console.error('Error:', errorMessage);
	}
</script>

<div class="container mx-auto px-4 py-2">
	<div class="mx-auto -mt-[20px] max-w-4xl">
		<PdfFlipbook
			bind:this={flipbookRef}
			pdfUrl={data.signedPdfUrl}
			width={400}
			height={600}
			flippingTime={600}
			onFlip={handleFlip}
			onStateChange={handleStateChange}
			onLoadingComplete={handleLoadingComplete}
			onError={handleError}
		/>
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

	<div class="flex items-center gap-5">
		<a href={data.signedPdfUrl} download="{data.edition.title}.pdf">
			<Button>Download PDF</Button>
		</a>
		<div class="flex items-center gap-3">
			<button onclick={() => flipbookRef?.flipPrev()}>
				<span>Prev</span>
			</button>
			<button onclick={() => flipbookRef?.flipNext()}>
				<span>Next</span>
			</button>
			<button onclick={() => flipbookRef?.goToPage(1)}>
				<span>First</span>
			</button>
		</div>
	</div>
</div>
