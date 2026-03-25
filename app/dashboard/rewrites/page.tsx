"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { RewriteOutput } from "@/utils/types";
import { downloadResumePDF, ResumePDF } from "@/components/ResumePDF";
import { PDFViewer } from "@react-pdf/renderer";
import { Loader2, ArrowLeft, Download } from "lucide-react";
import { useRouter } from "next/navigation";

function RewritePreviewContent() {
  const params = useSearchParams();
  const rewriteId = params.get("id");
  const router = useRouter();

  const [rewrite, setRewrite] = useState<RewriteOutput>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!rewriteId) {
      setError("No rewrite ID provided.");
      setLoading(false);
      return;
    }

    const fetchRewrite = async () => {
      try {
        const res = await fetch(`/api/dashboard/${rewriteId}`);
        if (!res.ok) throw new Error("Failed to load rewrite");
        const data = await res.json();
        setRewrite(data);
      } catch {
        setError("Could not load the rewritten resume.");
      } finally {
        setLoading(false);
      }
    };

    fetchRewrite();
  }, [rewriteId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-primary pt-18 pb-12 px-6 flex items-center justify-center">
        <div className="flex items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin" />
          <span className="text-lg font-mono tracking-wide">Loading rewrite…</span>
        </div>
      </div>
    );
  }

  if (error || !rewrite) {
    return (
      <div className="min-h-screen bg-background text-foreground pt-18 pb-12 px-6 flex flex-col items-center justify-center gap-4">
        <span className="font-mono text-sm text-red-400/60">{error || "Rewrite not found."}</span>
        <button
          onClick={() => router.push("/dashboard")}
          className="font-mono text-[11px] tracking-widest uppercase text-primary hover:text-primary-hover transition-colors flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft size={12} />
          Back to dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-18 pb-12 px-4 sm:px-6 lg:px-10 flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <button
            onClick={() => router.push("/dashboard")}
            className="font-mono text-[11px] tracking-widest uppercase text-foreground/30 hover:text-foreground/70 transition-colors flex items-center gap-2 cursor-pointer mb-3"
          >
            <ArrowLeft size={12} />
            Dashboard
          </button>
          <h1 className="text-3xl font-mono text-primary tracking-wider uppercase">
            Rewritten Resume
          </h1>
          <p className="text-foreground/60 font-sans max-w-xl mt-1">
            Preview and download your AI-rewritten resume.
          </p>
        </div>
      </div>

      {/* Main two-panel layout */}
      <div className="w-full flex flex-col-reverse lg:flex-row gap-8 lg:gap-10 flex-1">
        {/* Left panel — Changes + Download */}
        <div className="w-full lg:w-1/2 flex flex-col items-start mt-4 lg:mt-0">
          {/* Changes explained */}
          {rewrite.changesExplained && rewrite.changesExplained.length > 0 && (
            <div className="w-full mt-2 space-y-4">
              <h2 className="text-xl font-mono text-primary tracking-wider uppercase border-b border-primary/20 pb-2">
                Changes Explained
              </h2>
              <ol className="space-y-3 list-none">
                {rewrite.changesExplained.map((change, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="shrink-0 w-7 h-7 rounded-full bg-primary/15 text-primary font-mono text-sm flex items-center justify-center mt-0.5">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-foreground/80 font-sans">
                      {change}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Download button */}
          <div className="w-full flex justify-center lg:justify-start mt-6">
            <button
              onClick={() => downloadResumePDF(rewrite as RewriteOutput)}
              className="w-full max-w-md p-4 rounded-2xl bg-primary text-primary-foreground font-sans font-bold tracking-wide hover:bg-primary/80 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Download Resume
            </button>
          </div>
        </div>

        {/* Right panel — PDF Viewer */}
        <div className="hidden lg:block w-full lg:w-1/2 lg:sticky lg:top-20 lg:self-start">
          <PDFViewer
            width="100%"
            height="850px"
            showToolbar={false}
            className="rounded-md overflow-hidden bg-white shadow-lg shadow-black/20"
          >
            <ResumePDF data={rewrite} />
          </PDFViewer>
        </div>
      </div>
    </div>
  );
}

export default function RewritePreview() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
            <RewritePreviewContent />
        </Suspense>
    );
}
