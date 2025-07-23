import { useState } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function usePdfToText() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const extractTextFromPdf = async (file) => {
    setLoading(true);
    setError(null);
    setText("");

    try {
      const fileReader = new FileReader();

      fileReader.onload = async function () {
        const typedarray = new Uint8Array(this.result);
        const pdf = await getDocument(typedarray).promise;

        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();

          const pageText = textContent.items.map(item => item.str).join(" ");
          fullText += pageText + "\n\n";
        }

        setText(fullText);
      };

      fileReader.readAsArrayBuffer(file);
    } catch (e) {
      setError("Error leyendo PDF: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return { text, loading, error, extractTextFromPdf };
}
