'use client'
import { useState} from "react"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Upload, Briefcase, Sparkles, FileText, X, Loader2, AlertTriangle } from "lucide-react"
import { parseResume } from "@/utils/parser"
import { useRouter } from "next/navigation"
import { useAnalysisStore } from "@/store/useAnalysisStore";
import { useAuth, SignInButton } from '@clerk/nextjs';


export default function Analyse() {
    const router = useRouter()
    const [jobDescription, setJobDescription] = useState<string>("")
    const [file, setFile] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const { isSignedIn } = useAuth()

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

        setLoading(true);
        try {
            const resumeText = await parseResume(file);   // client side parsing

            const res = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ resumeText, jobDescription }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                setError(errorData.error || "Failed to analyze resume");
                return;
            }
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
            const input = document.getElementById('resume') as HTMLInputElement
            if (input) input.value = ''
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-12 px-6 flex flex-col items-center">

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
                <div className="grid grid-cols-1 gap-8 bg-card border border-border rounded-xl p-6 sm:p-8 shadow-sm dark:shadow-lg dark:shadow-slate-800/50">

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
                            className="min-h-40 max-h-96 overflow-y-auto no-scrollbar bg-background border-border text-foreground placeholder:text-foreground/50 focus-visible:ring-primary focus-visible:border-primary/50 rounded-xl resize-none font-sans"
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

                                <div className={`border-2 border-dashed transition-colors rounded-xl p-8 flex flex-col items-center justify-center gap-4 text-center ${file ? 'border-primary/50 bg-primary/5' : 'border-border group-hover:border-primary/50 group-hover:bg-primary/5'}`}>
                                    {file ? (
                                        <>
                                            <div className="p-3 bg-primary/10 rounded-full text-primary">
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
                                                className="absolute top-4 right-4 p-2 text-foreground/50 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors z-20"
                                                title="Remove file"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <div className="p-3 bg-foreground/5 dark:bg-white/5 rounded-full group-hover:bg-primary/10 transition-colors">
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
                            </div>
                        </Field>
                    </div>

                </div>

                {/* Actions */}
                <div className="flex justify-end pt-2">
                    {isSignedIn ? (
                        <button
                            onClick={() => handleAnalyze(file!, jobDescription)}
                            disabled={!file || jobDescription.length === 0 || loading}
                            className="font-mono text-sm tracking-widest uppercase bg-primary text-primary-foreground px-8 py-3.5 rounded-lg hover:bg-primary-hover transition-all transform hover:-translate-y-0.5 shadow-[0_4px_10px_0_rgba(180,140,80,0.2)] dark:shadow-[0_4px_14px_0_rgba(180,140,80,0.39)] hover:shadow-[0_6px_16px_rgba(180,140,80,0.15)] dark:hover:shadow-[0_6px_20px_rgba(180,140,80,0.23)] flex items-center gap-2 font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                            {loading ? "Analyzing..." : "Analyze Now"}
                        </button>
                    ) : (
                        <SignInButton mode="modal">
                            <button
                                className="font-mono bg-primary text-primary-foreground px-8 py-3.5 rounded-lg hover:bg-primary-hover transition-all transform hover:-translate-y-0.5 shadow-[0_4px_10px_0_rgba(180,140,80,0.2)] dark:shadow-[0_4px_14px_0_rgba(180,140,80,0.39)] hover:shadow-[0_6px_16px_rgba(180,140,80,0.15)] dark:hover:shadow-[0_6px_20px_rgba(180,140,80,0.23)] flex items-center gap-2 font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                            >
                                Sign in to Analyze
                            </button>
                        </SignInButton>
                    )}
                </div>

            </div>
        </div>
    )
}