import React, { useState, useEffect, useRef } from "react";
import "./MusicPlayer.css";

const START_OFFSET_SECONDS = 18;

function MusicPlayer() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [prevVolume, setPrevVolume] = useState(0.5);
    const [isExpanded, setIsExpanded] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);
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
                        setHasInteracted(true);
                        setShowAutoplayPrompt(false);
                    })
                    .catch(() => {
                        // If browser blocks unmuted audio on first load:
                        // 1. Immediately play muted so the track starts playing right away at 18s!
                        audio.muted = true;
                        setIsMuted(true);
                        audio.play()
                            .then(() => {
                                setIsPlaying(true);
                            })
                            .catch((e) => console.log(e));

                        // 2. Unmute on any subtle movement (mousemove, scroll, touch) without requiring a click!
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
                    setHasInteracted(true);
                    setShowAutoplayPrompt(false);
                })
                .catch((err) => {
                    console.warn("Playback error:", err);
                });
        }
    };

    // Handle Volume Change
    const handleVolumeChange = (e) => {
        e?.stopPropagation();
        const newVol = parseFloat(e.target.value);
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
            setPrevVolume(volume);
            audio.muted = true;
            setIsMuted(true);
            setVolume(0);
        }
    };

    return (
        <aside aria-label="Music Player" className="music-player-container">
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

            {/* Subtle Autoplay Prompt Toast (if browser blocked immediate unmuted play) */}
            {showAutoplayPrompt && !isPlaying && (
                <div
                    className="music-prompt-toast"
                    onClick={togglePlay}
                    title="Klik untuk memutar Timeless (Mulai detik 0:18)"
                >
                    <span className="toast-pulse-dot"></span>
                    <span className="toast-text">
                        🎵 Klik di mana saja untuk memutar <strong>Timeless - The Weeknd</strong>
                    </span>
                    <button
                        className="toast-close-btn"
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

            {/* Main Floating Widget */}
            <div
                className={`music-player-card ${isExpanded ? "expanded" : "collapsed"} ${isPlaying ? "is-playing" : ""}`}
                onClick={!isExpanded ? () => setIsExpanded(true) : undefined}
            >
                {/* Spinning Vinyl Disc */}
                <div
                    className="vinyl-wrapper"
                    onClick={togglePlay}
                    title={isPlaying ? "Jeda musik" : "Putar musik (Mulai detik 0:18)"}
                >
                    <div className={`vinyl-disc ${isPlaying ? "spinning" : ""}`}>
                        <div className="vinyl-groove"></div>
                        <div className="vinyl-groove groove-inner"></div>
                        <div className="vinyl-center">
                            <span className="vinyl-star">★</span>
                        </div>
                    </div>

                    {/* Overlay Play/Pause Icon on Hover */}
                    <div className="vinyl-play-overlay">
                        {isPlaying ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <rect x="6" y="4" width="4" height="16" rx="1" />
                                <rect x="14" y="4" width="4" height="16" rx="1" />
                            </svg>
                        ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                        )}
                    </div>
                </div>

                {/* Track Details & Visualizer (Visible in Expanded mode) */}
                {isExpanded && (
                    <div className="music-info-group">
                        <div className="track-meta">
                            <div className="track-title-row">
                                <span className="track-title">Timeless</span>
                                {/* Equalizer Waves */}
                                <div className={`equalizer-bars ${isPlaying ? "active" : ""}`}>
                                    <span className="bar bar-1"></span>
                                    <span className="bar bar-2"></span>
                                    <span className="bar bar-3"></span>
                                    <span className="bar bar-4"></span>
                                </div>
                            </div>
                            <span className="track-artist">The Weeknd, Playboi Carti</span>
                        </div>

                        {/* Interactive Controls Row */}
                        <div className="music-controls-row">
                            {/* Play / Pause Button */}
                            <button
                                type="button"
                                className="control-btn play-btn"
                                onClick={togglePlay}
                                aria-label={isPlaying ? "Pause music" : "Play music"}
                                title={isPlaying ? "Pause" : "Play"}
                            >
                                {isPlaying ? (
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                        <rect x="6" y="4" width="4" height="16" rx="1" />
                                        <rect x="14" y="4" width="4" height="16" rx="1" />
                                    </svg>
                                ) : (
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                        <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                )}
                            </button>

                            {/* Volume & Mute Section */}
                            <div className="volume-wrapper">
                                <button
                                    type="button"
                                    className="control-btn mute-btn"
                                    onClick={toggleMute}
                                    aria-label={isMuted ? "Unmute" : "Mute"}
                                    title={isMuted ? "Unmute" : "Mute"}
                                >
                                    {isMuted || volume === 0 ? (
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                            <line x1="23" y1="9" x2="17" y2="15" />
                                            <line x1="17" y1="9" x2="23" y2="15" />
                                        </svg>
                                    ) : volume < 0.5 ? (
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                        </svg>
                                    ) : (
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                        </svg>
                                    )}
                                </button>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.02"
                                    value={isMuted ? 0 : volume}
                                    onChange={handleVolumeChange}
                                    className="volume-slider"
                                    aria-label="Volume slider"
                                    title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
                                />
                            </div>

                            {/* Collapse Widget Button */}
                            <button
                                type="button"
                                className="control-btn minimize-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsExpanded(false);
                                }}
                                aria-label="Minimize player"
                                title="Kecilkan pemutar musik"
                            >
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="4 14 10 14 10 20" />
                                    <polyline points="20 10 14 10 14 4" />
                                    <line x1="14" y1="10" x2="21" y2="3" />
                                    <line x1="3" y1="21" x2="10" y2="14" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}

                {/* Collapsed Mode Expand Button */}
                {!isExpanded && (
                    <button
                        type="button"
                        className="collapsed-expand-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(true);
                        }}
                        aria-label="Expand player"
                        title="Buka pemutar musik"
                    >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 3 21 3 21 9" />
                            <polyline points="9 21 3 21 3 15" />
                            <line x1="21" y1="3" x2="14" y2="10" />
                            <line x1="3" y1="21" x2="10" y2="14" />
                        </svg>
                    </button>
                )}
            </div>
        </aside>
    );
}

export default MusicPlayer;
