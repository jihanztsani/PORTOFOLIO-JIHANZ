import React, { useState, useEffect, useRef, useCallback } from "react";
import { frame, useMotionValue, useSpring, useVelocity } from "motion/react";
import "./MusicPlayer.css";

const START_OFFSET_SECONDS = 18;

// Compact WakeSlider (React Bits wake physics)
function WakeSlider({ value = 50, onChange, bars = 12 }) {
    const pct = Math.min(100, Math.max(0, value));
    const rest = 7 / 26;
    const barEls = useRef([]);
    const crestEls = useRef([]);
    const trackRef = useRef(null);
    const pointerId = useRef(null);
    const lastAmp = useRef(0);

    const target = useMotionValue(pct);
    const head = useSpring(target, { stiffness: 900, damping: 60, mass: 1 });
    const rawSpeed = useVelocity(head);
    const speed = useSpring(rawSpeed, { stiffness: 450, damping: 50, mass: 1 });

    useEffect(() => {
        target.set(pct);
    }, [pct, target]);

    const paint = useCallback((force = false) => {
        const h = (head.get() / 100) * (bars - 1);
        const v = speed.get();
        const amp = Math.min(1, Math.max(0, (Math.abs(v) * 1.2) / 320));
        const dir = Math.sign(v) || 1;
        const r = 1.5 + 3.5 * amp;
        const lit = head.get() <= 0.1 ? -1 : Math.round(h);
        const flat = !force && amp < 0.002 && lastAmp.current < 0.002;

        for (let i = 0; i < bars; i++) {
            const el = barEls.current[i];
            if (!el) continue;
            const on = i <= lit ? "true" : "false";
            if (el.dataset.on !== on) el.dataset.on = on;
            if (flat) continue;
            const d = i - h;
            const R = d * dir < 0 ? r * 1.5 : r * 0.75;
            const lift = Math.abs(d) < R ? amp * Math.cos((Math.PI * d) / (2 * R)) ** 2 : 0;
            el.style.transform = `scaleY(${rest + lift * (1 - rest)})`;
            if (crestEls.current[i]) crestEls.current[i].style.opacity = String(lift);
        }
        lastAmp.current = amp;
    }, [bars, head, speed, rest]);

    useEffect(() => {
        const schedule = () => frame.render(() => paint(), false, true);
        const unsubHead = head.on("change", schedule);
        const unsubSpeed = speed.on("change", schedule);
        paint(true);
        return () => {
            unsubHead();
            unsubSpeed();
        };
    }, [head, speed, paint]);

    const commitFromX = (clientX) => {
        const track = trackRef.current;
        if (!track) return;
        const rect = track.getBoundingClientRect();
        if (!rect.width) return;
        const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
        onChange?.(Math.round(ratio * 100));
    };

    return (
        <div
            ref={trackRef}
            className="nav-wake-slider-track"
            onPointerDown={(e) => {
                pointerId.current = e.pointerId;
                try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}
                commitFromX(e.clientX);
            }}
            onPointerMove={(e) => {
                if (e.pointerId === pointerId.current) commitFromX(e.clientX);
            }}
            onPointerUp={(e) => {
                if (e.pointerId === pointerId.current) {
                    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
                    pointerId.current = null;
                }
            }}
            onPointerCancel={() => { pointerId.current = null; }}
        >
            {Array.from({ length: bars }, (_, i) => (
                <span
                    key={i}
                    ref={(el) => { barEls.current[i] = el; }}
                    className="nav-wake-bar"
                >
                    <span
                        ref={(el) => { crestEls.current[i] = el; }}
                        className="nav-wake-crest"
                    />
                </span>
            ))}
        </div>
    );
}

function MusicPlayer({ className = "" }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [prevVolume, setPrevVolume] = useState(0.5);
    const [showAutoplayPrompt, setShowAutoplayPrompt] = useState(false);

    // Set initial start time at 18 seconds
    const initializeAudioTime = () => {
        const audio = audioRef.current;
        if (audio && audio.currentTime < START_OFFSET_SECONDS) {
            try {
                audio.currentTime = START_OFFSET_SECONDS;
            } catch (err) {
                // Ignore if metadata is not yet ready
            }
        }
    };

    // Initial load autoplay handling - starts playing immediately on page open
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = volume;
        initializeAudioTime();

        const instantUnmute = () => {
            if (audio) {
                audio.muted = false;
                audio.volume = 0.6;
                setIsMuted(false);
                setIsPlaying(true);
                setShowAutoplayPrompt(false);
            }
            cleanupUnmuteListeners();
        };

        const cleanupUnmuteListeners = () => {
            const events = ["mousemove", "pointermove", "scroll", "wheel", "touchstart", "pointerdown", "keydown"];
            events.forEach((evt) => {
                window.removeEventListener(evt, instantUnmute);
            });
        };

        const attemptPlay = () => {
            initializeAudioTime();
            // Try direct unmuted playback first
            audio.muted = false;
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        setIsPlaying(true);
                        setIsMuted(false);
                        setShowAutoplayPrompt(false);
                    })
                    .catch(() => {
                        // If browser blocks unmuted audio on first load:
                        // 1. Immediately play muted so track starts playing right away at 18s!
                        audio.muted = true;
                        setIsMuted(true);
                        audio.play()
                            .then(() => {
                                setIsPlaying(true);
                            })
                            .catch((e) => console.log(e));

                        // 2. Unmute on any subtle movement without requiring an intrusive click!
                        const events = ["mousemove", "pointermove", "scroll", "wheel", "touchstart", "pointerdown", "keydown"];
                        events.forEach((evt) => {
                            window.addEventListener(evt, instantUnmute, { once: true, passive: true });
                        });
                    });
            }
        };

        // Attempt playback instantly when page opens
        attemptPlay();

        // Listen for explicit play request
        const handleExplicitPlay = () => {
            instantUnmute();
            attemptPlay();
        };
        window.addEventListener("play-portfolio-audio", handleExplicitPlay);

        return () => {
            cleanupUnmuteListeners();
            window.removeEventListener("play-portfolio-audio", handleExplicitPlay);
        };
    }, []);

    // Handle Play / Pause toggle
    const togglePlay = (e) => {
        e?.stopPropagation();
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            initializeAudioTime();
            audio.play()
                .then(() => {
                    setIsPlaying(true);
                    setShowAutoplayPrompt(false);
                })
                .catch((err) => {
                    console.warn("Playback error:", err);
                });
        }
    };

    // Handle Volume Change
    const handleVolumeChange = (newVal) => {
        const valNum = typeof newVal === "number" ? newVal : parseFloat(newVal?.target?.value ?? 50);
        const newVol = Math.max(0, Math.min(1, valNum > 1 ? valNum / 100 : valNum));
        setVolume(newVol);
        if (audioRef.current) {
            audioRef.current.volume = newVol;
            if (newVol > 0 && isMuted) {
                setIsMuted(false);
                audioRef.current.muted = false;
            } else if (newVol === 0) {
                setIsMuted(true);
                audioRef.current.muted = true;
            }
        }
    };

    // Handle Mute Toggle
    const toggleMute = (e) => {
        e?.stopPropagation();
        const audio = audioRef.current;
        if (!audio) return;

        if (isMuted) {
            audio.muted = false;
            setIsMuted(false);
            const restoreVol = prevVolume > 0 ? prevVolume : 0.5;
            setVolume(restoreVol);
            audio.volume = restoreVol;
        } else {
            setPrevVolume(volume > 0 ? volume : 0.5);
            audio.muted = true;
            setIsMuted(true);
            setVolume(0);
        }
    };

    return (
        <div className={`navbar-music-player ${isPlaying ? "is-playing" : ""} ${className}`}>
            {/* HTML5 Audio Element configured for Timeless by The Weeknd */}
            <audio
                ref={audioRef}
                autoPlay
                playsInline
                loop
                preload="auto"
                onLoadedMetadata={initializeAudioTime}
                onCanPlay={initializeAudioTime}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            >
                <source src="/audio/timeless.mp3" type="audio/mpeg" />
                Your browser does not support audio element.
            </audio>

            {/* Subtle dropdown prompt if browser blocked autoplay */}
            {showAutoplayPrompt && !isPlaying && (
                <div
                    className="nav-music-prompt-toast"
                    onClick={togglePlay}
                    title="Klik untuk memutar Timeless"
                >
                    <span className="nav-prompt-dot"></span>
                    <span className="nav-prompt-text">
                        🎵 Putar <strong>Timeless</strong>
                    </span>
                    <button
                        className="nav-prompt-close"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowAutoplayPrompt(false);
                        }}
                        aria-label="Tutup notifikasi"
                    >
                        ✕
                    </button>
                </div>
            )}

            {/* Spinning Mini Vinyl Disc */}
            <button
                type="button"
                className="nav-vinyl-btn"
                onClick={togglePlay}
                title={isPlaying ? "Jeda musik" : "Putar musik (Mulai detik 0:18)"}
                aria-label={isPlaying ? "Pause music" : "Play music"}
            >
                <div className={`nav-vinyl-disc ${isPlaying ? "spinning" : ""}`}>
                    <div className="nav-vinyl-groove"></div>
                    <div className="nav-vinyl-center">
                        <span className="nav-vinyl-dot"></span>
                    </div>
                </div>
            </button>

            {/* Track Info (Title & Artist) */}
            <div
                className="nav-track-info"
                onClick={togglePlay}
                title="Timeless - The Weeknd, Playboi Carti"
            >
                <div className="nav-track-title-row">
                    <span className="nav-track-title">Timeless</span>
                    {/* Animated Equalizer Waves */}
                    <div className={`nav-equalizer ${isPlaying ? "active" : ""}`}>
                        <span className="nav-eq-bar eq-1"></span>
                        <span className="nav-eq-bar eq-2"></span>
                        <span className="nav-eq-bar eq-3"></span>
                        <span className="nav-eq-bar eq-4"></span>
                    </div>
                </div>
                <span className="nav-track-artist">The Weeknd</span>
            </div>

            {/* Play / Pause Toggle Button */}
            <button
                type="button"
                className="nav-control-btn nav-play-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause music" : "Play music"}
                title={isPlaying ? "Pause" : "Play"}
            >
                {isPlaying ? (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                ) : (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                )}
            </button>

            {/* Volume Control Group (Mute + Interactive Slider) */}
            <div className="nav-volume-group" onClick={(e) => e.stopPropagation()}>
                <button
                    type="button"
                    className="nav-control-btn nav-mute-btn"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    title={isMuted ? "Unmute" : `Mute (${Math.round(volume * 100)}%)`}
                >
                    {isMuted || volume === 0 ? (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <line x1="23" y1="9" x2="17" y2="15" />
                            <line x1="17" y1="9" x2="23" y2="15" />
                        </svg>
                    ) : volume < 0.5 ? (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        </svg>
                    ) : (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                        </svg>
                    )}
                </button>

                <div
                    className="nav-wake-slider-container"
                    title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
                >
                    <WakeSlider
                        value={isMuted ? 0 : Math.round(volume * 100)}
                        onChange={handleVolumeChange}
                        bars={12}
                    />
                </div>
            </div>
        </div>
    );
}

export default MusicPlayer;
