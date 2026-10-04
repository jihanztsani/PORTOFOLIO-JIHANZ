import React from "react";
import Hero3DModel from "../components/Hero3DModel";
import "./hero.css";

function Hero() {
    return (
        <div className="editorial-hero-stage">
            {/* LEFT COLUMN: ROTATING 3D MODEL */}
            <div className="hero-model-col">
                <Hero3DModel />
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
