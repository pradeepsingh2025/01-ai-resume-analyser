"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { RewriteOutput } from "@/utils/types";
import { downloadResumePDF } from "@/components/ResumePDF";

export default function Rewrite() {
    const params = useSearchParams();
    const analysisId = params.get("id")!
    const [resumeText, setResumeText] = useState<string>("");
    const [jobDescription, setJobDescription] = useState<string>("");
    const [missingKeywords, setMissingKeywords] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [rewrittenResume, setRewrittenResume] = useState<RewriteOutput>();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`/api/rewrite/${analysisId}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            console.log("data resumeText", data.resumeText.content);
            console.log("data jobd", data.jobDescription.content);
            console.log("data missingWords", data.missingKeywords);
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
                body: JSON.stringify({ resumeText, jobDescription, missingKeywords }),
            });
            const data = await res.json();
            console.log("data after rewrite", data);
            setRewrittenResume(data);
        } catch (error) {
            setError("Failed to rewrite resume");
        } finally {
            setLoading(false);
        }
    }

    if (error) {
        return (
            <div className="flex items-center justify-center mt-30">
                Oops!
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#07090d] text-[#e4ddd3] pt-24 pb-12 px-6 flex flex-col items-center">
            <div className="w-full max-w-3xl flex flex-col gap-8">
                <div className="space-y-2 mb-4">
                    <h1 className="text-3xl font-mono text-[#b48c50] tracking-wider uppercase">
                        Rewrite Resume
                    </h1>
                    <p className="text-[#e4ddd3]/60 font-sans max-w-xl leading-relaxed">
                        Rewrite your resume to better match the job description.
                    </p>
                    <div className="flex flex-col gap-4">
                        <textarea className="w-full p-4 rounded-2xl border border-white/10 bg-white/2" placeholder="Your resume"></textarea>
                        <button onClick={handleRewrite} className="w-full p-4 rounded-2xl bg-[#b48c50] text-white font-sans font-bold tracking-wide hover:bg-[#b48c50]/80 cursor-pointer">
                            {loading ? "Rewriting" : "One click away to Rewrite your resume"}
                        </button>
                    </div>
                </div>
                {/* <ResumePDF data={rewrittenResume!} /> */}
                <button onClick={() => downloadResumePDF(rewrittenResume as RewriteOutput)} className="w-full p-4 rounded-2xl bg-[#b48c50] text-white font-sans font-bold tracking-wide hover:bg-[#b48c50]/80 cursor-pointer">
                    Download Resume
                </button>
            </div>
        </div>
    );
}