const projects = [
    {
        number: "01",
        title: "RHIVA",
        category: "AI / WEB",
        description:
            "Sistem analisis sentimen ulasan hotel menggunakan IndoBERT.",
    },
    {
        number: "02",
        title: "FASHION CNN",
        category: "AI / MACHINE LEARNING",
        description:
            "Klasifikasi citra produk fashion menggunakan CNN.",
    },
    {
        number: "03",
        title: "WEB APPLICATION",
        category: "WEB DEVELOPMENT",
        description:
            "Website application menggunakan React dan Laravel.",
    },
    {
        number: "04",
        title: "3D PROJECT",
        category: "BLENDER",
        description:
            "Eksplorasi pemodelan dan visualisasi objek 3D.",
    },
];

function Projects() {
    return (
        <section className="page-section">

            <div className="section-topbar">
                <span>PORTFOLIO</span>
                <span>PROJECTS</span>
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
                    A collection of projects, experiments
                    and digital products I have worked on.
                </p>

            </div>


            <div className="projects-list">

                {projects.map((project) => (
                    <article
                        className="project-row"
                        key={project.number}
                    >

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