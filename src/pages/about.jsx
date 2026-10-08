import React from "react";
import { Link } from "react-router-dom";
import "./about.css";

function About() {
    const skills = [
        { category: "FRONTEND DEVELOPMENT", list: ["React.js", "JavaScript (ES6+)", "HTML5 / CSS3", "Tailwind CSS", "Vite", "Responsive Design"] },
        { category: "UI / UX DESIGN", list: ["Figma", "User Interface (UI)", "User Experience (UX)", "Wireframing & Prototyping", "Design Systems"] },
        { category: "MULTIMEDIA & CREATIVE", list: ["3D Modeling", "Blender 3D", "Video Editing", "Graphic Design", "Creative Visuals"] },
        { category: "TECH & TOOLS", list: ["Git / GitHub", "RESTful APIs", "Laravel / PHP", "Python", "VS Code"] },
    ];

    return (
        <section id="about" className="page-section">

            <div className="section-topbar">
                <Link to="/" className="topbar-home-link">← BERANDA</Link>
                <span>01 — ABOUT ME</span>
                <span>2026</span>
            </div>

            <div className="page-header">
                <span className="blue-label">
                    WHO I AM
                </span>

                <h1>
                    About.
                </h1>

                <p>
                    Halo, saya <strong>Jihanz Fairuz Tsani</strong> — mahasiswa Teknik Informatika di Politeknik Caltex Riau yang memiliki ketertarikan besar pada dunia digital dan kreatif, berfokus pada Frontend Development &amp; UI/UX.
                </p>
            </div>

            <div className="about-grid">
                <div className="about-bio-card">
                    <h3 className="about-subheading">BACKGROUND &amp; PHILOSOPHY</h3>
                    <p className="about-bio-text">
                        Saya fokus pada <strong>Frontend Development</strong> dan <strong>UI/UX</strong>, terutama dalam membuat website yang tidak hanya berjalan dengan baik, tetapi juga nyaman digunakan dan enak dipandang. Bagi saya, proses membuat sebuah produk digital adalah tentang bagaimana teknologi dan desain bisa saling melengkapi untuk menghasilkan pengalaman yang lebih baik.
                    </p>
                    <p className="about-bio-text" style={{ marginTop: "14px" }}>
                        Di luar dunia web, saya juga senang mengeksplorasi berbagai bidang multimedia seperti <strong>3D modeling</strong>, <strong>video editing</strong>, <strong>graphic design</strong>, dan visual kreatif lainnya. Saya menikmati proses belajar, mencoba hal baru, dan mengembangkan ide menjadi sebuah karya. Melalui berbagai proyek yang saya kerjakan, saya terus berusaha menggabungkan kemampuan teknis dengan kreativitas untuk menghasilkan sesuatu yang sesuai dengan karakter dan cara saya berkarya.
                    </p>
                    <div className="about-meta-tags" style={{ marginTop: "22px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        <span className="skill-badge" style={{ borderColor: "rgba(96, 165, 250, 0.4)", background: "rgba(37, 99, 235, 0.12)" }}>
                            🎓 Politeknik Caltex Riau — Teknik Informatika
                        </span>
                        <span className="skill-badge" style={{ borderColor: "rgba(96, 165, 250, 0.4)", background: "rgba(37, 99, 235, 0.12)" }}>
                            💻 Frontend &amp; UI/UX
                        </span>
                        <span className="skill-badge" style={{ borderColor: "rgba(96, 165, 250, 0.4)", background: "rgba(37, 99, 235, 0.12)" }}>
                            🎨 3D &amp; Multimedia
                        </span>
                    </div>
                </div>

                <div className="about-skills-card">
                    <h3 className="about-subheading">CORE CAPABILITIES</h3>
                    <div className="skills-group-container">
                        {skills.map((group, idx) => (
                            <div key={idx} className="skill-group">
                                <span className="skill-group-title">{group.category}</span>
                                <div className="skill-tags">
                                    {group.list.map((skill, sIdx) => (
                                        <span key={sIdx} className="skill-badge">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* DUAL COLUMN: PENDIDIKAN & KEPANITIAAN / ORGANISASI (SIDE-BY-SIDE) */}
            <div className="about-dual-timeline-section">
                
                {/* COLUMN 1: PENDIDIKAN */}
                <div className="dual-timeline-col">
                    <div className="col-timeline-header">
                        <span className="col-pill-badge">PENDIDIKAN</span>
                        <h2 className="col-main-title">Riwayat Pendidikan</h2>
                        <p className="col-sub-text">
                            Perjalanan akademik dari sekolah dasar hingga perguruan tinggi.
                        </p>
                    </div>

                    <div className="col-timeline-track">
                        {/* 2010 — 2016 */}
                        <div className="col-timeline-item">
                            <div className="col-item-dot"></div>
                            <div className="col-item-card">
                                <div className="col-card-meta">
                                    <span className="col-meta-year">2010 — 2016</span>
                                    <span className="col-meta-loc">Pekanbaru</span>
                                </div>
                                <h3 className="col-card-title">SD An Namiroh Pusat</h3>
                                <div className="col-card-subtitle">Sekolah Dasar</div>
                                <p className="col-card-desc">
                                    Awal perjalanan pendidikan sekaligus dasar perkembangan akademik dan pribadi.
                                </p>
                            </div>
                        </div>

                        {/* 2017 — 2022 */}
                        <div className="col-timeline-item">
                            <div className="col-item-dot"></div>
                            <div className="col-item-card">
                                <div className="col-card-meta">
                                    <span className="col-meta-year">2017 — 2022</span>
                                    <span className="col-meta-loc">Ponorogo</span>
                                </div>
                                <h3 className="col-card-title">Pondok Modern Darussalam Gontor</h3>
                                <div className="col-card-subtitle">Pendidikan Pesantren</div>
                                <p className="col-card-desc">
                                    Membentuk kedisiplinan, kemandirian, kemampuan komunikasi, serta karakter.
                                </p>
                            </div>
                        </div>

                        {/* 2022 — 2023 */}
                        <div className="col-timeline-item">
                            <div className="col-item-dot"></div>
                            <div className="col-item-card">
                                <div className="col-card-meta">
                                    <span className="col-meta-year">2022 — 2023</span>
                                    <span className="col-meta-loc">Ponorogo</span>
                                </div>
                                <h3 className="col-card-title">Universitas Darussalam (UNIDA) Gontor</h3>
                                <div className="col-card-subtitle">Pendidikan Bahasa Inggris — Pengabdian</div>
                                <p className="col-card-desc">
                                    Melanjutkan studi Pendidikan Bahasa Inggris sekaligus masa pengabdian masyarakat.
                                </p>
                            </div>
                        </div>

                        {/* 2023 — Sekarang */}
                        <div className="col-timeline-item">
                            <div className="col-item-dot active-dot"></div>
                            <div className="col-item-card current-study-card">
                                <div className="col-card-meta">
                                    <span className="col-meta-year active-year">2023 — Sekarang</span>
                                    <span className="col-meta-loc">Pekanbaru</span>
                                </div>
                                <h3 className="col-card-title">Politeknik Caltex Riau</h3>
                                <div className="col-card-subtitle active-sub">D4 Teknik Informatika</div>
                                <p className="col-card-desc">
                                    Fokus pada Frontend Development, UI/UX, serta bidang kreatif digital (3D Modelling &amp; Design).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* COLUMN 2: KEPANITIAAN & ORGANISASI */}
                <div className="dual-timeline-col">
                    <div className="col-timeline-header">
                        <span className="col-pill-badge">ORGANISASI</span>
                        <h2 className="col-main-title">Kepanitiaan &amp; Organisasi</h2>
                        <p className="col-sub-text">
                            Kontribusi aktif dalam kegiatan kampus, himpunan, dan pengabdian.
                        </p>
                    </div>

                    <div className="col-timeline-track">
                        {/* 2023 */}
                        <div className="col-timeline-item">
                            <div className="col-item-dot"></div>
                            <div className="col-item-card">
                                <div className="col-card-meta">
                                    <span className="col-meta-year">2023</span>
                                    <span className="col-meta-loc">Politeknik Caltex Riau</span>
                                </div>
                                <h3 className="col-card-title">Kepanitiaan ITSA 2023</h3>
                                <ul className="col-compact-list">
                                    <li>
                                        <strong>Divisi Konsumsi</strong> — ITSA Bukber &amp; Anniversary
                                    </li>
                                    <li>
                                        <strong>Divisi Perlengkapan</strong> — Musyawarah Besar ITSA
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* 2024 */}
                        <div className="col-timeline-item">
                            <div className="col-item-dot"></div>
                            <div className="col-item-card">
                                <div className="col-card-meta">
                                    <span className="col-meta-year">2024</span>
                                    <span className="col-meta-loc">Kampus &amp; Himpunan</span>
                                </div>
                                <h3 className="col-card-title">Kepanitiaan Kampus 2024</h3>
                                <ul className="col-compact-list">
                                    <li>
                                        <strong>Liaison Officer</strong> — Penerimaan Maba Beasiswa Sawit (BPDPKS)
                                    </li>
                                    <li>
                                        <strong>Divisi Acara</strong> — Sidang Terbuka Senat
                                    </li>
                                    <li>
                                        <strong>Koordinator Lapangan</strong> — ITSA Organization Training
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* 2024 — 2025 */}
                        <div className="col-timeline-item">
                            <div className="col-item-dot active-dot"></div>
                            <div className="col-item-card current-study-card">
                                <div className="col-card-meta">
                                    <span className="col-meta-year active-year">2024 — 2025</span>
                                    <span className="col-meta-loc">Himpunan ITSA</span>
                                </div>
                                <h3 className="col-card-title">Pengurus Himpunan ITSA</h3>
                                <div className="col-card-subtitle active-sub">Department Advokesma</div>
                                <p className="col-card-desc">
                                    Mendukung aspirasi, advokasi, kesejahteraan, dan kebutuhan mahasiswa.
                                </p>
                            </div>
                        </div>

                        {/* 2025 */}
                        <div className="col-timeline-item">
                            <div className="col-item-dot"></div>
                            <div className="col-item-card">
                                <div className="col-card-meta">
                                    <span className="col-meta-year">2025</span>
                                    <span className="col-meta-loc">ITSA Events</span>
                                </div>
                                <h3 className="col-card-title">Kepanitiaan ITSA 2025</h3>
                                <ul className="col-compact-list">
                                    <li>
                                        <strong>Divisi Acara</strong> — ITSA Anniversary
                                    </li>
                                    <li>
                                        <strong>Steering Committee</strong> — ITSA Bukber
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* 2026 */}
                        <div className="col-timeline-item">
                            <div className="col-item-dot active-dot"></div>
                            <div className="col-item-card current-study-card">
                                <div className="col-card-meta">
                                    <span className="col-meta-year active-year">2026</span>
                                    <span className="col-meta-loc">Pengabdian Masyarakat</span>
                                </div>
                                <h3 className="col-card-title">Divisi Dokumentasi</h3>
                                <div className="col-card-subtitle active-sub">Pengabdian kepada Masyarakat</div>
                                <p className="col-card-desc">
                                    Mendokumentasikan rangkaian kegiatan dan mengelola aset dokumentasi publikasi.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default About;