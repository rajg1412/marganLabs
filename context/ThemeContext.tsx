"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
    theme: "light",
    toggleTheme: () => { },
});

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("ai-dashboard-theme") as Theme | null;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const resolved = stored ?? (prefersDark ? "dark" : "light");
        setTheme(resolved);
        document.documentElement.setAttribute("data-theme", resolved);
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => {
            const next: Theme = prev === "light" ? "dark" : "light";
            localStorage.setItem("ai-dashboard-theme", next);
            document.documentElement.setAttribute("data-theme", next);
            return next;
        });
    };

    if (!mounted) return null;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
