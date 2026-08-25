import React from "react";

const activitiesList = [
    {
        period: "2024 — PRESENT",
        role: "AI & NLP RESEARCHER",
        organization: "Academic & Independent Studies",
        description: "Researching Indonesian sentiment analysis using pretrained IndoBERT models, optimizing tokenization and model accuracy for consumer review domains.",
    },
    {
        period: "2023 — PRESENT",
        role: "FULL-STACK WEB DEVELOPER",
        organization: "Digital Product Initiatives",
        description: "Architecting interactive frontends with React and modern APIs with Laravel, implementing clean design systems and responsive web architectures.",
    },
    {
        period: "2023 — 2024",
        role: "MACHINE LEARNING EXPERIMENTER",
        organization: "Computer Vision Projects",
        description: "Training Convolutional Neural Networks (CNN) for image recognition tasks, exploring feature extraction pipelines and dataset augmentations.",
    },
    {
        period: "2022 — PRESENT",
        role: "3D & UI/UX DESIGN EXPLORATION",
        organization: "Creative Portfolio Works",
        description: "Designing modern digital user experiences in Figma and creating 3D product visualizations and assets in Blender.",
    },
];

function Activities() {
    return (
        <section id="activities" className="page-section">

            <div className="section-topbar">
                <span>PORTFOLIO</span>
                <span>02 — ACTIVITIES &amp; EXPERIENCE</span>
                <span>2026</span>
            </div>

            <div className="page-header">
                <span className="blue-label">
                    WHAT I DO
                </span>

                <h1>
                    Activities.
                </h1>

                <p>
                    A chronological overview of my experiences, technical engagements, and creative pursuits across software engineering and digital design.
                </p>
            </div>

            <div className="activities-timeline">
                {activitiesList.map((item, index) => (
                    <div className="activity-row" key={index}>
                        <div className="activity-period-col">
                            <span className="activity-period">{item.period}</span>
                        </div>

                        <div className="activity-content-col">
                            <span className="activity-org">{item.organization}</span>
                            <h2 className="activity-role">{item.role}</h2>
                            <p className="activity-desc">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}

export default Activities;