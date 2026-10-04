import React, { useState, useEffect } from "react";
import "./navbar.css";
import { useTheme } from "../contexts/ThemeContext";

function Navbar() {
    const [activeSection, setActiveSection] = useState("home");
    const { theme, toggleTheme } = useTheme();

    const navItems = [
        { id: "about",        label: "ABOUT",        href: "#about" },
        { id: "activities",   label: "ACTIVITIES",   href: "#activities" },
        { id: "projects",     label: "PROJECTS",     href: "#projects" },
        { id: "certificates", label: "CERTIFICATES", href: "#certificates" },
        { id: "contact",      label: "CONTACT",      href: "#contact" },
    ];

    const handleScrollTo = (e, sectionId) => {
        e.preventDefault();
        const el = document.getElementById(sectionId);
        if (el) {
            const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: offset, behavior: "smooth" });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["home", "about", "activities", "projects", "certificates", "contact"];
            const scrollY = window.scrollY + 120;
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && scrollY >= el.offsetTop) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="navbar sticky-navbar">

            <div className="navbar-left">
                <a href="#home" onClick={(e) => handleScrollTo(e, "home")} className="navbar-logo">
                    JIHANZ
                </a>
            </div>

            <nav className="navbar-links">
                {navItems.map((item) => (
                    <a
                        key={item.id}
                        href={item.href}
                        onClick={(e) => handleScrollTo(e, item.id)}
                        className={`nav-link ${activeSection === item.id ? "active" : ""}`}
                    >
                        {item.label}
                    </a>
                ))}
            </nav>

            <div className="navbar-right">
                {/* Theme Toggle Button */}
                <button
                    className="theme-toggle-btn"
                    onClick={toggleTheme}
                    aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                    title={theme === "dark" ? "Light Mode" : "Dark Mode"}
                >
                    {theme === "dark" ? (
                        /* Sun icon for switching to light */
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="5" />
                            <line x1="12" y1="1"  x2="12" y2="3"  />
                            <line x1="12" y1="21" x2="12" y2="23" />
                            <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"  />
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                            <line x1="1"  y1="12" x2="3"  y2="12" />
                            <line x1="21" y1="12" x2="23" y2="12" />
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                    ) : (
                        /* Moon icon for switching to dark */
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    )}
                </button>

                <span className="navbar-year">2026</span>
            </div>

        </header>
    );
}

export default Navbar;