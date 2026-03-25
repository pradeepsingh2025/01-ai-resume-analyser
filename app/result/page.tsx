"use client";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { ChevronLeft, Target, Lightbulb, TrendingUp, AlertCircle, CheckCircle2, ExternalLink, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { AnalysisResult } from "@/utils/types";
import { useAnalysisStore } from "@/store/useAnalysisStore";

function ResultContent() {
    const params = useSearchParams();
    const analysisId = params.get("id")
    const [data, setData] = useState<AnalysisResult>({} as AnalysisResult);
    const [loading, setLoading] = useState<boolean>(true);

    const analysisEntry = useAnalysisStore((state) => state.analyses[analysisId!]);

    useEffect(() => {
        if (analysisEntry?.analysisResult) {
            setData(analysisEntry.analysisResult);
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            const analysisId = params.get("id")!;
            console.log(analysisId);
            const res = await fetch(`/api/analyze/${analysisId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await res.json();
            setData(result);
            setLoading(false);
        };
        fetchData().then(() => setLoading(false)).catch((error) => {
            console.error("Error fetching analysis data:", error);
            setLoading(false);
        });
    }, [params]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background text-primary pt-18 pb-12 px-6 flex items-center justify-center">
                <div className="w-full flex items-center justify-center gap-8 text-center">
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <h1 className="text-2xl text-center">Loading results...</h1>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-background text-foreground pt-24 pb-12 px-6 flex flex-col items-center">
                <div className="w-full max-w-3xl flex flex-col gap-8 text-center">
                    <h1 className="text-2xl text-red-500">Error loading results</h1>
                    <Link href="/analyze" className="text-primary hover:underline flex items-center justify-center gap-2">
                        <ChevronLeft className="w-4 h-4" /> Back to Analyze
                    </Link>
                </div>
            </div>
        );
    }

    // Determine color based on ATS score
    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-green-400";
        if (score >= 60) return "text-yellow-400";
        return "text-red-400";
    };

    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-12 px-6 flex flex-col items-center">
            <div className="w-full max-w-4xl flex flex-col gap-10 mb-20">
                {/* Header & Back Action */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4">
                        <Link
                            href="/analyze"
                            className="inline-flex items-center gap-2 text-sm tracking-wider text-foreground/50 hover:text-primary transition-colors uppercase"
                        >
                            <ChevronLeft className="w-4 h-4" /> New Analysis
                        </Link>
                        <div className="flex items-center gap-4">
                            <h1 className="text-3xl md:text-4xl text-primary tracking-wider uppercase">
                                Analysis Result
                            </h1>

                            <Link href={`/rewrite?id=${analysisId}`} className="px-2 py-1 rounded-lg flex items-center gap-1 text-blue-600 text-sm shadow-sm dark:shadow-m dark:shadow-blue-600/20 font-sans transition-colors cursor-pointer group hover:underline hover:text-blue-400">
                                Re-write <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-all ease-in-out duration-200 group-hover:text-blue-400" />
                            </Link>

                        </div>
                        <p className="text-foreground/60 max-w-xl leading-relaxed">
                            Here is the detailed evaluation of your resume against the provided job description.
                        </p>
                    </div>

                    {/* ATS Score Display */}
                    <div className="flex items-center gap-4 bg-card border border-border rounded-2xl p-6 shadow-sm dark:shadow-slate-800/50 dark:shadow-lg">
                        <div className="flex flex-col space-y-1">
                            <span className="text-sm tracking-widest uppercase text-foreground/60">ATS Match</span>
                            <span className={`text-5xl font-bold ${getScoreColor(data.atsScore)}`}>
                                {data.atsScore}<span className="text-2xl text-foreground/40">%</span>
                            </span>
                        </div>
                        <Target className={`w-12 h-12 opacity-80 ${getScoreColor(data.atsScore)}`} />
                    </div>
                </div>

                {/* Overall Feedback */}
                <div className="bg-card border border-primary/20 rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-slate-800/50 dark:shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                    <div className="flex items-center gap-3 mb-4">
                        <Lightbulb className="w-5 h-5 text-primary" />
                        <h2 className="text-lg tracking-widest uppercase text-primary">Overall Feedback</h2>
                    </div>
                    <p className="text-foreground/50 leading-relaxed text-lg">
                        {data.overallFeedback}
                    </p>
                </div>

                {/* Strengths & Weaknesses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Strengths */}
                    <div className="bg-white/2 border dark:bg-card dark:border-border rounded-2xl p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <CheckCircle2 className="w-5 h-5 text-green-400/70" />
                            <h2 className="text-lg tracking-widest uppercase text-green-400/70">Strengths</h2>
                        </div>
                        {data.strengths && data.strengths.length > 0 ? (
                            <ul className="space-y-4">
                                {data.strengths.map((strength: string, idx: number) => (
                                    <li key={idx} className="flex flex-wrap items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400/50 mt-2.5 shrink-0"></span>
                                        <span className="text-foreground/50 leading-relaxed">{strength}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-foreground/40 italic">No significant strengths identified.</p>
                        )}
                    </div>

                    {/* Weaknesses */}
                    <div className="bg-white/2 border dark:bg-card dark:border-border rounded-2xl p-6 md:p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <AlertCircle className="w-5 h-5 text-red-400/70" />
                            <h2 className="text-lg tracking-widest uppercase text-red-400/70">Areas for Improvement</h2>
                        </div>
                        {data.weaknesses && data.weaknesses.length > 0 ? (
                            <ul className="space-y-4">
                                {data.weaknesses.map((weakness: string, idx: number) => (
                                    <li key={idx} className="flex flex-wrap items-start gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-400/50 mt-2.5 shrink-0"></span>
                                        <span className="text-foreground/50 leading-relaxed">{weakness}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-foreground/40 italic">No significant areas for improvement identified.</p>
                        )}
                    </div>
                </div>

                {/* Missing Keywords */}
                <div className="bg-white/2 border dark:bg-card dark:border-border rounded-2xl p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <TrendingUp className="w-5 h-5 text-blue-400/70" />
                        <h2 className="text-lg tracking-widest uppercase text-blue-400/70">Missing Keywords</h2>
                    </div>
                    {data.missingKeywords && data.missingKeywords.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                            {data.missingKeywords.map((keyword: string, idx: number) => (
                                <span
                                    key={idx}
                                    className="px-4 py-2 rounded-lg bg-blue-400/10 border border-blue-400/20 text-blue-300 text-sm shadow-sm"
                                >
                                    {keyword}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-foreground/40 italic">No missing keywords! Your resume aligns very well with the job description.</p>
                    )}
                </div>

            </div>
        </div>
    );
}

export default function Result() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
            <ResultContent />
        </Suspense>
    );
}