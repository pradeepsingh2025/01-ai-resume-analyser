'use client'
import { useState } from "react"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Upload, Briefcase, Sparkles, FileText, X, Loader2 } from "lucide-react"
import { parseResume } from "@/utils/parser"
import { useRouter } from "next/navigation"
import { useAnalysisStore } from "@/store/useAnalysisStore";


export default function Analyse() {
    const router = useRouter()
    const [jobDescription, setJobDescription] = useState<string>("")
    const [file, setFile] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const setAnalysisData = useAnalysisStore((state) => state.setAnalysisData);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null)
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0]
            if (selectedFile.size > 2 * 1024 * 1024) { // 2MB limit
                setError("File size must be less than 2MB")
                e.target.value = '' // Reset input
                return
            }
            setFile(selectedFile)
        }
    }
    const handleJobDesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setJobDescription(e.currentTarget.value)
    }

    const clearFile = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setFile(null)
        setError(null)
        // Reset the file input value
        const input = document.getElementById('resume') as HTMLInputElement
        if (input) input.value = ''
    }

    const handleAnalyze = async (file: File, jobDescription: string) => {
        setLoading(true)
        try {
            const resumeText = await parseResume(file);   // client side parsing

            const res = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resumeText, jobDescription }),
            });

            const { analysisId, output } = await res.json();
            setAnalysisData(analysisId, {
                resumeText,
                jobDescription,
                analysisResult: output,
            });
            router.push(`/result?id=${analysisId}`);
        } catch (error) {
            console.log(error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
            setJobDescription("");
            setFile(null);
            setError(null);
            const input = document.getElementById('resume') as HTMLInputElement
            if (input) input.value = ''
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-12 px-6 flex flex-col items-center">

            <div className="w-full max-w-3xl flex flex-col gap-8">

                {/* Header Section */}
                <div className="space-y-2 mb-4">
                    <h1 className="text-3xl font-mono text-primary tracking-wider uppercase">
                        Analyze Resume
                    </h1>
                    <p className="text-foreground/60 font-sans max-w-xl leading-relaxed">
                        Upload your resume and provide a job description for our AI to evaluate your profile against.
                    </p>
                </div>

                {/* Main Form Area */}
                <div className="grid grid-cols-1 gap-8 bg-white/2 shadow-slate-800 border border-white/20 rounded-xl p-6 sm:p-8 shadow-lg">

                    {/* Prompt Input */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-primary" />
                            <label className="font-mono text-sm tracking-widest uppercase text-foreground/80">
                                Job Details & Instructions
                            </label>
                        </div>
                        <Textarea
                            onChange={handleJobDesChange}
                            value={jobDescription}
                            placeholder="Paste a job description here..."
                            className="min-h-40 max-h-96 overflow-y-auto no-scrollbar bg-background/50 border-white/10 text-foreground placeholder:text-foreground/30 focus-visible:ring-primary focus-visible:border-primary/50 rounded-xl resize-none font-sans"
                        />
                    </div>

                    {/* Resume Upload */}
                    <div className="space-y-3">
                        <Field>
                            <FieldLabel htmlFor="resume" className="sr-only">Resume</FieldLabel>

                            <div className="relative group cursor-pointer">
                                <Input
                                    id="resume"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                />

                                <div className={`border-2 border-dashed transition-colors rounded-xl p-8 flex flex-col items-center justify-center gap-4 text-center ${file ? 'border-primary/50 bg-primary/5' : 'border-white/10 group-hover:border-primary/50 group-hover:bg-primary/5'}`}>
                                    {file ? (
                                        <>
                                            <div className="p-3 bg-white/3 rounded-full text-primary">
                                                <FileText className="w-6 h-6" />
                                            </div>
                                            <div >
                                                <p className="font-mono text-sm tracking-wider uppercase text-foreground/90 mb-1">
                                                    {file.name}
                                                </p>
                                                <FieldDescription className="text-foreground/50 font-sans text-sm text-center">
                                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                                </FieldDescription>
                                            </div>
                                            <button
                                                onClick={clearFile}
                                                className="absolute top-4 right-4 p-2 text-foreground/50 hover:text-foreground hover:bg-white/5 rounded-lg transition-colors z-20"
                                                title="Remove file"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="p-3 bg-white/3 rounded-full group-hover:bg-primary/10 transition-colors">
                                                <Upload className="w-6 h-6 text-foreground/50 group-hover:text-primary transition-colors" />
                                            </div>
                                            <div>
                                                <p className="font-mono text-sm tracking-wider uppercase text-foreground/90 mb-1">
                                                    Upload Resume
                                                </p>
                                                <FieldDescription className="text-foreground/50 font-sans text-sm">
                                                    Drag and drop or click to browse (PDF, DOCX) - Max 2MB
                                                </FieldDescription>
                                            </div>
                                        </>
                                    )}
                                </div>
                                {error && (
                                    <div className="absolute -bottom-8 left-0 right-0 text-center">
                                        <p className="text-red-500 text-sm font-sans">{error}</p>
                                    </div>
                                )}
                            </div>
                        </Field>
                    </div>

                </div>

                {/* Actions */}
                <div className="flex justify-end pt-2">
                    <button
                        onClick={() => handleAnalyze(file!, jobDescription)}
                        className="font-mono text-sm tracking-widest uppercase bg-primary text-primary-foreground px-8 py-3.5 rounded-lg hover:bg-primary-hover transition-all transform hover:-translate-y-0.5 shadow-[0_4px_14px_0_rgba(180,140,80,0.39)] hover:shadow-[0_6px_20px_rgba(180,140,80,0.23)] flex items-center gap-2 font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                        disabled={!file || jobDescription.length === 0}
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                        {loading ? "Analyzing..." : "Analyze Now"}
                    </button>
                </div>

            </div>
        </div>
    )
}