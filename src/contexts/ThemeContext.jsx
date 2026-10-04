import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({
    theme: "dark",
    toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
    // Read saved preference or default to dark
    const [theme, setTheme] = useState(() => {
        if (typeof window === "undefined") return "dark";
        return localStorage.getItem("portfolio-theme") || "dark";
    });

    useEffect(() => {
        // Apply theme to <html> so all CSS variables cascade
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("portfolio-theme", theme);
    }, [theme]);

    const toggleTheme = () =>
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}

export default ThemeContext;
