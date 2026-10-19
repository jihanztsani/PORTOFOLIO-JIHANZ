import React, { useState, useRef, useEffect } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useLocation
} from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";

import MainLayout from "./layouts/mainlayout";
import LaunchingPage from "./components/LaunchingPage";
import CustomCursor from "./components/CustomCursor";

import Home from "./pages/home";
import About from "./pages/about";
import Activities from "./pages/activities";
import Projects from "./pages/projects";
import Certificates from "./pages/certificates";
import HomePreviews from "./components/HomePreviews";
import StickyNotes from "./components/StickyNotes";

// Page metadata & sequence order in the portfolio book
const BOOK_PAGES = {
    "/":             { index: 1, title: "Home",         num: "01" },
    "/about":        { index: 2, title: "About",        num: "02" },
    "/activities":   { index: 3, title: "Activities",   num: "03" },
    "/projects":     { index: 4, title: "Projects",     num: "04" },
    "/certificates": { index: 5, title: "Certificates", num: "05" },
};

const TOTAL_PAGES = "05";

// Synthesized whisper-soft paper flutter sound using Web Audio API
function playPaperFlutterSound() {
    try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        const ctx = new AudioContextClass();
        if (ctx.state === "suspended") {
            ctx.resume();
        }

        const duration = 0.22;
        const bufferSize = Math.floor(ctx.sampleRate * duration);
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);

        // Generate natural soft pinkish noise burst
        let b0 = 0, b1 = 0, b2 = 0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            const pink = b0 + b1 + b2 + white * 0.5362;
            const decay = Math.exp(-i / (bufferSize * 0.32));
            output[i] = pink * 0.15 * decay;
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;

        // Bandpass filter to simulate paper frequency response (curling paper friction)
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(1400, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(650, ctx.currentTime + duration);
        filter.Q.value = 1.3;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.065, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        source.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        source.start();
        source.stop(ctx.currentTime + duration);
    } catch {
        // Silently ignore if audio permissions are denied or unsupported
    }
}

// 3D Book Page Slide & Flip Variants: Smooth GPU-accelerated sliding without filter repaints
const bookVariants = {
    initial: (direction) => ({
        x: direction > 0 ? "24%" : "-24%",
        rotateY: direction > 0 ? 8 : -8,
        rotateZ: 0,
        transformOrigin: direction > 0 ? "left center" : "right center",
        scale: 0.985,
        opacity: 0,
    }),
    animate: {
        x: "0%",
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.42,
            ease: [0.22, 1, 0.36, 1], // Smooth effortless glide
        },
    },
    exit: (direction) => ({
        x: direction > 0 ? "-20%" : "20%",
        rotateY: direction > 0 ? -6 : 6,
        rotateZ: 0,
        transformOrigin: direction > 0 ? "right center" : "left center",
        scale: 0.985,
        opacity: 0,
        transition: {
            duration: 0.30,
            ease: [0.32, 0, 0.2, 1],
        },
    }),
};

function BookPageTransition({ children }) {
    const location = useLocation();
    const prevLocationRef = useRef(location.pathname);
    const [direction, setDirection] = useState(1);
    const [isFirstMount, setIsFirstMount] = useState(true);

    const currentPageInfo = BOOK_PAGES[location.pathname] || {
        index: 1,
        title: "Portfolio",
        num: "01",
    };

    useEffect(() => {
        if (isFirstMount) {
            setIsFirstMount(false);
            return;
        }

        const prevIndex = BOOK_PAGES[prevLocationRef.current]?.index ?? 1;
        const currIndex = currentPageInfo.index;
        const newDir = currIndex >= prevIndex ? 1 : -1;
        setDirection(newDir);
        prevLocationRef.current = location.pathname;

        // Play subtle paper flutter sound
        playPaperFlutterSound();
    }, [location.pathname]);

    // Handle scroll on page transition entry
    const handleAnimationStart = () => {
        if (location.hash) {
            const targetId = location.hash.replace("#", "");
            setTimeout(() => {
                const el = document.getElementById(targetId);
                if (el) {
                    const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
            }, 100);
        } else {
            // Instant scroll to top when new page starts entering
            window.scrollTo({ top: 0, behavior: "instant" });
        }
    };

    return (
        <div className="book-transition-stage">
            {/* Background stage liner */}
            <div className="book-stage-liner" aria-hidden="true" />

            {/* Book Spine Crease & Stitching */}
            <div className="book-spine-crease" aria-hidden="true">
                <div className="book-spine-stitching" />
            </div>

            {/* Paper Edge Stack */}
            <div className="book-paper-edge-stack" aria-hidden="true" />

            {/* Floating Editorial Page Indicator */}
            <div className="book-page-indicator" aria-label={`Page ${currentPageInfo.num} of ${TOTAL_PAGES}: ${currentPageInfo.title}`}>
                <span className="book-indicator-icon">📖</span>
                <span className="book-indicator-num">{currentPageInfo.num}</span>
                <span className="book-indicator-divider">/</span>
                <span>{TOTAL_PAGES}</span>
                <span className="book-indicator-divider">•</span>
                <span className="book-indicator-title">{currentPageInfo.title}</span>
            </div>

            {/* Folded Dog-Ear Corner */}
            <div className="book-corner-dogear" aria-hidden="true">
                <div className="book-dogear-fold" />
            </div>

            {/* 3D AnimatePresence Page Flip */}
            <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                    key={location.pathname}
                    custom={direction}
                    variants={bookVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    onAnimationStart={handleAnimationStart}
                    className="book-page-sheet"
                >
                    {/* Dynamic paper lighting & sheen */}
                    <div className="book-page-lighting" aria-hidden="true" />
                    <div className="book-page-sheen" aria-hidden="true" />

                    {/* Cloned Route content */}
                    {React.cloneElement(children, {
                        location,
                        key: location.pathname,
                    })}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

// Homepage: Only renders Hero, About, Sections Highlights/Previews, Sticky Notes (Guestbook), and Contact Us (via MainLayout Footer)
function HomePage() {
    return (
        <div className="home-page-wrapper">
            <Home />
            <About />
            <HomePreviews />
            <StickyNotes />
        </div>
    );
}

function App() {
    const [isLaunched, setIsLaunched] = useState(false);

    return (
        <BrowserRouter>
            <CustomCursor />
            {!isLaunched && <LaunchingPage onFinish={() => setIsLaunched(true)} />}
            <MainLayout>
                <BookPageTransition>
                    <Routes>
                        {/* Halaman Utama: Hero + About + Ringkasan Bagian Lainnya + Contact Us */}
                        <Route path="/" element={<HomePage />} />

                        {/* Halaman-halaman Terpisah */}
                        <Route path="/about" element={<About />} />
                        <Route path="/activities" element={<Activities />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/certificates" element={<Certificates />} />

                        {/* Fallback */}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </BookPageTransition>
            </MainLayout>
        </BrowserRouter>
    );
}

export default App;
