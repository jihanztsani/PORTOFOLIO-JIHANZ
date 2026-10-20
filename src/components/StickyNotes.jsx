import React, { useState, useEffect } from "react";
import "./StickyNotes.css";

// ── 5 Colors extracted directly from user's palette image ─────────────────────
export const COLOR_OPTIONS = [
    {
        id: "blue-1",
        name: "Midnight Navy",
        bg: "#011f4b",
        text: "#f8fafc",
        subtext: "rgba(248, 250, 252, 0.75)",
        border: "rgba(255, 255, 255, 0.14)",
        pin: "#b3cde0",
    },
    {
        id: "blue-2",
        name: "Deep Ocean",
        bg: "#03396c",
        text: "#f8fafc",
        subtext: "rgba(248, 250, 252, 0.75)",
        border: "rgba(255, 255, 255, 0.16)",
        pin: "#b3cde0",
    },
    {
        id: "blue-3",
        name: "Cobalt Blue",
        bg: "#005b96",
        text: "#ffffff",
        subtext: "rgba(255, 255, 255, 0.8)",
        border: "rgba(255, 255, 255, 0.18)",
        pin: "#b3cde0",
    },
    {
        id: "blue-4",
        name: "Steel Blue",
        bg: "#6497b1",
        text: "#011f4b",
        subtext: "rgba(1, 31, 75, 0.75)",
        border: "rgba(1, 31, 75, 0.22)",
        pin: "#011f4b",
    },
    {
        id: "blue-5",
        name: "Ice Blue",
        bg: "#b3cde0",
        text: "#011f4b",
        subtext: "rgba(1, 31, 75, 0.75)",
        border: "rgba(1, 31, 75, 0.2)",
        pin: "#005b96",
    },
];

const INITIAL_NOTES = [
    {
        id: "note-1",
        name: "Aditya Pratama",
        color: "blue-1",
        text: "Desain portofolionya keren banget! Transisi halaman dan perpaduan visualnya berasa sangat hidup dan premium. Sukses terus Jihanz! 🔥",
        rotation: -2.4,
        isCustom: false,
    },
    {
        id: "note-2",
        name: "Rifky Alamsyah",
        color: "blue-2",
        text: "Website yang interaktif dan visualnya luar biasa rapi. Konsep editorialnya berkarakter dan seru buat dieksplor!",
        rotation: 2.1,
        isCustom: false,
    },
    {
        id: "note-3",
        name: "Nabila Sarah",
        color: "blue-3",
        text: "Keren pol! Konsep sticky note-nya estetik dan palet warnanya adem banget dilihat. Sukses selalu ✨",
        rotation: -1.6,
        isCustom: false,
    },
    {
        id: "note-4",
        name: "Kevin Sanjaya",
        color: "blue-4",
        text: "Performa website responsif, halus, dan kodenya terstruktur dengan rapi. Good job bro!",
        rotation: 2.5,
        isCustom: false,
    },
    {
        id: "note-5",
        name: "Dimas Nugraha",
        color: "blue-5",
        text: "Bangga liat perkembangannya! Eksplorasi riset AI & Frontend-nya mantap, ditunggu project kolaborasi selanjutnya 🚀",
        rotation: -2.8,
        isCustom: false,
    },
    {
        id: "note-6",
        name: "Clara Wijaya",
        color: "blue-3",
        text: "Detail mikro dan interaksi di setiap section-nya menyenangkan banget. Keren banget hasilnya!",
        rotation: 1.8,
        isCustom: false,
    },
];

const STORAGE_KEY = "jihanz_portfolio_sticky_notes_flanking_v1";

// ── Single Note Item Component ────────────────────────────────────────────────
function StickyNoteCard({ note, onDelete, index = 0, side = "left" }) {
    const colorObj =
        COLOR_OPTIONS.find((c) => c.id === note.color) || COLOR_OPTIONS[0];

    const floatVariant = (index % 3) + 1;
    const animDelay = (index * 0.7).toFixed(1);
    const offsetX = side === "left"
        ? (index % 2 === 0 ? "-12px" : "14px")
        : (index % 2 === 0 ? "14px" : "-12px");

    return (
        <article
            className={`sticky-note-card float-variant-${floatVariant} ${note.isCustom ? "is-user-note" : ""}`}
            style={{
                "--note-bg": colorObj.bg,
                "--note-text": colorObj.text,
                "--note-subtext": colorObj.subtext,
                "--note-border": colorObj.border,
                "--note-pin": colorObj.pin,
                "--note-rot": `${note.rotation || 0}deg`,
                "--float-delay": `${animDelay}s`,
                "--offset-x": offsetX,
            }}
        >
            <div className="sticky-pushpin" aria-hidden="true">
                <div className="pin-head" />
                <div className="pin-shadow" />
            </div>

            <div className="note-card-body">
                <p className="note-text-content">"{note.text}"</p>
            </div>

            <div className="note-card-footer">
                <span className="note-author-name">— {note.name}</span>

                {note.isCustom && (
                    <button
                        type="button"
                        className="note-delete-btn"
                        onClick={() => onDelete(note.id)}
                        title="Hapus catatan saya"
                        aria-label="Hapus catatan"
                    >
                        🗑️
                    </button>
                )}
            </div>

            <div className="note-corner-fold" aria-hidden="true" />
        </article>
    );
}

// ── Main StickyNotes Component ────────────────────────────────────────────────
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

    const [name, setName] = useState("");
    const [noteText, setNoteText] = useState("");
    const [selectedColor, setSelectedColor] = useState("blue-3");
    const [formError, setFormError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        } catch {
            // ignore
        }
    }, [notes]);

    const handleDelete = (id) => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
    };

    const handleSubmitNote = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setFormError("Nama harus diisi.");
            return;
        }
        if (!noteText.trim()) {
            setFormError("Isi catatan tidak boleh kosong.");
            return;
        }
        if (noteText.trim().length < 3) {
            setFormError("Isi catatan minimal 3 karakter.");
            return;
        }

        const randomRot = +(Math.random() * 5 - 2.5).toFixed(1);

        const newNote = {
            id: `note-${Date.now()}`,
            name: name.trim(),
            color: selectedColor,
            text: noteText.trim(),
            rotation: randomRot,
            isCustom: true,
        };

        setNotes((prev) => [newNote, ...prev]);
        setName("");
        setNoteText("");
        setFormError("");
        setSuccessMessage("Catatan berhasil tertempel! 📌");

        setTimeout(() => {
            setSuccessMessage("");
        }, 3000);
    };

    const selectedColorObj =
        COLOR_OPTIONS.find((c) => c.id === selectedColor) || COLOR_OPTIONS[2];

    // Distribute notes flanking left and right
    const leftNotes = notes.filter((_, idx) => idx % 2 === 0);
    const rightNotes = notes.filter((_, idx) => idx % 2 !== 0);

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
                    Sticky Notes<span className="blue-dot">.</span>
                </h2>
                <p className="sticky-notes-subtitle">
                    Tinggalkan pesan, kesan, atau apresiasi untuk portofolio ini. Tulis nama dan isi pesanmu di form tengah, catatanmu akan langsung tertempel di papan!
                </p>
            </div>

            {/* FLANKING LAYOUT: LEFT NOTES — CENTER FORM — RIGHT NOTES */}
            <div className="sticky-flanking-layout">
                {/* ── LEFT COLUMN NOTES ── */}
                <div className="sticky-notes-column sticky-notes-left">
                    {leftNotes.map((note, i) => (
                        <StickyNoteCard
                            key={note.id}
                            note={note}
                            onDelete={handleDelete}
                            index={i}
                            side="left"
                        />
                    ))}
                </div>

                    {/* ── CENTER INPUT FORM ── */}
                    <div className="sticky-center-form-container">
                        <div className="center-form-header">
                            <span className="blue-label">TULIS PESAN</span>
                            <h3 className="center-form-title">Tempelkan Catatan Baru</h3>
                            <p className="center-form-desc">
                                Isi nama dan pesanmu di bawah ini untuk ditempelkan ke papan.
                            </p>
                        </div>

                        {formError && (
                            <div className="form-error-banner">{formError}</div>
                        )}
                        {successMessage && (
                            <div className="form-success-banner">{successMessage}</div>
                        )}

                        <form className="inline-note-form" onSubmit={handleSubmitNote}>
                            <div className="form-field">
                                <label htmlFor="inline-sticky-name">Nama *</label>
                                <input
                                    id="inline-sticky-name"
                                    type="text"
                                    className="modal-input"
                                    placeholder="Masukkan nama kamu..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    maxLength={35}
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <div className="label-with-counter">
                                    <label htmlFor="inline-sticky-text">Isi Catatan *</label>
                                    <span className="char-counter">{noteText.length}/240</span>
                                </div>
                                <textarea
                                    id="inline-sticky-text"
                                    className="modal-textarea"
                                    placeholder="Tulis pesan atau catatanmu di sini..."
                                    rows={4}
                                    maxLength={240}
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-field">
                                <label>Pilihan Warna Catatan</label>
                                <div className="color-picker-row">
                                    {COLOR_OPTIONS.map((c) => (
                                        <button
                                            key={c.id}
                                            type="button"
                                            className={`color-swatch-btn ${selectedColor === c.id ? "active" : ""}`}
                                            style={{ backgroundColor: c.bg }}
                                            onClick={() => setSelectedColor(c.id)}
                                            title={c.name}
                                            aria-label={c.name}
                                        >
                                            {selectedColor === c.id && (
                                                <span
                                                    className="swatch-check"
                                                    style={{ color: c.text }}
                                                >
                                                    ✓
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* LIVE PREVIEW OF THE NOTE */}
                            <div className="modal-preview-box">
                                <span className="preview-label">Live Preview:</span>
                                <div
                                    className="mini-preview-note"
                                    style={{
                                        backgroundColor: selectedColorObj.bg,
                                        color: selectedColorObj.text,
                                        border: `1px solid ${selectedColorObj.border}`,
                                    }}
                                >
                                    <span
                                        className="mini-note-text"
                                        style={{ color: selectedColorObj.text }}
                                    >
                                        "{noteText.trim() || "Isi catatanmu akan muncul di sini..."}"
                                    </span>
                                    <span
                                        className="mini-note-author"
                                        style={{ color: selectedColorObj.subtext }}
                                    >
                                        — {name.trim() || "Nama Kamu"}
                                    </span>
                                </div>
                            </div>

                            <button type="submit" className="add-note-submit-btn">
                                📌 Tempelkan Note Sekarang
                            </button>
                        </form>
                    </div>

                    {/* ── RIGHT COLUMN NOTES ── */}
                    <div className="sticky-notes-column sticky-notes-right">
                        {rightNotes.map((note, i) => (
                            <StickyNoteCard
                                key={note.id}
                                note={note}
                                onDelete={handleDelete}
                                index={i}
                                side="right"
                            />
                        ))}
                    </div>
                </div>
            </section>
    );
}

export default StickyNotes;
