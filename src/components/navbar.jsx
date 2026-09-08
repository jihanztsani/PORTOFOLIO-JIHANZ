import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

function Navbar() {
    const [activeSection, setActiveSection] = useState("home");

    // Reordered nav items as requested:
    // 1. ABOUT -> 2. ACTIVITIES -> 3. PROJECTS -> 4. CERTIFICATES
    const navItems = [
        {
            id: "about",
            label: "ABOUT",
            href: "#about",
        },
        {
            id: "activities",
            label: "ACTIVITIES",
            href: "#activities",
        },
        {
            id: "projects",
            label: "PROJECTS",
            href: "#projects",
        },
        {
            id: "certificates",
            label: "CERTIFICATES",
            href: "#certificates",
        },
        {
            id: "contact",
            label: "CONTACT",
            href: "#contact",
        },
    ];

    // Smooth scroll handler with offset for sticky navbar
    const handleScrollTo = (e, sectionId) => {
        e.preventDefault();
        const el = document.getElementById(sectionId);
        if (el) {
            const navbarHeight = 80;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    // ScrollSpy to highlight active section
    useEffect(() => {
        const handleScroll = () => {
            const sections = ["home", "about", "activities", "projects", "certificates", "contact"];
            const scrollPosition = window.scrollY + 120;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section) {
                    const top = section.offsetTop;
                    if (scrollPosition >= top) {
                        setActiveSection(sections[i]);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="navbar sticky-navbar">

            <div className="navbar-left">
                <a
                    href="#home"
                    onClick={(e) => handleScrollTo(e, "home")}
                    className="navbar-logo"
                >
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

            <div className="navbar-year">
                2026
            </div>

        </header>
    );
}

export default Navbar;