import profileImage from "../assets/foto 1.jpeg";

function Home() {
    return (
        <section className="home">

            <div className="home-container">

                {/* LEFT */}
                <div className="home-left">

                    <div className="profile-content">

                        <div className="profile-wrapper">
                            <img
                                src={profileImage}
                                alt="Jihanz Fairuz Tsani"
                                className="profile-image"
                            />
                        </div>

                        <div className="profile-name">
                            JIHANZ FAIRUZ TSANI
                        </div>

                    </div>

                </div>


                {/* RIGHT */}
                <div className="home-right">

                    <span className="home-year">
                        2026
                    </span>

                    <h1 className="home-title">
                        PORTO
                        <span>FOLIO</span>
                    </h1>

                    <div className="home-info">

                        <span className="home-tag">
                            WEB DEVELOPMENT
                        </span>

                        <span className="home-tag">
                            UI / UX
                        </span>

                        <span className="home-tag">
                            AI / MACHINE LEARNING
                        </span>

                    </div>

                    <p className="home-description">
                        Welcome to my digital portfolio.
                        <br />
                        Explore my projects, activities,
                        certificates and experiences.
                    </p>

                    <a
                        href="/projects"
                        className="home-button"
                    >
                        VIEW MY WORK ↗
                    </a>

                </div>

            </div>

        </section>
    );
}

export default Home;