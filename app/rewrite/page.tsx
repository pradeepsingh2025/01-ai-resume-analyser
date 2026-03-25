"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { RewriteOutput } from "@/utils/types";
import { downloadResumePDF, ResumePDF } from "@/components/ResumePDF";
import { PDFViewer } from "@react-pdf/renderer";
import { Download, Loader2, AlertTriangle, X } from "lucide-react";
import { useAnalysisStore } from "@/store/useAnalysisStore";

function RewriteContent() {
    const params = useSearchParams();
    const analysisId = params.get("id")!
    const [resumeText, setResumeText] = useState<string>("");
    const [jobDescription, setJobDescription] = useState<string>("");
    const [missingKeywords, setMissingKeywords] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [rewrittenResume, setRewrittenResume] = useState<RewriteOutput>();

    const analysisEntry = useAnalysisStore((state) => state.analyses[analysisId!]);

    useEffect(() => {
        if (analysisEntry?.analysisResult) {
            setResumeText(analysisEntry.resumeText);
            setJobDescription(analysisEntry.jobDescription);
            setMissingKeywords(analysisEntry.analysisResult.missingKeywords);
            setLoading(false);
            return;
        }
        const fetchData = async () => {
            const res = await fetch(`/api/rewrite/${analysisId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Failed to fetch rewrite data");
                return;
            }
            setResumeText(data.resumeText.content);
            setJobDescription(data.jobDescription.content);
            setMissingKeywords(data.missingKeywords);
        }
        fetchData();
    }, [params]);



    const handleRewrite = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/rewrite", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resumeText, jobDescription, missingKeywords, analysisId }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Failed to rewrite resume");
                return;
            }
            setRewrittenResume(data.output);
        } catch (error) {
            setError("Failed to rewrite resume");
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="max-w-[1390px] mx-auto min-h-screen bg-background text-foreground pt-18 pb-12 px-4 sm:px-6 lg:px-10 flex flex-col">

            {/* Header */}
            <div className="flex flex-col items-start gap-1 mb-6">
                <h1 className="text-3xl font-mono text-primary tracking-wider uppercase">
                    {rewrittenResume ? "Rewritten Resume" : "Rewrite Resume"}
                </h1>
                <p className="text-foreground/60 font-sans max-w-xl">
                    {rewrittenResume ? "Here is your rewritten resume with changes explained" : "Rewrite your resume to better match the job description."}
                </p>
            </div>

            {/* Main two-panel layout */}
            <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-10 flex-1">
                {/* Left panel — Changes + Buttons */}
                <div className="w-full lg:w-1/2 flex flex-col items-start mt-4 lg:mt-0 order-2 lg:order-1">
                    {/* Rewrite button (before rewrite) */}
                    {!rewrittenResume && (
                        <div className="w-full flex justify-center lg:justify-start">
                            <button
                                onClick={handleRewrite}
                                disabled={loading || !resumeText || !jobDescription || !missingKeywords}
                                className="w-full max-w-md p-4 rounded-2xl bg-primary text-primary-foreground font-sans font-bold tracking-wide hover:bg-primary/80 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? <><Loader2 className="animate-spin" /> AI is rewriting your resume...</> : "One click away to Rewrite your resume"}
                            </button>
                        </div>
                    )}

                    {/* Changes explained */}
                    {rewrittenResume && rewrittenResume.changesExplained && (
                        <div className="w-full mt-2 space-y-4">
                            <h2 className="text-xl font-mono text-primary tracking-wider uppercase border-b border-primary/20 pb-2">
                                Changes Explained
                            </h2>
                            <ol className="space-y-3 list-none">
                                {rewrittenResume.changesExplained.map((change, index) => (
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

                    {/* Download button (after rewrite) */}
                    {rewrittenResume && (
                        <div className="w-full flex justify-center lg:justify-start mt-6">
                            <button
                                onClick={() => downloadResumePDF(rewrittenResume as RewriteOutput)}
                                className="w-full max-w-md p-4 rounded-2xl bg-primary text-primary-foreground font-sans font-bold tracking-wide hover:bg-primary/80 transition-colors cursor-pointer flex items-center justify-center gap-2"
                            >
                                <Download size={18} /> Download Resume
                            </button>
                        </div>
                    )}
                </div>

                {/* Right panel — PDF Viewer (full width of its half) */}
                {rewrittenResume && (
                    <div className="hidden lg:block w-full lg:w-1/2 lg:sticky lg:top-20 lg:self-start order-1 lg:order-2">
                        <PDFViewer
                            width="100%"
                            height="850px"
                            showToolbar={false}
                            className="rounded-md overflow-hidden bg-white shadow-lg shadow-black/20"
                        >
                            <ResumePDF data={rewrittenResume!} />
                        </PDFViewer>
                    </div>
                )}
            </div>
            {/* Error Modal */}
            {error && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
                    <div className="bg-card border border-border shadow-lg rounded-xl p-6 max-w-md w-full animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2 text-red-500">
                                <AlertTriangle className="w-5 h-5" />
                                <h3 className="font-mono text-lg font-bold uppercase tracking-wider">Error</h3>
                            </div>
                            <button onClick={() => setError(null)} className="text-foreground/50 hover:text-foreground transition-colors cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="font-sans text-foreground/80 mb-6 leading-relaxed">
                            {typeof error === 'string' ? error : (error as any)?.error || "An unknown error occurred"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Rewrite() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
            <RewriteContent />
        </Suspense>
    );
}