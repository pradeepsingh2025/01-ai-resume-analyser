"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  TrendingUp,
  Clock,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Loader2,
  RefreshCw,
  BarChart3,
  Eye,
} from "lucide-react";

interface AnalysisEntry {
  id: string;
  atsScore: number;
  missingKeywords: string[];
  strengths: string[];
  weaknesses: string[];
  overallFeedback: string;
  createdAt: string;
  jobDescription: { content: string };
  resumeText: { content: string };
  rewrites: { id: string; createdAt: string }[];
}

function getScoreColor(score: number) {
  if (score >= 80) return "text-emerald-400";
  if (score >= 60) return "text-amber-400";
  return "text-red-400";
}

function getScoreBg(score: number) {
  if (score >= 80) return "bg-emerald-400/10 border-emerald-400/20";
  if (score >= 60) return "bg-amber-400/10 border-amber-400/20";
  return "bg-red-400/10 border-red-400/20";
}

function getScoreBarColor(score: number) {
  if (score >= 80) return "from-emerald-500 to-emerald-400";
  if (score >= 60) return "from-amber-500 to-amber-400";
  return "from-red-500 to-red-400";
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function truncate(text: string, len: number) {
  if (text.length <= len) return text;
  return text.slice(0, len).trimEnd() + "…";
}

export default function DashboardPage() {
  const [analyses, setAnalyses] = useState<AnalysisEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const fetchAnalyses = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/dashboard");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setAnalyses(data);
    } catch {
      setError("Could not load your analysis history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyses();
  }, []);

  // Stats
  const totalAnalyses = analyses.length;
  const avgScore = totalAnalyses
    ? Math.round(analyses.reduce((sum, a) => sum + a.atsScore, 0) / totalAnalyses)
    : 0;
  const bestScore = totalAnalyses ? Math.max(...analyses.map((a) => a.atsScore)) : 0;
  const totalRewrites = analyses.reduce((sum, a) => sum + a.rewrites.length, 0);

  return (
    <div className="min-h-screen bg-[#07090d] text-[#e4ddd3] relative overflow-hidden">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#e4ddd3 1px,transparent 1px),linear-gradient(90deg,#e4ddd3 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* Glow blob */}
      <div
        className="absolute top-1/4 right-[8%] w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(180,140,80,.07) 0%,transparent 70%)" }}
      />

      <div className="relative z-10 pt-20 pb-16 px-6 sm:px-10 lg:px-16 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#b48c50] border border-[#b48c50]/30 px-3 py-1 inline-block mb-4">
              Dashboard
            </span>
            <h1 className="text-3xl md:text-4xl font-normal tracking-tight">
              Analysis <em className="text-[#b48c50] italic">History</em>
            </h1>
            <p className="font-mono text-xs text-[#e4ddd3]/35 mt-2 max-w-md">
              Track every résumé analysis, monitor your ATS scores, and revisit past rewrites.
            </p>
          </div>
          <button
            onClick={fetchAnalyses}
            className="font-mono text-[11px] tracking-widest uppercase text-[#e4ddd3]/40 hover:text-[#e4ddd3]/80 transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <RefreshCw size={12} />
            Refresh
          </button>
        </div>

        {/* Stats row */}
        {!loading && !error && totalAnalyses > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.07] border border-white/[0.07] mb-10">
            {[
              { label: "Total Analyses", value: totalAnalyses, icon: FileText },
              { label: "Avg ATS Score", value: avgScore, icon: BarChart3 },
              { label: "Best Score", value: bestScore, icon: TrendingUp },
              { label: "Rewrites", value: totalRewrites, icon: RefreshCw },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#07090d] p-5 flex flex-col gap-2 group">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[10px] tracking-[0.15em] text-[#e4ddd3]/20 uppercase">
                    {stat.label}
                  </span>
                  <stat.icon size={14} className="text-[#b48c50]/40 group-hover:text-[#b48c50] transition-colors" />
                </div>
                <span className="text-2xl font-light text-[#e4ddd3]/90">{stat.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <Loader2 size={28} className="animate-spin text-[#b48c50]/60" />
            <span className="font-mono text-xs text-[#e4ddd3]/30 tracking-widest uppercase">
              Loading history…
            </span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <AlertTriangle size={28} className="text-red-400/60" />
            <span className="font-mono text-xs text-red-400/60 tracking-wide">{error}</span>
            <button
              onClick={fetchAnalyses}
              className="font-mono text-[11px] tracking-widest uppercase bg-[#b48c50] text-[#07090d] px-4 py-2 hover:bg-[#c9a264] transition-colors cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && totalAnalyses === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-5 text-center">
            <div className="w-16 h-16 rounded-full border border-white/[0.07] flex items-center justify-center">
              <FileText size={24} className="text-[#b48c50]/40" />
            </div>
            <div>
              <h2 className="text-lg font-normal text-[#e4ddd3]/70 mb-1">No analyses yet</h2>
              <p className="font-mono text-[11px] text-[#e4ddd3]/25 max-w-xs">
                Analyze your first résumé to see your history here.
              </p>
            </div>
            <button
              onClick={() => router.push("/analyze")}
              className="font-mono text-[11px] tracking-widest uppercase bg-[#b48c50] text-[#07090d] px-6 py-3 hover:bg-[#c9a264] transition-colors cursor-pointer"
            >
              Analyze my résumé →
            </button>
          </div>
        )}

        {/* Analysis list */}
        {!loading && !error && totalAnalyses > 0 && (
          <div className="space-y-3">
            {analyses.map((analysis) => (
              <div
                key={analysis.id}
                className="group border border-white/[0.07] hover:border-[#b48c50]/20 bg-[#07090d] hover:bg-[#0d1118] transition-all duration-200 cursor-pointer"
                onClick={() => router.push(`/result?id=${analysis.id}`)}
              >
                <div className="p-5 sm:p-6">
                  {/* Top row: Score + date */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      {/* ATS Score circle */}
                      <div
                        className={`w-14 h-14 rounded-full border ${getScoreBg(
                          analysis.atsScore
                        )} flex items-center justify-center shrink-0`}
                      >
                        <span className={`text-lg font-light ${getScoreColor(analysis.atsScore)}`}>
                          {analysis.atsScore}
                        </span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm text-[#e4ddd3]/80">
                          {truncate(analysis.jobDescription.content, 80)}
                        </span>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="font-mono text-[10px] text-[#e4ddd3]/25 flex items-center gap-1">
                            <Clock size={10} />
                            {formatDate(analysis.createdAt)}
                          </span>
                          {analysis.rewrites.length > 0 && (
                            <span className="font-mono text-[10px] text-emerald-400/50 flex items-center gap-1">
                              <CheckCircle2 size={10} />
                              Rewritten
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-[#e4ddd3]/10 group-hover:text-[#b48c50]/60 transition-colors shrink-0 mt-1"
                    />
                  </div>

                  {/* Score bar */}
                  <div className="w-full h-[3px] bg-white/6 rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-full rounded-full bg-linear-to-r ${getScoreBarColor(analysis.atsScore)}`}
                      style={{ width: `${analysis.atsScore}%` }}
                    />
                  </div>

                  {/* Feedback preview */}
                  <p className="font-mono text-[11px] leading-relaxed text-[#e4ddd3]/30 mb-3">
                    {truncate(analysis.overallFeedback, 160)}
                  </p>

                  {/* Keywords + strengths/weaknesses count */}
                  <div className="flex flex-wrap items-center gap-3">
                    {analysis.missingKeywords.slice(0, 4).map((kw, i) => (
                      <span
                        key={i}
                        className="font-mono text-[9px] tracking-wider uppercase text-[#b48c50]/50 border border-[#b48c50]/15 px-2 py-0.5"
                      >
                        {kw}
                      </span>
                    ))}
                    {analysis.missingKeywords.length > 4 && (
                      <span className="font-mono text-[9px] text-[#e4ddd3]/20">
                        +{analysis.missingKeywords.length - 4} more
                      </span>
                    )}
                    <span className="ml-auto font-mono text-[9px] text-[#e4ddd3]/15">
                      {analysis.strengths.length}↑ {analysis.weaknesses.length}↓
                    </span>
                  </div>

                  {/* View Rewrite button */}
                  {analysis.rewrites.length > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/dashboard/rewrites?id=${analysis.rewrites[0].id}`);
                      }}
                      className="mt-4 font-mono text-[11px] tracking-widest uppercase border border-[#b48c50]/30 text-[#b48c50] px-4 py-2 hover:bg-[#b48c50]/10 transition-colors flex items-center gap-2 cursor-pointer w-fit"
                    >
                      <Eye size={12} />
                      View Rewrite
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        {!loading && !error && totalAnalyses > 0 && (
          <div className="mt-10 pt-6 border-t border-white/6 flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#e4ddd3]/15 tracking-widest uppercase">
              {totalAnalyses} {totalAnalyses === 1 ? "analysis" : "analyses"} total
            </span>
            <button
              onClick={() => router.push("/analyze")}
              className="font-mono text-[11px] tracking-widest uppercase text-[#b48c50] hover:text-[#c9a264] transition-colors flex items-center gap-2 cursor-pointer"
            >
              New analysis
              <ArrowRight size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}