import React, { useState } from "react";
import { Link } from "react-router-dom";
import AnimationViewer3D from "../components/AnimationViewer3D";
import "./projects.css";

const projects = [
    {
        number: "01",
        title: "REMINDIFY",
        category: "UI/UX DESIGN • INTERAKSI MANUSIA & KOMPUTER (HCI)",
        description:
            "Aplikasi pengingat cerdas dan manajemen jadwal terpadu yang dirancang untuk mengoptimalkan produktivitas harian. Dikembangkan dengan prinsip Human-Computer Interaction (HCI) yang mengedepankan kemudahan navigasi, hierarki visual intuitif, serta interaksi pengguna yang adaptif dan seamless.",
        tags: [
            "Figma",
            "UI/UX Design",
            "HCI / IMK",
            "Interactive Prototype",
            "Design System",
            "User Research"
        ],
        prototypeUrl:
            "https://www.figma.com/proto/9DbzT4ilAm5Yr2zd2sneRu/PROJEK-IMK-JIHANZ-FAIRUZ-TSANI?node-id=15-110&starting-point-node-id=11%3A84",
        designUrl:
            "https://www.figma.com/design/9DbzT4ilAm5Yr2zd2sneRu/PROJEK-IMK-JIHANZ-FAIRUZ-TSANI?node-id=0-1&p=f&t=7jDEZvWaTmUpscod-0",
        embedUrl:
            "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2F9DbzT4ilAm5Yr2zd2sneRu%2FPROJEK-IMK-JIHANZ-FAIRUZ-TSANI%3Fnode-id%3D15-110%26starting-point-node-id%3D11%253A84",
    },
    {
        number: "02",
        title: "SENIQ",
        category: "WORKSHOP REKAYASA PERANGKAT LUNAK 2 • SOFTWARE ENGINEERING",
        description:
            "Proyek perancangan dan pengembangan aplikasi perangkat lunak terintegrasi untuk mata kuliah Workshop Rekayasa Perangkat Lunak 2. Menghadirkan solusi digital komprehensif dengan fokus pada arsitektur sistem modular, interaksi antarmuka yang estetis, dan alur pengalaman pengguna yang terstruktur.",
        tags: [
            "Figma",
            "Workshop RPL 2",
            "Software Engineering",
            "UI/UX Design",
            "System Architecture",
            "Interactive Prototype"
        ],
        prototypeUrl:
            "https://www.figma.com/proto/HdzsmVlk82H14xkTT1v7RR/SENIQ?node-id=5-2&starting-point-node-id=5%3A2",
        designUrl:
            "https://www.figma.com/design/HdzsmVlk82H14xkTT1v7RR/SENIQ?m=auto&fuid=1389221638345788636",
        embedUrl:
            "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FHdzsmVlk82H14xkTT1v7RR%2FSENIQ%3Fnode-id%3D5-2%26starting-point-node-id%3D5%253A2",
    },
    {
        number: "03",
        title: "PROJEK ANIMASI 3D",
        category: "3D MODELING & ANIMATION • BLENDER / WEBGL",
        description:
            "Eksplorasi pemodelan dan animasi 3D interaktif yang dibuat dengan Blender 3D dan diintegrasikan langsung ke web menggunakan Three.js / WebGL. Menampilkan tata ruang lingkungan dinamis lengkap dengan pergerakan animasi real-time ('BodyAction.017') yang dapat diputar, di-zoom, dan dikontrol secara interaktif langsung di peramban.",
        tags: [
            "Blender 3D",
            "GLB / GLTF",
            "Three.js",
            "@react-three/fiber",
            "WebGL",
            "3D Animation",
            "Real-Time Interaction"
        ],
        is3DAnimation: true,
        animationClip: "BodyAction.017",
    },
];

function Projects() {
    // Default open 03 so the 3D demo can be interacted with immediately
    const [activePreview, setActivePreview] = useState("03");
    const [showScriptDirectly, setShowScriptDirectly] = useState(false);

    const togglePreview = (num) => {
        setActivePreview((prev) => (prev === num ? null : num));
    };

    return (
        <section id="projects" className="page-section">

            <div className="section-topbar">
                <Link to="/" className="topbar-home-link">← BERANDA</Link>
                <span>04 — FEATURED PROJECTS</span>
                <span>2026</span>
            </div>

            <div className="page-header">
                <span className="blue-label">
                    MY WORK
                </span>

                <h1>
                    Projects.
                </h1>

                <p>
                    A curated selection of software engineering, UI/UX design, 3D animation, and digital products I have built and developed.
                </p>
            </div>

            <div className="projects-list">
                {projects.map((project) => {
                    const isPreviewOpen = activePreview === project.number;

                    return (
                        <article className="project-row" key={project.number}>
                            <span className="project-row-number">
                                {project.number}
                            </span>

                            <div className="project-row-main">
                                <span className="project-category">
                                    {project.category}
                                </span>

                                <h2>
                                    {project.title}
                                </h2>

                                <p>
                                    {project.description}
                                </p>

                                <div className="project-tech-tags">
                                    {project.tags.map((t, idx) => (
                                        <span key={idx} className="project-tech-tag">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="project-actions-row">
                                    {/* 3D Animation Project Actions */}
                                    {project.is3DAnimation && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => togglePreview(project.number)}
                                                className={`project-action-btn primary ${isPreviewOpen ? "active" : ""}`}
                                            >
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                                                    <line x1="12" y1="22.08" x2="12" y2="12" />
                                                </svg>
                                                <span>{isPreviewOpen ? "Tutup Demo 3D" : "Jalankan Demo 3D Interaktif"}</span>
                                                <span className="toggle-chevron">{isPreviewOpen ? "▲" : "▼"}</span>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    if (!isPreviewOpen) setActivePreview(project.number);
                                                    setShowScriptDirectly(true);
                                                }}
                                                className="project-action-btn secondary"
                                                title="Lihat Kode & Script Animasi"
                                            >
                                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="16 18 22 12 16 6" />
                                                    <polyline points="8 6 2 12 8 18" />
                                                </svg>
                                                <span>Lihat Script Animasi</span>
                                            </button>
                                        </>
                                    )}

                                    {/* Figma Prototype Link */}
                                    {project.prototypeUrl && (
                                        <a
                                            href={project.prototypeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-action-btn primary"
                                        >
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                                                <polygon points="5 3 19 12 5 21 5 3" />
                                            </svg>
                                            <span>Buka Prototype Figma</span>
                                            <span className="btn-arrow">↗</span>
                                        </a>
                                    )}

                                    {/* Figma Design Link */}
                                    {project.designUrl && (
                                        <a
                                            href={project.designUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="project-action-btn secondary"
                                        >
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
                                                <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
                                                <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
                                                <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
                                                <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
                                            </svg>
                                            <span>File Desain Figma</span>
                                            <span className="btn-arrow">↗</span>
                                        </a>
                                    )}

                                    {/* Figma Embed Toggle Button */}
                                    {project.embedUrl && (
                                        <button
                                            type="button"
                                            onClick={() => togglePreview(project.number)}
                                            className={`project-action-btn toggle-preview ${isPreviewOpen ? "active" : ""}`}
                                        >
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                                                <line x1="8" y1="21" x2="16" y2="21" />
                                                <line x1="12" y1="17" x2="12" y2="21" />
                                            </svg>
                                            <span>{isPreviewOpen ? "Tutup Live Preview" : "Tampilkan Live Prototype"}</span>
                                            <span className="toggle-chevron">{isPreviewOpen ? "▲" : "▼"}</span>
                                        </button>
                                    )}
                                </div>

                                {/* 3D Animation Interactive Demo View */}
                                {project.is3DAnimation && isPreviewOpen && (
                                    <AnimationViewer3D initialShowScript={showScriptDirectly} />
                                )}

                                {/* Collapsible Figma Live Embed Preview */}
                                {project.embedUrl && isPreviewOpen && (
                                    <div className="project-figma-embed-wrap">
                                        <div className="embed-header">
                                            <div className="embed-status">
                                                <span className="status-dot"></span>
                                                <span>Figma Interactive Simulator — {project.title}</span>
                                            </div>
                                            <a
                                                href={project.prototypeUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="embed-fullscreen-link"
                                            >
                                                Buka Fullscreen ↗
                                            </a>
                                        </div>
                                        <iframe
                                            className="figma-iframe"
                                            src={project.embedUrl}
                                            allowFullScreen
                                            title={`${project.title} Figma Prototype`}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Corner Arrow Action */}
                            {project.is3DAnimation ? (
                                <button
                                    type="button"
                                    onClick={() => togglePreview(project.number)}
                                    className="project-arrow project-arrow-btn"
                                    title="Buka / Tutup Demo 3D"
                                    aria-label="Buka / Tutup Demo 3D"
                                >
                                    ↗
                                </button>
                            ) : (
                                <a
                                    href={project.prototypeUrl || project.designUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-arrow"
                                    title={`Buka Prototype ${project.title}`}
                                    aria-label={`Buka Prototype ${project.title}`}
                                >
                                    ↗
                                </a>
                            )}
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

export default Projects;