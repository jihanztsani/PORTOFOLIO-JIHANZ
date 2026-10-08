import React, { useEffect, useState, useRef } from "react";
import "./CustomCursor.css";

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [cursorState, setCursorState] = useState("default"); // "default" | "hover" | "drag" | "text"
    const [isMouseDown, setIsMouseDown] = useState(false);

    const dotRef = useRef(null);
    const cursorStateRef = useRef("default");

    useEffect(() => {
        // Only run on devices with a fine pointer (mouse / trackpad)
        const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        if (!isFinePointer) return;

        const onMouseMove = (e) => {
            if (!isVisible) setIsVisible(true);

            // Move the single dot immediately with zero latency
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }

            // Detect target element under pointer for interactive morphing
            const target = e.target;
            if (!target) return;

            let nextState = "default";

            if (target.matches("input, textarea, [contenteditable]")) {
                nextState = "text";
            } else if (target.closest(".hero-3d-container, .draggable, .drift-wall-wrapper, canvas")) {
                nextState = "drag";
            } else if (
                target.closest(
                    "a, button, [role='button'], .clickable, .nav-link, .nav-vinyl-btn, .nav-control-btn, .theme-toggle-btn, .project-card, .activity-card, .cert-card, .gallery-item, .poster-item, .contact-link, .toast-prompt"
                )
            ) {
                nextState = "hover";
            }

            if (cursorStateRef.current !== nextState) {
                cursorStateRef.current = nextState;
                setCursorState(nextState);
            }
        };

        const onMouseDown = () => setIsMouseDown(true);
        const onMouseUp = () => setIsMouseDown(false);
        const onMouseLeave = () => setIsVisible(false);
        const onMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
        document.documentElement.addEventListener("mouseleave", onMouseLeave);
        document.documentElement.addEventListener("mouseenter", onMouseEnter);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mousedown", onMouseDown);
            window.removeEventListener("mouseup", onMouseUp);
            document.documentElement.removeEventListener("mouseleave", onMouseLeave);
            document.documentElement.removeEventListener("mouseenter", onMouseEnter);
        };
    }, [isVisible]);

    return (
        <div
            className={`custom-cursor-container ${isVisible ? "is-visible" : "is-hidden"} state-${cursorState} ${isMouseDown ? "is-down" : ""}`}
            aria-hidden="true"
        >
            {/* Exactly 1 Single Minimalist Futuristic Dot */}
            <div ref={dotRef} className="single-cursor-dot"></div>
        </div>
    );
}
