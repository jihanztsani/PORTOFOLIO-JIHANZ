import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import DriftWall from "../components/DriftWall";
import "./activities.css";

// ── Import all documentation images ──────────────────────────────────────────
import doc01 from "../assets/documentation/120e40dd-8847-47de-a454-f29ebaffb6d4.jpg";
import doc02 from "../assets/documentation/43937693-471d-42b9-a669-47a7a09d2416.jpg";
import doc03 from "../assets/documentation/45580006-aa1a-4be2-b02c-567277bad9e2.jpg";
import doc04 from "../assets/documentation/4b0af45a-5638-430a-96ba-cdd8f6e6258a.jpg";
import doc05 from "../assets/documentation/4c1ea846-3de2-45e5-9854-60be1651725f.jpg";
import doc06 from "../assets/documentation/5b2659cf-1db5-4332-b595-b3aebcfdba57.jpg";
import doc07 from "../assets/documentation/9bc2e34b-5ab3-4174-920b-5e5b4235f688.JPEG";
import doc08 from "../assets/documentation/FullSizeRender-7.JPEG";
import doc09 from "../assets/documentation/IMG_0959.JPEG";
import doc10 from "../assets/documentation/IMG_2978.JPEG";
import doc11 from "../assets/documentation/IMG_4870.JPEG";
import doc12 from "../assets/documentation/IMG_4884.JPEG";
import doc13 from "../assets/documentation/IMG_4926.JPEG";
import doc14 from "../assets/documentation/IMG_5798.JPEG";
import doc15 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.15.52.jpeg";
import doc16 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.19.34 (1).jpeg";
import doc17 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.19.34.jpeg";
import doc18 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.19.50.jpeg";
import doc19 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.20.23.jpeg";
import doc20 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.20.36.jpeg";
import doc21 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.20.50.jpeg";
import doc22 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.21.04.jpeg";
import doc23 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.21.27.jpeg";
import doc24 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.21.51.jpeg";
import doc25 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.22.19.jpeg";
import doc26 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.22.29.jpeg";
import doc27 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.23.01.jpeg";
import doc28 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.23.59.jpeg";
import doc29 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.24.58.jpeg";
import doc30 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.25.10.jpeg";
import doc31 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.28.12.jpeg";
import doc32 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.28.48.jpeg";
import doc33 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.29.29.jpeg";
import doc34 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.30.23.jpeg";
import doc35 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.30.39.jpeg";
import doc36 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.32.15.jpeg";
import doc37 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.32.16 (1).jpeg";
import doc38 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.32.16.jpeg";
import doc39 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.32.17 (1).jpeg";
import doc40 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.32.17 (2).jpeg";
import doc41 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.32.17.jpeg";
import doc42 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.32.18 (1).jpeg";
import doc43 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.32.18 (2).jpeg";
import doc44 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.32.18.jpeg";
import doc45 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.32.19 (1).jpeg";
import doc46 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.32.19.jpeg";
import doc47 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.33.51.jpeg";
import doc48 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.34.58.jpeg";
import doc49 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.35.42.jpeg";
import doc50 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.36.27.jpeg";
import doc51 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.38.03.jpeg";
import doc52 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.38.27.jpeg";
import doc53 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.38.54.jpeg";
import doc54 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.39.18.jpeg";
import doc55 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.42.52.jpeg";
import doc56 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.43.48.jpeg";
import doc57 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.45.47.jpeg";
import doc58 from "../assets/documentation/WhatsApp Image 2026-08-27 at 00.46.00.jpeg";
import doc59 from "../assets/documentation/aa922375-5674-46f4-927b-5c5ca71961cf.jpg";
import doc60 from "../assets/documentation/baa8c260-8b1f-4827-9cc9-30f1e215c160.jpg";

const allDocs = [
    doc01, doc02, doc03, doc04, doc05, doc06, doc07, doc08, doc09, doc10,
    doc11, doc12, doc13, doc14, doc15, doc16, doc17, doc18, doc19, doc20,
    doc21, doc22, doc23, doc24, doc25, doc26, doc27, doc28, doc29, doc30,
    doc31, doc32, doc33, doc34, doc35, doc36, doc37, doc38, doc39, doc40,
    doc41, doc42, doc43, doc44, doc45, doc46, doc47, doc48, doc49, doc50,
    doc51, doc52, doc53, doc54, doc55, doc56, doc57, doc58, doc59, doc60,
];

// ── Shuffle helper ───────────────────────────────────────────────────────────
function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ── Shuffled docs (stable per mount) ─────────────────────────────────────────
const shuffledDocs = shuffleArray(
    allDocs.map((src, i) => ({ src, originalIdx: i }))
);

const INITIAL_SHOW = 20;

// ── Activities mini-pills data ────────────────────────────────────────────────
const activitiesList = [
    { period: "2024 — PRESENT", role: "AI & NLP RESEARCHER" },
    { period: "2023 — PRESENT", role: "FULL-STACK WEB DEVELOPER" },
    { period: "2023 — 2024", role: "MACHINE LEARNING" },
    { period: "2022 — PRESENT", role: "3D & UI/UX DESIGN" },
];


// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({ src, onClose, onPrev, onNext }) {
    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose, onPrev, onNext]);

    return (
        <div className="doc-lightbox" onClick={onClose}>
            <button className="doc-lb-close" onClick={onClose}>&#10005;</button>
            <button className="doc-lb-prev" onClick={(e) => { e.stopPropagation(); onPrev(); }}>&#8249;</button>
            <img src={src} alt="Documentation" className="doc-lb-img" onClick={(e) => e.stopPropagation()} />
            <button className="doc-lb-next" onClick={(e) => { e.stopPropagation(); onNext(); }}>&#8250;</button>
        </div>
    );
}

// ── Main component ────────────────────────────────────────────────────────────
function Activities() {
    const [lightboxIdx, setLightboxIdx] = useState(null);
    const [lightboxSrc, setLightboxSrc] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [visibleIdxs, setVisibleIdxs] = useState(new Set());
    const gridRef = useRef(null);

    // Stagger reveal on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            const count = showAll ? shuffledDocs.length : INITIAL_SHOW;
            const idxs = new Set();
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    setVisibleIdxs(prev => new Set([...prev, i]));
                }, i * 40);
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [showAll]);

    const openLightbox = (src, idx) => {
        setLightboxSrc(src);
        setLightboxIdx(idx);
    };
    const closeLightbox = () => { setLightboxIdx(null); setLightboxSrc(null); };
    const prevImg = () => {
        const next = (lightboxIdx - 1 + shuffledDocs.length) % shuffledDocs.length;
        setLightboxIdx(next);
        setLightboxSrc(shuffledDocs[next].src);
    };
    const nextImg = () => {
        const next = (lightboxIdx + 1) % shuffledDocs.length;
        setLightboxIdx(next);
        setLightboxSrc(shuffledDocs[next].src);
    };

    const handleSeeMore = () => {
        setVisibleIdxs(new Set()); // reset so new ones animate in
        setShowAll(true);
    };

    const displayedDocs = showAll ? shuffledDocs : shuffledDocs.slice(0, INITIAL_SHOW);

    const driftWallItems = allDocs.map((src, i) => ({
        image: src,
        title: `Doc ${i}`,
        href: undefined,
        onClick: () => openLightbox(src, i)
    }));

    return (
        <>
            {/* ── Activities Section (compact) ── */}
            <section id="activities" className="page-section act-compact-section">
                <div className="section-topbar">
                    <Link to="/" className="topbar-home-link">← BERANDA</Link>
                    <span>02 — ACTIVITIES</span>
                    <span>2026</span>
                </div>

                <div className="act-compact-body">
                    <div className="act-compact-left">
                        <span className="blue-label">WHAT I DO</span>
                        <h2 className="act-compact-title">Activities<span className="act-dot">.</span></h2>
                        <p className="act-compact-sub">
                            Researcher · Developer · Designer
                        </p>
                    </div>

                    <div className="act-compact-pills">
                        {activitiesList.map((item, i) => (
                            <div className="act-pill" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                                <span className="act-pill-period">{item.period}</span>
                                <span className="act-pill-role">{item.role}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Documentation Section ── */}
            <section id="documentation" className="page-section doc-section">
                <div className="section-topbar">
                    <Link to="/" className="topbar-home-link">← BERANDA</Link>
                    <span>02.5 — DOCUMENTATION</span>
                    <span>2026</span>
                </div>

                <div className="doc-header-row">
                    <div>
                        <span className="blue-label">CAPTURED MOMENTS</span>
                        <h1 className="doc-main-title">Documentation<span className="act-dot">.</span></h1>
                    </div>
                    <div className="doc-header-meta">
                        <span className="doc-meta-num">{allDocs.length}</span>
                        <span className="doc-meta-label">PHOTOS</span>
                    </div>
                </div>

                <div className="doc-driftwall-container">
                  <DriftWall
                    items={driftWallItems}
                    columns={6}
                    tileWidth={210}
                    tileHeight={140}
                    gap={20}
                    tilt={0}
                    turn={0}
                    roll={0}
                    offsetX={0}
                    perspective={1000}
                    depth={0}
                    speed={36}
                    direction="up"
                    variance={0.3}
                    parallax={0}
                    lift={30}
                    fade={0.75}
                    dim={0.7}
                    overlayColor="#08090c"
                    radius={14}
                    pauseOnHover={false}
                    grayscale={false}
                  />
                </div>
            </section>

            {/* Lightbox */}
            {lightboxIdx !== null && (
                <Lightbox
                    src={lightboxSrc}
                    onClose={closeLightbox}
                    onPrev={prevImg}
                    onNext={nextImg}
                />
            )}
        </>
    );
}

export default Activities;