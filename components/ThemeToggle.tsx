"use client";

import { useTheme } from "./ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-8 h-8" />;
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full hover:bg-primary/10 text-foreground/70 hover:text-primary transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
        >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}
