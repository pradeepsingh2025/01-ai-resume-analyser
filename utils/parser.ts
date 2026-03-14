import mammoth from 'mammoth';

/**
 * Appends a deduplicated list of embedded links to the parsed text.
 * This ensures hidden hyperlinks (e.g. "LinkedIn" linking to a URL,
 * project names linking to GitHub/live URLs) are surfaced for AI analysis.
 */
function appendLinks(text: string, links: string[]): string {
    const unique = [...new Set(links)];
    if (unique.length === 0) return text;
    return `${text}\n\n--- EMBEDDED LINKS ---\n${unique.join("\n")}`;
}

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

        const pageProxies = await Promise.all(
            Array.from({ length: pdf.numPages }, (_, i) => pdf.getPage(i + 1))
        );

        // Extract text content (existing behaviour)
        const textContents = await Promise.all(
            pageProxies.map(p => p.getTextContent())
        );
        const text = textContents
            .flatMap((p: any) => p.items.map((item: any) => item.str))
            .join(" ");

        // Extract hidden hyperlinks from annotations
        const annotations = await Promise.all(
            pageProxies.map(p => p.getAnnotations())
        );
        const links = annotations
            .flat()
            .filter((a: any) => a.subtype === "Link" && a.url)
            .map((a: any) => a.url as string);

        return appendLinks(text, links);
    }

    if (file.name.endsWith(".docx")) {
        const buffer = await file.arrayBuffer();

        // Use convertToHtml to preserve <a> tags, then extract links + plain text
        const { value: html } = await mammoth.convertToHtml({ arrayBuffer: buffer });

        // Pull all href values from anchor tags
        const linkRegex = /<a\s[^>]*href=["']([^"']+)["'][^>]*>/gi;
        const links: string[] = [];
        let match: RegExpExecArray | null;
        while ((match = linkRegex.exec(html)) !== null) {
            links.push(match[1]);
        }

        // Strip HTML tags to get plain text
        const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

        return appendLinks(text, links);
    }

    throw new Error("Unsupported file type. Please upload a PDF or DOCX file.");
}