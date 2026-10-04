import React, { useState, useEffect } from "react";
import Hero from "./hero";
import Aurora from "../components/Aurora";
import { useTheme } from "../contexts/ThemeContext";
import "./home.css";

function Home() {
    const [timeString, setTimeString] = useState("");
    const { theme } = useTheme();

    // Dark mode palette: periwinkle (#7489dd), blue (#3b82f6), deep indigo (#3e24aa) as requested
    // Light mode palette: deeper navy & sapphire tones for clear contrast against white background
    const auroraColorStops =
        theme === "light"
            ? ["#3b82f6", "#1e40af", "#0a1931"]
            : ["#7489dd", "#3b82f6", "#3e24aa"];

    // Live clock for GMT+7 (Western Indonesia Time / WIB)
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            const options = {
                timeZone: "Asia/Jakarta",
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
            };
            const formatted = now.toLocaleTimeString("id-ID", options);
            setTimeString(formatted);
        };

        updateClock();
        const timer = setInterval(updateClock, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section id="home" className="editorial-home">

            {/* FLOWING AURORA BACKGROUND (ReactBits Aurora) */}
            <div className="hero-aurora-wrapper">
                <Aurora
                    colorStops={auroraColorStops}
                    blend={0.55}
                    amplitude={1.1}
                    speed={0.7}
                    lightMode={theme === "light"}
                />
            </div>

            {/* VIGNETTE OVERLAY */}
            <div className="editorial-vignette"></div>

            {/* TOP EDITORIAL BAR */}
            <div className="editorial-topbar">
                <span className="topbar-tag">
                    DESIGNEDBYJIHANZ
                </span>

                <span className="topbar-meta-right">
                    PORTFOLIO EDITION
                </span>
            </div>

            {/* CENTER HERO COMPONENT */}
            <Hero />

            {/* BOTTOM EDITORIAL BAR */}
            <div className="editorial-bottombar">
                {/* Left: Real-time clock */}
                <div className="bottombar-time">
                    <span className="time-val">
                        {timeString || "14:25"} GMT+7
                    </span>
                    <span className="time-label">
                        JAKARTA, ID
                    </span>
                </div>

                {/* Center: Profession & Location */}
                <div className="bottombar-center-meta">
                    <span className="center-role">
                        A SOFTWARE DEVELOPER &amp; DESIGNER
                    </span>
                    <span className="center-loc">
                        BASED IN INDONESIA
                    </span>
                </div>

                {/* Right: Copyright Year */}
                <div className="bottombar-year">
                    <span>©2026</span>
                </div>
            </div>

        </section>
    );
}

export default Home;