'use client'
import { useState, useEffect } from "react";

const features = [
    {
        id: "01",
        icon: "◎",
        title: "ATS Score Meter",
        desc: "Real-time compatibility scoring against any job description. Know exactly where you stand before you apply.",
    },
    {
        id: "02",
        icon: "⌖",
        title: "Missing Keyword Highlights",
        desc: "Surface missing terms recruiters and bots scan for. Every gap flagged, every opportunity visible.",
    },
    {
        id: "03",
        icon: "⟳",
        title: "One-Click Rewrite",
        desc: "Transform weak bullet points into compelling achievements — without losing your voice.",
    },
];

export default function App() {
    const [visible, setVisible] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 80);
        const interval = setInterval(() => {
            setScore((s) => {
                if (s >= 87) { clearInterval(interval); return 87; }
                return s + 1;
            });
        }, 20);
        return () => { clearTimeout(t); clearInterval(interval); };
    }, []);

    return (
        <div className="md:h-screen pt-20 md:pt-0 bg-background text-foreground flex flex-col overflow-hidden relative font-serif">

            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(var(--foreground) 1px,transparent 1px),linear-gradient(90deg,var(--foreground) 1px,transparent 1px)",
                    backgroundSize: "56px 56px",
                }}
            />
            {/* Glow blob */}
            <div className="absolute top-1/4 right-[8%] w-80 h-80 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle,rgba(180,140,80,.09) 0%,transparent 70%)" }} />


            {/* ── MAIN ── */}
            <main className="relative z-10 flex flex-col justify-center flex-1 px-8 md:px-16 lg:px-24 gap-6">

                {/* Badge */}
                <div className={`transition-all duration-500 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary border border-primary/30 px-3 py-1">
                        Resume Analyser
                    </span>
                </div>

                {/* Headline + score row */}
                <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 transition-all duration-600 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight max-w-2xl">
                        Your résumé,{" "}
                        <em className="text-primary italic">finally legible</em>
                        <br />to machines.
                    </h1>

                    {/* Live ATS score */}
                    <div className="flex flex-col gap-1.5 shrink-0">
                        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-foreground/25">
                            Live ATS Score
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-5xl font-light text-primary leading-none">{score}</span>
                            <span className="font-mono text-lg text-primary/40">/100</span>
                        </div>
                        <div className="w-28 h-[3px] bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all"
                                style={{
                                    width: `${score}%`,
                                    background: "linear-gradient(90deg,var(--primary),var(--primary-hover))",
                                    transition: "width 0.05s linear",
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Subtext */}
                <p className={`font-mono text-sm leading-relaxed text-foreground/40 max-w-md transition-all duration-500 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
                    Paste a job description + résumé and get an ATS score,
                    keyword gaps, and rewrite suggestions — instantly.
                </p>

                {/* ── FEATURE CARDS ── */}
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.07] border border-white/[0.07] transition-all duration-600 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                    {features.map((f) => (
                        <div
                            key={f.id}
                            className="bg-background hover:bg-card transition-colors duration-200 p-6 flex flex-col gap-3 group cursor-default"
                        >
                            <div className="flex justify-between items-start">
                                <span className="font-mono text-[10px] tracking-[0.15em] text-foreground/20">{f.id}</span>
                                <span className="text-primary/60 text-base group-hover:text-primary transition-colors">{f.icon}</span>
                            </div>
                            <h3 className="text-sm font-normal tracking-wide text-foreground/90">{f.title}</h3>
                            <p className="font-mono text-[11px] leading-relaxed text-foreground/35">{f.desc}</p>
                        </div>
                    ))}
                </div>

                {/* CTA row */}
                <div className={`flex items-center gap-6 transition-all duration-500 delay-[400ms] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
                    <button onClick={()=> window.location.href = "/analyze"} className="font-mono cursor-pointer text-[11px] tracking-widest uppercase bg-primary text-primary-foreground px-6 py-3 hover:bg-primary-hover transition-colors">
                        Analyze my résumé →
                    </button>
                    <span className="font-mono text-[11px] text-foreground/20">and re-write afterward</span>
                </div>
            </main>

            {/* ── FOOTER ── */}
            <footer className={`relative z-10 px-8 py-3 border-t border-white/6 flex items-center justify-between transition-all duration-500 delay-500 ${visible ? "opacity-100" : "opacity-0"}`}>
                <span className="font-mono text-[10px] text-foreground/20 tracking-widest uppercase">© 2026 Resumter</span>
                <span className="font-mono text-[10px] text-foreground/20 tracking-widest uppercase">Privacy · Terms</span>
            </footer>
        </div>
    );
}