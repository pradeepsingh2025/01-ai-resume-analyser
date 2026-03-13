"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ResumeData } from "@/utils/types";
import { downloadResumePDF, ResumePDF } from "@/components/ResumePDF";

export default function Rewrite() {
    const params = useSearchParams();
    const [resumeText, setResumeText] = useState<string>(params.get("resumeText") || "");
    const [jobDescription, setJobDescription] = useState<string>(params.get("jobDescription") || "");
    const [missingKeywords, setMissingKeywords] = useState<string[]>(JSON.parse(JSON.stringify(params.get("missingKeywords")) || "[]"));
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [rewrittenResume, setRewrittenResume] = useState<ResumeData>();



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
            console.log("data",data);
            setRewrittenResume(data);
        } catch (error) {
            setError("Failed to rewrite resume");
        } finally {
            setLoading(false);
        }
    }

    if(error){
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
                <button onClick={() => downloadResumePDF(rewrittenResume as ResumeData)} className="w-full p-4 rounded-2xl bg-[#b48c50] text-white font-sans font-bold tracking-wide hover:bg-[#b48c50]/80 cursor-pointer">
                    Download Resume
                </button>
            </div>
        </div>
    );
}