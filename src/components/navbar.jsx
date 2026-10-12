import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StaggeredMenu from "./StaggeredMenu";
import { useTheme } from "../contexts/ThemeContext";
import "./navbar.css";

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("home");
    const { theme } = useTheme();

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
            if (location.pathname === item.link) {
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                navigate(item.link);
            }
        }
    };

    const handleLogoClick = (e) => {
        e?.preventDefault();
        if (location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            navigate("/");
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
            onLogoClick={handleLogoClick}
            onItemClick={handleItemClick}
        />
    );
}

export default Navbar;