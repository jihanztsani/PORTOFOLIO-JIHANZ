import React from "react";
import "./certificate.css";

const certificatesList = [
    {
        number: "01",
        title: "FULL STACK WEB DEVELOPMENT",
        issuer: "Professional Certification Program",
        year: "2024",
        category: "WEB DEVELOPMENT",
        description: "Mastery in end-to-end web architecture, frontend component engineering, backend API integration, and database management.",
    },
    {
        number: "02",
        title: "APPLIED MACHINE LEARNING & AI",
        issuer: "Specialized AI Institute",
        year: "2024",
        category: "ARTIFICIAL INTELLIGENCE",
        description: "Comprehensive training on neural network architectures, NLP models, computer vision pipelines, and deep learning algorithms.",
    },
    {
        number: "03",
        title: "UI/UX DESIGN & PRODUCT STRATEGY",
        issuer: "Design & UX Academy",
        year: "2023",
        category: "UI / UX DESIGN",
        description: "Certification in user research methodologies, wireframing, interactive prototyping, and design systems in Figma.",
    },
    {
        number: "04",
        title: "DATABASE & BACKEND SYSTEMS",
        issuer: "Software Engineering Certification",
        year: "2023",
        category: "BACKEND & CLOUD",
        description: "Relational database design, query optimization, RESTful API development, and secure authentication protocols.",
    },
];

function Certificates() {
    return (
        <section id="certificates" className="page-section">

            <div className="section-topbar">
                <span>PORTFOLIO</span>
                <span>04 — CERTIFICATES &amp; ACHIEVEMENTS</span>
                <span>2026</span>
            </div>

            <div className="page-header">
                <span className="blue-label">
                    ACHIEVEMENTS
                </span>

                <h1>
                    Certificates.
                </h1>

                <p>
                    Verified credentials, technical certifications, and formal courses completed to continuously hone software engineering and AI competencies.
                </p>
            </div>

            <div className="certificates-grid">
                {certificatesList.map((cert) => (
                    <div className="certificate-card" key={cert.number}>
                        <div className="cert-card-top">
                            <span className="cert-number">{cert.number}</span>
                            <span className="cert-year">{cert.year}</span>
                        </div>

                        <span className="cert-category">{cert.category}</span>
                        <h2 className="cert-title">{cert.title}</h2>
                        <span className="cert-issuer">Issued by: {cert.issuer}</span>
                        <p className="cert-desc">{cert.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Certificates;