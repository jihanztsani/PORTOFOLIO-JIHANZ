import React, { useState, useEffect, useRef, useMemo, useId } from "react";
import Hero from "./hero";
import Aurora from "../components/Aurora";
import { useTheme } from "../contexts/ThemeContext";
import "./home.css";

// React Bits - CurvedLoop Component
export const CurvedLoop = ({
  marqueeText = '',
  speed = 2,
  className,
  curveAmount = 10,
  direction = 'left',
  interactive = true
}) => {
  const text = useMemo(() => {
    const hasTrailing = /\s|\u00A0$/.test(marqueeText);
    return (hasTrailing ? marqueeText.replace(/\s+$/, '') : marqueeText) + '\u00A0';
  }, [marqueeText]);

  const jacketRef = useRef(null);
  const measureRef = useRef(null);
  const textPathRef = useRef(null);
  const pathRef = useRef(null);
  const [spacing, setSpacing] = useState(0);
  const [containerWidth, setContainerWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );
  const offsetRef = useRef(0);
  const uid = useId();
  const pathId = `curve-${uid.replace(/[^a-zA-Z0-9-_]/g, '')}`;

  // Keep SVG width 100% responsive across all screen sizes
  useEffect(() => {
    if (!jacketRef.current) return;
    const updateSize = () => {
      if (jacketRef.current) {
        setContainerWidth(jacketRef.current.clientWidth || window.innerWidth || 1440);
      }
    };
    updateSize();

    let ro = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(updateSize);
      ro.observe(jacketRef.current);
    }
    window.addEventListener('resize', updateSize);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  // Wide buffer margins so text extends seamlessly beyond screen edges on left & right
  const margin = Math.max((spacing || 400) * 2, 800);
  const xStart = -margin;
  const xEnd = containerWidth + margin;
  const xMid = containerWidth / 2;
  const yStart = 45 - curveAmount / 2;
  const yMid = 45 + curveAmount / 2;
  const yEnd = 45 - curveAmount / 2;
  const pathD = `M${xStart},${yStart} Q${xMid},${yMid} ${xEnd},${yEnd}`;

  const dragRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const lastXRef = useRef(0);
  const dirRef = useRef(direction);
  const velRef = useRef(0);

  const textLength = spacing;
  const repeatCount = textLength
    ? Math.max(Math.ceil((containerWidth + margin * 4) / textLength) + 4, 8)
    : 10;
  const totalText = textLength
    ? Array(repeatCount).fill(text).join('')
    : text;
  const ready = spacing > 0;

  useEffect(() => {
    dirRef.current = direction;
  }, [direction]);

  useEffect(() => {
    if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (measureRef.current) setSpacing(measureRef.current.getComputedTextLength());
      });
    }
  }, [text, className]);

  useEffect(() => {
    if (!spacing) return;
    const initial = -spacing;
    offsetRef.current = initial;
    if (textPathRef.current) {
      textPathRef.current.setAttribute('startOffset', initial + 'px');
    }
  }, [spacing]);

  useEffect(() => {
    if (!spacing || !ready) return;
    let frame = 0;
    const step = () => {
      if (!dragRef.current && textPathRef.current) {
        const delta = dirRef.current === 'right' ? speed : -speed;
        let newOffset = offsetRef.current + delta;

        const wrapPoint = spacing;
        if (newOffset <= -wrapPoint) newOffset += wrapPoint;
        if (newOffset >= 0) newOffset -= wrapPoint;

        offsetRef.current = newOffset;
        textPathRef.current.setAttribute('startOffset', newOffset + 'px');
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [spacing, speed, ready]);

  const onPointerDown = e => {
    if (!interactive) return;
    dragRef.current = true;
    setIsDragging(true);
    lastXRef.current = e.clientX;
    velRef.current = 0;
    try {
      e.target.setPointerCapture(e.pointerId);
    } catch {
      // Ignore pointer capture errors
    }
  };

  const onPointerMove = e => {
    if (!interactive || !dragRef.current || !textPathRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velRef.current = dx;

    let newOffset = offsetRef.current + dx;
    const wrapPoint = spacing;
    while (newOffset <= -wrapPoint) newOffset += wrapPoint;
    while (newOffset >= 0) newOffset -= wrapPoint;

    offsetRef.current = newOffset;
    textPathRef.current.setAttribute('startOffset', newOffset + 'px');
  };

  const endDrag = () => {
    if (!interactive) return;
    dragRef.current = false;
    setIsDragging(false);
    dirRef.current = velRef.current > 0 ? 'right' : 'left';
  };

  const cursorStyle = interactive ? (isDragging ? 'grabbing' : 'grab') : 'auto';

  return (
    <div
      ref={jacketRef}
      className="curved-loop-jacket"
      style={{ visibility: ready ? 'visible' : 'hidden', cursor: cursorStyle }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      <svg
        className="curved-loop-svg"
        viewBox={`0 0 ${containerWidth} 90`}
        preserveAspectRatio="none"
      >
        <text
          ref={measureRef}
          className={className}
          dominantBaseline="central"
          xmlSpace="preserve"
          style={{ visibility: 'hidden', opacity: 0, pointerEvents: 'none' }}
        >
          {text}
        </text>
        <defs>
          <path ref={pathRef} id={pathId} d={pathD} fill="none" stroke="transparent" />
        </defs>
        {ready && (
          <text fontWeight="bold" dominantBaseline="central" xmlSpace="preserve" className={className}>
            <textPath
              ref={textPathRef}
              href={`#${pathId}`}
              startOffset={offsetRef.current + 'px'}
              xmlSpace="preserve"
            >
              {totalText}
            </textPath>
          </text>
        )}
      </svg>
    </div>
  );
};

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
        <>
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

            {/* REACT BITS CURVED LOOP - TEPAT DI BAWAH BAGIAN HERO */}
            <CurvedLoop 
                marqueeText="MADE OF IDEAS BY JIHANZ ✦"
                speed={1.5}
                curveAmount={10}
                direction="right"
                interactive={true}
                className="custom-text-style"
            />
        </>
    );
}

export default Home;