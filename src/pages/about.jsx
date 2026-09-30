import React from "react";
import ScrollVelocity from "../components/ScrollVelocity";
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
                <span>PORTFOLIO</span>
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
            <ScrollVelocity
              texts={['About Me', 'Keep Scrolling']} 
              velocity={80}
              className="custom-scroll-text"
              numCopies={8}
              damping={50}
              stiffness={200}
            />
        </section>
    );
}

export default About;