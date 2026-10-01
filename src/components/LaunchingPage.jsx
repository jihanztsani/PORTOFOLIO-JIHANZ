import React, { useState, useEffect, useRef, useCallback } from "react";
import StrokeText from "./StrokeText";
import "./LaunchingPage.css";

function LaunchingPage({ onFinish }) {
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const [windowWidth, setWindowWidth] = useState(() => {
        if (typeof window !== "undefined") return window.innerWidth;
        return 1200;
    });
    const hasExited = useRef(false);
    const touchStartY = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isNarrow = windowWidth <= 880;
    const isVerySmall = windowWidth <= 440;

    const handleExit = useCallback(() => {
        if (hasExited.current) return;
        hasExited.current = true;

        // Ensure audio plays at second 18
        window.dispatchEvent(new CustomEvent("play-portfolio-audio"));

        // Trigger extended two-phase animation: substantial scroll down first, then fade out
        setIsScrollingDown(true);

        // After the full scroll-down and fade-out animation completes (3.2s), unmount completely
        setTimeout(() => {
            // Reset scroll to top so user lands on Hero section, not About
            window.scrollTo(0, 0);
            // Unlock body scroll
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            if (onFinish) onFinish();
        }, 3200);
    }, [onFinish]);

    useEffect(() => {
        // Lock body scroll so the background page doesn't scroll behind the overlay
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = "0";
        document.body.style.width = "100%";

        // Trigger audio playback attempt on mount
        window.dispatchEvent(new CustomEvent("play-portfolio-audio"));

        const removeListeners = () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("keydown", handleKeyDown);
        };

        // 1. Mouse wheel / trackpad scroll down
        const handleWheel = (e) => {
            if (e.deltaY > 5) {
                removeListeners();
                handleExit();
            }
        };

        // 2. Touch swipe up (mobile scroll down)
        const handleTouchStart = (e) => {
            if (e.touches && e.touches.length > 0) {
                touchStartY.current = e.touches[0].clientY;
            }
        };

        const handleTouchMove = (e) => {
            if (touchStartY.current !== null && e.touches && e.touches.length > 0) {
                const currentY = e.touches[0].clientY;
                const diff = touchStartY.current - currentY;
                if (diff > 20) {
                    removeListeners();
                    handleExit();
                }
            }
        };

        // 3. Key navigation
        const handleKeyDown = (e) => {
            if (["ArrowDown", "PageDown", " ", "Enter"].includes(e.key)) {
                removeListeners();
                handleExit();
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: true });
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            // Cleanup: unlock body scroll in case component unmounts unexpectedly
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            removeListeners();
        };
    }, [handleExit]);

    return (
        <div
            className={`launching-opening-overlay ${isScrollingDown ? "is-scrolling-down" : ""}`}
            onClick={handleExit}
            role="button"
            tabIndex={0}
        >
            {/* Subtle Ambient Center Glow */}
            <div className="launch-glow launch-glow-center"></div>

            <div className="launching-content-container">
                {/* Responsive StrokeText: Multi-line justified on Mobile/Minimized, Single-line on Wide Desktop */}
                <div className="launch-stroke-wrapper">
                    {isNarrow ? (
                        <div className="launch-stroke-multi">
                            <div className="stroke-line-item">
                                <StrokeText
                                    key={`line1-${isVerySmall ? "xs" : "sm"}`}
                                    text="WELCOME TO"
                                    strokeColor="#3b82f6"
                                    fillColor="#ffffff"
                                    strokeWidth={2.2}
                                    drawDuration={1.3}
                                    fillDelay={0.15}
                                    stagger={0.035}
                                    ease="power2.out"
                                    trigger="mount"
                                    fillMode="wipe"
                                    fontSize={isVerySmall ? 46 : 58}
                                    fontWeight={800}
                                    letterSpacing={-1.5}
                                    className="custom-launch-stroke"
                                />
                            </div>
                            <div className="stroke-line-item">
                                <StrokeText
                                    key={`line2-${isVerySmall ? "xs" : "sm"}`}
                                    text="MY PORTOFOLIO"
                                    strokeColor="#3b82f6"
                                    fillColor="#ffffff"
                                    strokeWidth={2.2}
                                    drawDuration={1.5}
                                    fillDelay={0.25}
                                    stagger={0.035}
                                    ease="power2.out"
                                    trigger="mount"
                                    fillMode="wipe"
                                    fontSize={isVerySmall ? 46 : 58}
                                    fontWeight={800}
                                    letterSpacing={-1.5}
                                    className="custom-launch-stroke"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="launch-stroke-single">
                            <StrokeText
                                key="wide"
                                text="WELCOME TO MY PORTOFOLIO"
                                strokeColor="#3b82f6"
                                fillColor="#ffffff"
                                strokeWidth={2.4}
                                drawDuration={1.8}
                                fillDelay={0.2}
                                stagger={0.035}
                                ease="power2.out"
                                trigger="mount"
                                fillMode="wipe"
                                fontSize={76}
                                fontWeight={800}
                                letterSpacing={-2}
                                className="custom-launch-stroke"
                            />
                        </div>
                    )}
                </div>

                {/* Minimalist Scroll Down Indicator */}
                <div className="scroll-indicator" onClick={handleExit}>
                    <span className="scroll-text">SCROLL DOWN</span>
                    <div className="scroll-icon">
                        <div className="scroll-wheel"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LaunchingPage;
