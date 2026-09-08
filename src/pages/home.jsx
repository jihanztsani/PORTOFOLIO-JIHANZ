import React, { useState, useEffect } from "react";
import profilePhoto from "../assets/foto 1.jpeg";
import Hero from "./hero";
import "./home.css";

function Home() {
    const [timeString, setTimeString] = useState("");

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

            {/* VIGNETTE OVERLAY */}
            <div className="editorial-vignette"></div>

            {/* BACKGROUND SILHOUETTE WATERMARK */}
            <div className="backdrop-silhouette-wrapper">
                <img
                    src={profilePhoto}
                    alt="Jihanz Fairuz Tsani Backdrop"
                    className="backdrop-silhouette-img"
                />
            </div>

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