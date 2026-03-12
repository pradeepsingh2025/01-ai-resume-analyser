import mammoth from 'mammoth';

export async function parseResume(file: File): Promise<string> {

    if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        return file.text();
    }

    if (file.type === "application/pdf") {
        const pdfjs = await import("pdfjs-dist");

        // Next.js/Turbopack have trouble importing raw worker URLs natively.
        // Fallback to loading the worker from a CDN that matches the installed version.
        pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

        const buffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument({ data: buffer }).promise;
        const pages = await Promise.all(
            Array.from({ length: pdf.numPages }, (_, i) =>
                pdf.getPage(i + 1).then(p => p.getTextContent())
            )
        );
        return pages
            .flatMap((p: any) => p.items.map((item: any) => item.str))
            .join(" ");
    }

    if (file.name.endsWith(".docx")) {
        const buffer = await file.arrayBuffer();
        const { value } = await mammoth.extractRawText({ arrayBuffer: buffer });
        return value;
    }

    throw new Error("Unsupported file type. Please upload a PDF or DOCX file.");
}