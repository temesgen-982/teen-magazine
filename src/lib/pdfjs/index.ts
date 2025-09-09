import * as PDFJS from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// Configure worker
PDFJS.GlobalWorkerOptions.workerSrc =  pdfjsWorker;

export default function loadPDF(node: HTMLCanvasElement, url: string) {
  const render = async () => {
    const loadingTask = PDFJS.getDocument(url);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);

    const scale = 1;
    const viewport = page.getViewport({ scale });

    const context = node.getContext("2d");
    if (!context) return;

    node.height = viewport.height;
    node.width = viewport.width;

    const renderContext = {
      canvasContext: context,
      viewport,
    };

    await page.render(renderContext).promise;
  };

  render();

  return {
    destroy() {
    }
  };
}
