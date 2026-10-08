import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StaggeredMenu from "./StaggeredMenu";
import { useTheme } from "../contexts/ThemeContext";
import MusicPlayer from "./MusicPlayer";
import "./navbar.css";

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("home");
    const { theme, toggleTheme } = useTheme();

    const menuItems = [
        { label: "HOME",         link: "/",             id: "home",         ariaLabel: "Go to home page",         isPage: true },
        { label: "ABOUT",        link: "/about",        id: "about",        ariaLabel: "About Jihanz",            isPage: true },
        { label: "ACTIVITIES",   link: "/activities",   id: "activities",   ariaLabel: "View activities",         isPage: true },
        { label: "PROJECTS",     link: "/projects",     id: "projects",     ariaLabel: "Explore projects",        isPage: true },
        { label: "CERTIFICATES", link: "/certificates", id: "certificates", ariaLabel: "View certificates",      isPage: true },
        { label: "CONTACT",      link: "/#contact",     id: "contact",      ariaLabel: "Get in touch",            isPage: false },
    ];

    const socialItems = [
        { label: "Email", link: "mailto:jihanzfairuztsani@gmail.com" },
        { label: "WhatsApp", link: "https://wa.me/6281234567890" },
        { label: "GitHub", link: "https://github.com" },
        { label: "LinkedIn", link: "https://linkedin.com" },
    ];

    const handleItemClick = (e, item) => {
        e.preventDefault();

        if (item.id === "contact") {
            if (location.pathname === "/") {
                const el = document.getElementById("contact");
                if (el) {
                    const elementPosition = el.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - 20;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
            } else {
                navigate("/#contact");
            }
            return;
        }

        if (item.isPage) {
            navigate(item.link);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const handleLogoClick = (e) => {
        e?.preventDefault();
        if (location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Active state sync with route or scroll
    useEffect(() => {
        const path = location.pathname.replace("/", "");

        if (["about", "activities", "projects", "certificates"].includes(path)) {
            setActiveSection(path);
            return;
        }

        if (location.pathname === "/") {
            const handleScroll = () => {
                const scrollY = window.scrollY + 140;
                const contactEl = document.getElementById("contact");

                if (contactEl && scrollY >= contactEl.offsetTop) {
                    setActiveSection("contact");
                } else {
                    setActiveSection("home");
                }
            };

            handleScroll();
            window.addEventListener("scroll", handleScroll, { passive: true });
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [location.pathname]);

    // Format items with active state
    const formattedItems = menuItems.map(item => ({
        ...item,
        active: activeSection === item.id
    }));

    // Embedded Controls inside Drawer: Music Player + Theme Switcher
    const embeddedControls = (
        <>
            <MusicPlayer className="drawer-music-player" />

            <button
                className="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                title={theme === "dark" ? "Ganti ke Light Mode" : "Ganti ke Dark Mode"}
                type="button"
            >
                {theme === "dark" ? (
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
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                )}
            </button>
        </>
    );

    // Staggered underlay color theme
    const themeColors = theme === "dark" 
        ? ["#06080e", "#0f2347", "#2563eb"]
        : ["#e2e8f0", "#93c5fd", "#3b82f6"];

    return (
        <StaggeredMenu
            position="right"
            items={formattedItems}
            socialItems={socialItems}
            displaySocials={true}
            displayItemNumbering={true}
            colors={themeColors}
            logoText="JIHANZ"
            accentColor="var(--blue-500, #3b82f6)"
            closeOnClickAway={true}
            headerContent={embeddedControls}
            onLogoClick={handleLogoClick}
            onItemClick={handleItemClick}
        />
    );
}

export default Navbar;