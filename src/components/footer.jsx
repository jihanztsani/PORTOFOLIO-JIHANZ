import React, { useState } from "react";
import Lanyard from "./Lanyard";
import foto2 from "../assets/foto 2.jpeg";
import "./footer.css";

function Footer() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) return;
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", message: "" });
        }, 4000);
    };

    return (
        <footer id="contact" className="site-footer">
            {/* Background giant watermark */}
            <div className="footer-watermark">CONTACT</div>

            {/* Ambient Teal / Emerald Glow */}
            <div className="footer-ambient-glow"></div>

            <div className="footer-container">
                {/* LANYARD 3D COLUMN: Left of Get in Touch */}
                <div className="footer-lanyard-col">
                    <Lanyard
                        position={[0, 0, 16]}
                        gravity={[0, -40, 0]}
                        cardScale={2.55}
                        frontImage={foto2}
                        backImage={foto2}
                        imageFit="cover"
                    />
                </div>

                {/* MIDDLE COLUMN: Contact Info */}
                <div className="contact-info-col">
                    <h2 className="contact-title">Get in touch<span className="act-dot">.</span></h2>
                    <p className="contact-description">
                        Have questions or ready to transform your business with AI automation and modern web solutions?
                    </p>

                    <div className="contact-cards-list">
                        {/* Email Card */}
                        <a href="mailto:jihanzfairuztsani@gmail.com" className="contact-card" target="_blank" rel="noreferrer">
                            <div className="contact-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect width="20" height="16" x="2" y="4" rx="2" />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                            </div>
                            <div className="contact-card-content">
                                <span className="card-label">Email us</span>
                                <span className="card-val">jihanzfairuztsani@gmail.com</span>
                            </div>
                            <div className="contact-card-arrow">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="7" y1="17" x2="17" y2="7" />
                                    <polyline points="7 7 17 7 17 17" />
                                </svg>
                            </div>
                        </a>

                        {/* Phone Card */}
                        <a href="https://wa.me/6281234567890" className="contact-card" target="_blank" rel="noreferrer">
                            <div className="contact-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                            </div>
                            <div className="contact-card-content">
                                <span className="card-label">Call us</span>
                                <span className="card-val">+62 812-3456-7890</span>
                            </div>
                            <div className="contact-card-arrow">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="7" y1="17" x2="17" y2="7" />
                                    <polyline points="7 7 17 7 17 17" />
                                </svg>
                            </div>
                        </a>

                        {/* Location Card */}
                        <div className="contact-card">
                            <div className="contact-card-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div className="contact-card-content">
                                <span className="card-label">Our location</span>
                                <span className="card-val">Pekanbaru, Riau, Indonesia</span>
                            </div>
                            <div className="contact-card-arrow">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="7" y1="17" x2="17" y2="7" />
                                    <polyline points="7 7 17 7 17 17" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Contact Form */}
                <div className="contact-form-col">
                    <form className="contact-form-card" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="email"
                                className="form-input"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <textarea
                                className="form-input form-textarea"
                                placeholder="Message"
                                rows={6}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className={`form-submit-btn ${submitted ? "btn-success" : ""}`}>
                            {submitted ? "Message Sent ✓" : "Submit"}
                        </button>
                    </form>
                </div>
            </div>

            {/* BOTTOM BAR: Copyright & Meta */}
            <div className="footer-bottom-bar">
                <span>JIHANZ PORTFOLIO</span>
                <span>DIGITAL PORTFOLIO</span>
                <span>© 2026 JIHANZ</span>
            </div>
        </footer>
    );
}

export default Footer;