
// This assumes pdfjs-dist is loaded from a CDN as specified in index.html
declare const pdfjsLib: any;

export const extractTextFromPdf = async (file: File): Promise<string> => {
  if (!pdfjsLib) {
    throw new Error('pdf.js library is not loaded. Please check the CDN link in index.html.');
  }

  // Set workerSrc to load the worker script from the CDN
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
  
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const numPages = pdf.numPages;
  let fullText = '';

  for (let i = 1; i <= numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map((item: any) => item.str).join(' ');
    fullText += pageText + '\n\n';
  }

  return fullText;
};
