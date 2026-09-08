import React from "react";
import profilePhoto from "../assets/foto 1.jpeg";
import "./hero.css";

function Hero() {
    return (
        <div className="editorial-hero-stage">
            {/* LEFT COLUMN: CARD STACK WITH HOVER EFFECT */}
            <div className="hero-photo-col">
                <div className="card-stack">
                    {/* Back Card One (blue) */}
                    <div className="card one"></div>

                    {/* Back Card Two (blue) */}
                    <div className="card two"></div>

                    {/* Front Main Card with Photo */}
                    <div className="card main">
                        <img
                            src={profilePhoto}
                            alt="Jihanz Fairuz Tsani"
                            className="card-main-photo"
                        />
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: HEADLINE TYPOGRAPHY & STATEMENT */}
            <div className="hero-text-col">
                <div className="editorial-giant-title">
                    <span className="title-line line-1">
                        HELLO I'M
                    </span>
                    <span className="title-line line-3">
                        JIHANZ FAIRUZ TSANI
                    </span>
                </div>

                {/* STATEMENT BOX */}
                <div className="editorial-statement-box">
                    <p className="statement-text">
                        I EXPLORE A VIBRANT WORLD
                        <br />
                        OF CODE &amp; DESIGN WHERE EVERY
                        <br />
                        PROJECT TELLS A STORY
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Hero;
