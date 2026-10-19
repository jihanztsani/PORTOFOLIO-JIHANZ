import React, { useState, useEffect } from "react";
import "./StickyNotes.css";

const COLOR_OPTIONS = [
    { id: "yellow", name: "Yellow", bg: "#fef08a", pin: "#eab308", border: "#fde047" },
    { id: "blue",   name: "Sky Blue", bg: "#bae6fd", pin: "#0284c7", border: "#7dd3fc" },
    { id: "green",  name: "Mint", bg: "#bbf7d0", pin: "#16a34a", border: "#86efac" },
    { id: "pink",   name: "Blush", bg: "#fbcfe8", pin: "#db2777", border: "#f472b6" },
    { id: "purple", name: "Lavender", bg: "#e9d5ff", pin: "#9333ea", border: "#d8b4fe" },
    { id: "orange", name: "Peach", bg: "#fed7aa", pin: "#ea580c", border: "#fdba74" },
];

const CATEGORIES = [
    { id: "all", label: "Semua Catatan" },
    { id: "ulasan", label: "💬 Ulasan" },
    { id: "saran", label: "💡 Saran" },
    { id: "kritik", label: "🚀 Kritik Membangun" },
    { id: "salam", label: "✨ Salam & Semangat" },
];

const INITIAL_NOTES = [
    {
        id: "note-1",
        name: "Aditya Pratama",
        role: "UI/UX Designer",
        category: "ulasan",
        color: "yellow",
        text: "Desain portofolionya gokil banget! Transisi halaman 3D dan perpaduan auroranya berasa premium dan editorial banget. Keep it up Jihanz! 🔥",
        date: "14 Okt 2026",
        likes: 12,
        rotation: -2.2,
        isCustom: false,
    },
    {
        id: "note-2",
        name: "Rifky Alamsyah",
        role: "Frontend Dev",
        category: "saran",
        color: "blue",
        text: "Saran kecil: Mungkin di list project bisa ditambah filter teknologi (React, 3D, dll) biar makin gampang dieksplor. Selebihnya interaksinya udah super smooth!",
        date: "13 Okt 2026",
        likes: 8,
        rotation: 1.8,
        isCustom: false,
    },
    {
        id: "note-3",
        name: "Nabila Sarah",
        role: "Visitor",
        category: "salam",
        color: "pink",
        text: "Keren pol landing pagenya! Animasi sticky note dan lanyard kartu 3D-nya unik, jarang nemu portofolio dengan konsep se-detail ini. Sukses terus yaa ✨",
        date: "12 Okt 2026",
        likes: 15,
        rotation: -1.2,
        isCustom: false,
    },
    {
        id: "note-4",
        name: "Kevin Sanjaya",
        role: "Tech Enthusiast",
        category: "kritik",
        color: "green",
        text: "Kritik membangun: Di layar mobile font headline agak sedikit rapat, tapi selebihnya performa dan kerapian kodenya top tier. Good job!",
        date: "10 Okt 2026",
        likes: 5,
        rotation: 2.4,
        isCustom: false,
    },
    {
        id: "note-5",
        name: "Dimas Nugraha",
        role: "Campus Colleague",
        category: "ulasan",
        color: "purple",
        text: "Bangga banget liat perkembangannya bro! Eksplorasi AI & NLP-nya mantap, ditunggu kolaborasi project berikutnya 🚀",
        date: "08 Okt 2026",
        likes: 9,
        rotation: -2.8,
        isCustom: false,
    },
    {
        id: "note-6",
        name: "Clara Wijaya",
        role: "Product Enthusiast",
        category: "saran",
        color: "orange",
        text: "Suka banget sama sound effect kertas pas ganti halaman! Detail mikro kayak gini yang bikin website berkesan hidup dan berkarakter.",
        date: "05 Okt 2026",
        likes: 11,
        rotation: 1.5,
        isCustom: false,
    },
];

const STORAGE_KEY = "jihanz_portfolio_sticky_notes";

function StickyNotes() {
    const [notes, setNotes] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) return parsed;
            }
        } catch {
            // fallback
        }
        return INITIAL_NOTES;
    });

    const [activeFilter, setActiveFilter] = useState("all");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [likedNotes, setLikedNotes] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("jihanz_liked_notes") || "[]");
        } catch {
            return [];
        }
    });

    // Form states
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [category, setCategory] = useState("ulasan");
    const [selectedColor, setSelectedColor] = useState("yellow");
    const [noteText, setNoteText] = useState("");
    const [formError, setFormError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    // Persist notes
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        } catch {
            // ignore
        }
    }, [notes]);

    // Persist likes
    useEffect(() => {
        try {
            localStorage.setItem("jihanz_liked_notes", JSON.stringify(likedNotes));
        } catch {
            // ignore
        }
    }, [likedNotes]);

    const handleLike = (id) => {
        if (likedNotes.includes(id)) {
            // Unlike
            setNotes((prev) =>
                prev.map((n) => (n.id === id ? { ...n, likes: Math.max(0, n.likes - 1) } : n))
            );
            setLikedNotes((prev) => prev.filter((item) => item !== id));
        } else {
            // Like
            setNotes((prev) =>
                prev.map((n) => (n.id === id ? { ...n, likes: n.likes + 1 } : n))
            );
            setLikedNotes((prev) => [...prev, id]);
        }
    };

    const handleDelete = (id) => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
    };

    const handleSubmitNote = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setFormError("Nama atau inisial harus diisi.");
            return;
        }
        if (!noteText.trim()) {
            setFormError("Pesan ulasan atau kritik/saran tidak boleh kosong.");
            return;
        }
        if (noteText.trim().length < 5) {
            setFormError("Pesan terlalu singkat (minimal 5 karakter).");
            return;
        }

        const now = new Date();
        const dateStr = now.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

        // Random subtle rotation between -3.5 and +3.5 deg
        const randomRot = +(Math.random() * 6 - 3).toFixed(1);

        const newNote = {
            id: `note-${Date.now()}`,
            name: name.trim(),
            role: role.trim() || "Visitor",
            category,
            color: selectedColor,
            text: noteText.trim(),
            date: dateStr,
            likes: 0,
            rotation: randomRot,
            isCustom: true,
        };

        setNotes((prev) => [newNote, ...prev]);
        setIsSuccess(true);

        setTimeout(() => {
            setIsSuccess(false);
            setIsModalOpen(false);
            setName("");
            setRole("");
            setNoteText("");
            setFormError("");
        }, 1200);
    };

    const filteredNotes = notes.filter((n) => {
        if (activeFilter === "all") return true;
        return n.category === activeFilter;
    });

    return (
        <section id="reviews" className="sticky-notes-section">
            {/* TOP EDITORIAL SECTION BAR */}
            <div className="section-topbar">
                <span>PORTFOLIO</span>
                <span>03 — VISITOR WALL &amp; FEEDBACK</span>
                <span>2026</span>
            </div>

            {/* HEADER */}
            <div className="sticky-notes-header">
                <div className="header-badge-row">
                    <span className="blue-label">INTERACTIVE GUESTBOOK</span>
                    <span className="notes-counter-tag">
                        📌 {notes.length} CATATAN TERTEMPEL
                    </span>
                </div>

                <h2 className="sticky-notes-title">
                    Sticky Notes &amp; Reviews<span className="blue-dot">.</span>
                </h2>

                <p className="sticky-notes-subtitle">
                    Punya ulasan, apresiasi, atau kritik dan saran untuk portofolio ini? Tempelkan sticky note-mu di papan interaktif ini! Setiap pesan dan masukanmu sangat berharga.
                </p>

                {/* ACTION ROW: FILTERS + ADD NOTE BUTTON */}
                <div className="sticky-action-bar">
                    <div className="sticky-filters">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                type="button"
                                className={`sticky-filter-btn ${activeFilter === cat.id ? "active" : ""}`}
                                onClick={() => setActiveFilter(cat.id)}
                            >
                                {cat.label}
                                {cat.id !== "all" && (
                                    <span className="filter-count">
                                        {notes.filter((n) => n.category === cat.id).length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    <button
                        type="button"
                        className="add-note-cta-btn"
                        onClick={() => {
                            setFormError("");
                            setIsModalOpen(true);
                        }}
                    >
                        <span className="plus-icon">✏️</span>
                        <span>Tempelkan Sticky Note</span>
                    </button>
                </div>
            </div>

            {/* CORKBOARD PINBOARD STAGE */}
            <div className="sticky-board-stage">
                {/* Decorative Pinboard Texture Lines */}
                <div className="board-grid-pattern" aria-hidden="true" />

                {filteredNotes.length === 0 ? (
                    <div className="empty-notes-prompt">
                        <span className="empty-icon">📝</span>
                        <p>Belum ada catatan pada kategori ini. Jadilah yang pertama menempelkan catatan!</p>
                        <button
                            type="button"
                            className="empty-cta-btn"
                            onClick={() => {
                                setFormError("");
                                setIsModalOpen(true);
                            }}
                        >
                            + Tulis Sekarang
                        </button>
                    </div>
                ) : (
                    <div className="sticky-notes-grid">
                        {filteredNotes.map((note) => {
                            const colorObj = COLOR_OPTIONS.find((c) => c.id === note.color) || COLOR_OPTIONS[0];
                            const isLiked = likedNotes.includes(note.id);

                            return (
                                <article
                                    key={note.id}
                                    className={`sticky-note-card color-${note.color} ${note.isCustom ? "is-user-note" : ""}`}
                                    style={{
                                        "--note-bg": colorObj.bg,
                                        "--note-pin": colorObj.pin,
                                        "--note-border": colorObj.border,
                                        "--note-rot": `${note.rotation}deg`,
                                    }}
                                >
                                    {/* PUSHPIN AT TOP */}
                                    <div className="sticky-pushpin" aria-hidden="true">
                                        <div className="pin-head" />
                                        <div className="pin-shadow" />
                                    </div>

                                    {/* WASHI TAPE / PIN ACCENT */}
                                    <div className="sticky-washi-tape" aria-hidden="true" />

                                    {/* NOTE HEADER: CATEGORY BADGE & TIME */}
                                    <div className="note-card-header">
                                        <span className="note-cat-tag">
                                            {note.category === "ulasan" && "💬 Ulasan"}
                                            {note.category === "saran" && "💡 Saran"}
                                            {note.category === "kritik" && "🚀 Kritik"}
                                            {note.category === "salam" && "✨ Salam"}
                                        </span>
                                        <span className="note-date">{note.date}</span>
                                    </div>

                                    {/* NOTE TEXT BODY */}
                                    <div className="note-card-body">
                                        <p className="note-text-content">"{note.text}"</p>
                                    </div>

                                    {/* NOTE FOOTER: AUTHOR & INTERACTIONS */}
                                    <div className="note-card-footer">
                                        <div className="note-author-info">
                                            <span className="note-author-name">{note.name}</span>
                                            {note.role && <span className="note-author-role">{note.role}</span>}
                                        </div>

                                        <div className="note-actions-row">
                                            <button
                                                type="button"
                                                className={`note-like-btn ${isLiked ? "liked" : ""}`}
                                                onClick={() => handleLike(note.id)}
                                                title={isLiked ? "Batalkan suka" : "Sukai catatan ini"}
                                            >
                                                <span className="heart-icon">{isLiked ? "❤️" : "🤍"}</span>
                                                <span className="like-count">{note.likes}</span>
                                            </button>

                                            {note.isCustom && (
                                                <button
                                                    type="button"
                                                    className="note-delete-btn"
                                                    onClick={() => handleDelete(note.id)}
                                                    title="Hapus catatan saya"
                                                >
                                                    🗑️
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* FOLDED CORNER SHADOW */}
                                    <div className="note-corner-fold" aria-hidden="true" />
                                </article>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* MODAL / POPUP: TAMBAH STICKY NOTE */}
            {isModalOpen && (
                <div className="sticky-modal-backdrop" onClick={() => !isSuccess && setIsModalOpen(false)}>
                    <div
                        className="sticky-modal-card"
                        onClick={(e) => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="modal-header">
                            <div>
                                <span className="blue-label">KIRIM ULASAN &amp; SARAN</span>
                                <h3 className="modal-title">Tempelkan Catatan Baru</h3>
                            </div>
                            <button
                                type="button"
                                className="modal-close-btn"
                                onClick={() => setIsModalOpen(false)}
                                aria-label="Tutup modal"
                            >
                                ✕
                            </button>
                        </div>

                        {isSuccess ? (
                            <div className="modal-success-state">
                                <div className="success-stamp">📌 TERPASANG!</div>
                                <p>Terima kasih banyak! Catatan kamu sudah berhasil ditempelkan di papan.</p>
                            </div>
                        ) : (
                            <form className="modal-note-form" onSubmit={handleSubmitNote}>
                                {formError && <div className="form-error-banner">{formError}</div>}

                                <div className="form-row-dual">
                                    <div className="form-field">
                                        <label htmlFor="sticky-name">Nama / Panggilan *</label>
                                        <input
                                            id="sticky-name"
                                            type="text"
                                            className="modal-input"
                                            placeholder="cth. Rian / Alex"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            maxLength={35}
                                            required
                                        />
                                    </div>

                                    <div className="form-field">
                                        <label htmlFor="sticky-role">Profesi / Keterangan (Opsional)</label>
                                        <input
                                            id="sticky-role"
                                            type="text"
                                            className="modal-input"
                                            placeholder="cth. UI/UX Designer / Teman"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            maxLength={30}
                                        />
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label>Jenis Catatan</label>
                                    <div className="category-radio-group">
                                        {[
                                            { id: "ulasan", label: "💬 Ulasan" },
                                            { id: "saran", label: "💡 Saran" },
                                            { id: "kritik", label: "🚀 Kritik" },
                                            { id: "salam", label: "✨ Salam" },
                                        ].map((item) => (
                                            <button
                                                type="button"
                                                key={item.id}
                                                className={`category-pill-select ${category === item.id ? "selected" : ""}`}
                                                onClick={() => setCategory(item.id)}
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label>Warna Sticky Note</label>
                                    <div className="color-picker-row">
                                        {COLOR_OPTIONS.map((c) => (
                                            <button
                                                key={c.id}
                                                type="button"
                                                className={`color-swatch-btn ${selectedColor === c.id ? "active" : ""}`}
                                                style={{ backgroundColor: c.bg }}
                                                onClick={() => setSelectedColor(c.id)}
                                                title={c.name}
                                            >
                                                {selectedColor === c.id && <span className="swatch-check">✓</span>}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-field">
                                    <div className="label-with-counter">
                                        <label htmlFor="sticky-message">Pesan / Ulasan / Kritik &amp; Saran *</label>
                                        <span className="char-counter">{noteText.length}/240</span>
                                    </div>
                                    <textarea
                                        id="sticky-message"
                                        className="modal-textarea"
                                        placeholder="Tulis ulasan, kritik, saran, atau sekadar pesan apresiasi untuk portofolio Jihanz..."
                                        rows={4}
                                        maxLength={240}
                                        value={noteText}
                                        onChange={(e) => setNoteText(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* PREVIEW MINI NOTE */}
                                <div className="modal-preview-box">
                                    <span className="preview-label">Live Preview:</span>
                                    <div
                                        className="mini-preview-note"
                                        style={{
                                            backgroundColor:
                                                COLOR_OPTIONS.find((c) => c.id === selectedColor)?.bg || "#fef08a",
                                        }}
                                    >
                                        <span className="mini-note-text">
                                            "{noteText.trim() || "Pratinjau pesan catatanmu akan muncul di sini..."}"
                                        </span>
                                        <span className="mini-note-author">
                                            — {name.trim() || "Nama Kamu"}{role.trim() ? ` (${role.trim()})` : ""}
                                        </span>
                                    </div>
                                </div>

                                <div className="modal-actions-bar">
                                    <button
                                        type="button"
                                        className="modal-cancel-btn"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Batal
                                    </button>
                                    <button type="submit" className="modal-submit-btn">
                                        📌 Tempelkan Note Sekarang
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}

export default StickyNotes;
