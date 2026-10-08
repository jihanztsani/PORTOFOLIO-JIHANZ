import React from "react";
import { Link } from "react-router-dom";
import "./HomePreviews.css";

// Import sample documentation photos for the Activities teaser
import doc01 from "../assets/documentation/120e40dd-8847-47de-a454-f29ebaffb6d4.jpg";
import doc02 from "../assets/documentation/43937693-471d-42b9-a669-47a7a09d2416.jpg";
import doc07 from "../assets/documentation/9bc2e34b-5ab3-4174-920b-5e5b4235f688.JPEG";
import doc08 from "../assets/documentation/FullSizeRender-7.JPEG";

function HomePreviews() {
    return (
        <section id="highlights" className="page-section home-previews-section">
            {/* TOPBAR */}
            <div className="section-topbar">
                <span>PORTFOLIO</span>
                <span>02 — SECTIONS OVERVIEW</span>
                <span>2026</span>
            </div>

            {/* HEADER */}
            <div className="page-header">
                <span className="blue-label">EXPLORE MORE</span>
                <h1>Portfolio Highlights.</h1>
                <p>
                    Ringkasan dari aktivitas, proyek unggulan, dan sertifikasi. Klik tombol pada masing-masing bagian untuk melihat detail lengkap di halaman tersendiri.
                </p>
            </div>

            {/* PREVIEWS CONTAINER */}
            <div className="previews-container">

                {/* 1. ACTIVITIES & DOCUMENTATION PREVIEW */}
                <div className="preview-block preview-activities-block">
                    <div className="preview-meta-row">
                        <span className="preview-tag">01 — ACTIVITIES &amp; DOCUMENTATION</span>
                        <span className="preview-badge">60+ FOTO DOKUMENTASI</span>
                    </div>

                    <div className="preview-content-grid">
                        <div className="preview-info-col">
                            <h2 className="preview-title">Aktivitas &amp; Pengalaman</h2>
                            <p className="preview-desc">
                                Eksplorasi riset Natural Language Processing &amp; AI, software development, hingga dokumentasi interaktif dari berbagai kegiatan akademik dan project.
                            </p>

                            <div className="preview-pills-list">
                                <span className="preview-pill">🔬 AI &amp; NLP Researcher</span>
                                <span className="preview-pill">💻 Full-Stack Web</span>
                                <span className="preview-pill">🧠 Machine Learning</span>
                                <span className="preview-pill">🎨 3D &amp; UI/UX</span>
                            </div>

                            <Link to="/activities" className="preview-cta-btn">
                                <span>Lihat Semua Aktivitas &amp; Galeri Foto</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </Link>
                        </div>

                        <div className="preview-visual-col">
                            <Link to="/activities" className="preview-photo-grid" title="Klik untuk membuka halaman Activities">
                                <div className="preview-photo-thumb">
                                    <img src={doc01} alt="Activities Doc 1" loading="lazy" />
                                </div>
                                <div className="preview-photo-thumb">
                                    <img src={doc02} alt="Activities Doc 2" loading="lazy" />
                                </div>
                                <div className="preview-photo-thumb">
                                    <img src={doc07} alt="Activities Doc 3" loading="lazy" />
                                </div>
                                <div className="preview-photo-thumb">
                                    <img src={doc08} alt="Activities Doc 4" loading="lazy" />
                                    <div className="photo-overlay-count">+56 Foto</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 2. FEATURED PROJECTS PREVIEW */}
                <div className="preview-block preview-projects-block">
                    <div className="preview-meta-row">
                        <span className="preview-tag">02 — FEATURED PROJECTS</span>
                        <span className="preview-badge">4 PROYEK UNGGULAN</span>
                    </div>

                    <div className="preview-content-grid">
                        <div className="preview-info-col">
                            <h2 className="preview-title">Proyek &amp; Karya Unggulan</h2>
                            <p className="preview-desc">
                                Rangkaian karya rekayasa perangkat lunak, sistem AI, web application, dan eksplorasi visual kreatif yang telah dibangun.
                            </p>

                            <Link to="/projects" className="preview-cta-btn">
                                <span>Lihat Semua Proyek Lengkap</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </Link>
                        </div>

                        <div className="preview-visual-col">
                            <div className="preview-projects-teaser">
                                <div className="teaser-project-item">
                                    <div className="teaser-proj-header">
                                        <span className="teaser-proj-num">01</span>
                                        <span className="teaser-proj-cat">AI / NLP / WEB</span>
                                    </div>
                                    <h3 className="teaser-proj-title">RHIVA</h3>
                                    <p className="teaser-proj-desc">
                                        Sistem analisis sentimen ulasan perhotelan berbasis fine-tuned IndoBERT untuk klasifikasi opini akurat.
                                    </p>
                                    <div className="teaser-proj-tags">
                                        <span>IndoBERT</span>
                                        <span>Python</span>
                                        <span>React</span>
                                    </div>
                                </div>

                                <div className="teaser-project-item">
                                    <div className="teaser-proj-header">
                                        <span className="teaser-proj-num">02</span>
                                        <span className="teaser-proj-cat">COMPUTER VISION / ML</span>
                                    </div>
                                    <h3 className="teaser-proj-title">FASHION CNN</h3>
                                    <p className="teaser-proj-desc">
                                        Klasifikasi citra produk fashion multikelas menggunakan arsitektur Convolutional Neural Network (CNN).
                                    </p>
                                    <div className="teaser-proj-tags">
                                        <span>PyTorch</span>
                                        <span>CNN</span>
                                        <span>Vision</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. CERTIFICATES & ACHIEVEMENTS PREVIEW */}
                <div className="preview-block preview-cert-block">
                    <div className="preview-meta-row">
                        <span className="preview-tag">03 — CERTIFICATES &amp; ACHIEVEMENTS</span>
                        <span className="preview-badge">VERIFIED CREDENTIALS</span>
                    </div>

                    <div className="preview-content-grid">
                        <div className="preview-info-col">
                            <h2 className="preview-title">Sertifikasi &amp; Prestasi</h2>
                            <p className="preview-desc">
                                Bukti keahlian dan kualifikasi terverifikasi dalam rekayasa frontend &amp; full-stack, kecerdasan buatan, dan strategi desain produk digital.
                            </p>

                            <Link to="/certificates" className="preview-cta-btn">
                                <span>Lihat Semua Sertifikat</span>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                    <polyline points="12 5 19 12 12 19" />
                                </svg>
                            </Link>
                        </div>

                        <div className="preview-visual-col">
                            <div className="preview-certs-teaser">
                                <div className="teaser-cert-card">
                                    <div className="teaser-cert-top">
                                        <span className="teaser-cert-num">01</span>
                                        <span className="teaser-cert-year">2024</span>
                                    </div>
                                    <h4 className="teaser-cert-title">FULL STACK WEB DEVELOPMENT</h4>
                                    <span className="teaser-cert-issuer">Professional Certification</span>
                                </div>

                                <div className="teaser-cert-card">
                                    <div className="teaser-cert-top">
                                        <span className="teaser-cert-num">02</span>
                                        <span className="teaser-cert-year">2024</span>
                                    </div>
                                    <h4 className="teaser-cert-title">APPLIED MACHINE LEARNING &amp; AI</h4>
                                    <span className="teaser-cert-issuer">Specialized AI Institute</span>
                                </div>

                                <div className="teaser-cert-card">
                                    <div className="teaser-cert-top">
                                        <span className="teaser-cert-num">03</span>
                                        <span className="teaser-cert-year">2023</span>
                                    </div>
                                    <h4 className="teaser-cert-title">UI/UX DESIGN &amp; PRODUCT STRATEGY</h4>
                                    <span className="teaser-cert-issuer">Design &amp; UX Academy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default HomePreviews;
