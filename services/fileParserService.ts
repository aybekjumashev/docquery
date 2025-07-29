// These libraries are loaded from CDN in index.html
declare const pdfjsLib: any;
declare const mammoth: any;

/**
 * Extracts text from various file types (PDF, DOCX, TXT).
 * @param file The file object to parse.
 * @returns A promise that resolves to the extracted text content.
 */
export const extractTextFromFile = async (file: File): Promise<string> => {
  const fileType = file.type;
  const fileName = file.name.toLowerCase();

  // PDF
  if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
    if (!pdfjsLib) throw new Error('pdf.js library is not loaded. Please check the CDN link in index.html.');
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(' ');
      fullText += pageText + '\n\n';
    }
    return fullText;
  }
  
  // DOCX
  if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileName.endsWith('.docx')) {
    if (!mammoth) throw new Error('mammoth.js library is not loaded. Please check the CDN link in index.html.');
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  }

  // TXT
  if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
    return file.text();
  }

  // Unsupported file type
  throw new Error(`Unsupported file type: "${fileType || 'unknown'}". Please upload a PDF, DOCX, or TXT file.`);
};