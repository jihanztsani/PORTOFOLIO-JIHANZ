import React from "react";

const projects = [
    {
        number: "01",
        title: "RHIVA",
        category: "AI / NLP / WEB",
        description:
            "Sistem analisis sentimen ulasan perhotelan berbasis Natural Language Processing (NLP) memanfaatkan fine-tuned IndoBERT untuk klasifikasi opini multi-aspek dengan akurasi tinggi.",
        tags: ["IndoBERT", "Python", "Flask/FastAPI", "React", "Tailwind CSS"],
    },
    {
        number: "02",
        title: "FASHION CNN",
        category: "COMPUTER VISION / MACHINE LEARNING",
        description:
            "Klasifikasi citra produk fashion multikelas menggunakan arsitektur Convolutional Neural Network (CNN) dengan preprocessing citra dan data augmentation komprehensif.",
        tags: ["PyTorch", "CNN", "Python", "Computer Vision", "Matplotlib"],
    },
    {
        number: "03",
        title: "ENTERPRISE WEB APP",
        category: "FULL-STACK WEB DEVELOPMENT",
        description:
            "Aplikasi web modern dengan autentikasi berbasis token, dashboard interaktif, manajemen data relasional, dan arsitektur RESTful API yang aman dan terstruktur.",
        tags: ["React.js", "Laravel", "MySQL", "REST API", "Vite"],
    },
    {
        number: "04",
        title: "3D VISUALIZATION",
        category: "BLENDER / CREATIVE",
        description:
            "Eksplorasi pemodelan 3D, material shading, dan visualisasi produk interaktif dengan pencahayaan sinematik dan rendering fotorealistis.",
        tags: ["Blender 3D", "Cycles Render", "Product Design", "Lighting"],
    },
];

function Projects() {
    return (
        <section id="projects" className="page-section">

            <div className="section-topbar">
                <span>PORTFOLIO</span>
                <span>03 — FEATURED PROJECTS</span>
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
                    A curated selection of software engineering, artificial intelligence, and digital products I have built and developed.
                </p>
            </div>

            <div className="projects-list">
                {projects.map((project) => (
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
                        </div>

                        <span className="project-arrow">
                            ↗
                        </span>
                    </article>
                ))}
            </div>

        </section>
    );
}

export default Projects;