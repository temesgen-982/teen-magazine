<script lang="ts">
	import type { PDFDocumentProxy } from 'pdfjs-dist';
	import type { PageFlip } from 'page-flip';
	import type * as PDFJS from 'pdfjs-dist';
	import { onMount, onDestroy } from 'svelte';
	import { tick } from 'svelte';

	interface Props {
		pdfUrl: string;
	}

	let { pdfUrl }: Props = $props();

	let bookElement: HTMLElement;
	let pageFlipInstance: PageFlip | null = null;
	let pdfjs: typeof PDFJS;
	let pdfDoc = $state<PDFDocumentProxy | null>(null);
	let pages = $state<number[]>([]);

	// Load the PDF and its pages
	onMount(async () => {
		// Dynamic import for pdfjs-dist
		pdfjs = await import('pdfjs-dist');
		pdfjs.GlobalWorkerOptions.workerSrc = new URL(
			'pdfjs-dist/build/pdf.worker.mjs',
			import.meta.url
		).href;

		const pageFlipModule = await import('page-flip');
		const PageFlip = pageFlipModule.PageFlip || pageFlipModule.default.PageFlip;

		try {
			const loadingTask = pdfjs.getDocument(pdfUrl);
			pdfDoc = await loadingTask.promise;

			pages = Array.from({ length: pdfDoc.numPages }, (_, i) => i + 1);

			await tick();

			if (bookElement) {
				pageFlipInstance = new PageFlip(bookElement, {
					width: 400,
					height: 500,
					showCover: true,
					flippingTime: 1000,
					usePortrait: false
				});

				pageFlipInstance.loadFromHTML(bookElement.querySelectorAll('.page-content'));
			}
		} catch (e) {
			console.error('Error loading PDF or initializing PageFlip:', e);
			// set an error state here for the UI
		}
	});

	// Cleanup: destroy the PageFlip instance
	onDestroy(() => {
		if (pageFlipInstance) {
			pageFlipInstance.destroy();
		}
	});

	// The Svelte action to render a page to its canvas
	async function renderPageToCanvas(canvasElement, pageNumber) {
		if (!pdfDoc) {
			return {
				update(newPageNumber) {}
			};
		}

		const page = await pdfDoc.getPage(pageNumber);
		const viewport = page.getViewport({ scale: 1.2 });
		const context = canvasElement.getContext('2d');

		canvasElement.height = viewport.height;
		canvasElement.width = viewport.width;

		const renderContext = {
			canvasContext: context,
			viewport: viewport
		};
		await page.render(renderContext).promise;

		return {
			update(newPageNumber) {
				// Not expected to be called in this specific use case with static pageNumber in #each
			}
		};
	}
</script>

<div class="page-flip-container" bind:this={bookElement}>
	{#each pages as pageNumber (pageNumber)}
		<div class="page-content">
			<canvas use:renderPageToCanvas={pageNumber}></canvas>
		</div>
	{/each}
</div>

<style>
	/* Basic styling for the book container and pages */
	.page-flip-container {
		margin: 40px auto; /* Center the book */
	}

	.page-content {
		background-color: #f0f0f0;
		border: 1px solid #ccc;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden; /* Important for canvas to fit */
	}

	.page-content canvas {
		display: block;
		max-width: 100%;
		height: auto;
	}
</style>
