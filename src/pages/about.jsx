import React from "react";

function About() {
    const skills = [
        { category: "FRONTEND & WEB", list: ["React.js", "JavaScript (ES6+)", "HTML5 / CSS3", "Tailwind CSS", "Vite"] },
        { category: "BACKEND & DATA", list: ["Laravel", "PHP", "Python", "RESTful APIs", "MySQL / PostgreSQL"] },
        { category: "AI & MACHINE LEARNING", list: ["IndoBERT NLP", "Convolutional Neural Networks (CNN)", "Data Analysis", "PyTorch / TensorFlow"] },
        { category: "CREATIVE & TOOLS", list: ["UI/UX Design", "Figma", "Blender 3D", "Git / GitHub", "VS Code"] },
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
                    I'm <strong>Jihanz Fairuz Tsani</strong>, a software developer and creative designer with a passion for building intuitive digital experiences, modern web applications, and artificial intelligence solutions.
                </p>
            </div>

            <div className="about-grid">
                <div className="about-bio-card">
                    <h3 className="about-subheading">BACKGROUND &amp; PHILOSOPHY</h3>
                    <p className="about-bio-text">
                        Combining analytical problem solving with a sharp eye for aesthetic detail. I enjoy crafting digital products that are not only performant and robust under the hood, but also visually compelling and memorable for users.
                    </p>
                    <p className="about-bio-text" style={{ marginTop: "14px" }}>
                        Currently exploring the intersection of modern web interfaces, 3D visualization, and natural language processing.
                    </p>
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

        </section>
    );
}

export default About;