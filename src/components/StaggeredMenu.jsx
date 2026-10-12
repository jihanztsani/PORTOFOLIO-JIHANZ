import React, { useState, useRef, useEffect, useCallback } from 'react';
import { frame, useMotionValue, useSpring, useVelocity } from "motion/react";
import { useTheme } from '../contexts/ThemeContext';
import './StaggeredMenu.css';

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

    // Track user intention: if the user explicitly clicked Pause, do not auto-resume on mouse move!
    const userManuallyPaused = useRef(false);

    // Set initial start time at 18 seconds
    const initializeAudioTime = () => {
        const audio = audioRef.current;
        if (audio && audio.currentTime < START_OFFSET_SECONDS) {
            try {
                audio.currentTime = START_OFFSET_SECONDS;
            } catch {
                // Ignore if metadata is not yet ready
            }
        }
    };

    // Keep state in sync with native HTML5 audio events
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handlePlayEvent = () => {
            setIsPlaying(true);
            window.dispatchEvent(new CustomEvent("portfolio-music-change", { detail: { isPlaying: true } }));
        };
        const handlePauseEvent = () => {
            setIsPlaying(false);
            window.dispatchEvent(new CustomEvent("portfolio-music-change", { detail: { isPlaying: false } }));
        };

        audio.addEventListener("play", handlePlayEvent);
        audio.addEventListener("pause", handlePauseEvent);

        // Check initial state
        if (!audio.paused && audio.currentTime > 0) {
            setIsPlaying(true);
        }

        return () => {
            audio.removeEventListener("play", handlePlayEvent);
            audio.removeEventListener("pause", handlePauseEvent);
        };
    }, []);

    // Initial load autoplay handling - starts playing immediately on page open
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = volume;
        initializeAudioTime();

        const instantUnmute = () => {
            if (userManuallyPaused.current) return;
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
            if (userManuallyPaused.current) return;
            initializeAudioTime();
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
                        if (userManuallyPaused.current) return;
                        audio.muted = true;
                        setIsMuted(true);
                        audio.play()
                            .then(() => {
                                setIsPlaying(true);
                            })
                            .catch((e) => console.log(e));

                        const events = ["mousemove", "pointermove", "scroll", "wheel", "touchstart", "pointerdown", "keydown"];
                        events.forEach((evt) => {
                            window.addEventListener(evt, instantUnmute, { once: true, passive: true });
                        });
                    });
            }
        };

        attemptPlay();

        const handleExplicitPlay = () => {
            if (userManuallyPaused.current) return;
            instantUnmute();
            attemptPlay();
        };
        window.addEventListener("play-portfolio-audio", handleExplicitPlay);

        return () => {
            cleanupUnmuteListeners();
            window.removeEventListener("play-portfolio-audio", handleExplicitPlay);
        };
    }, []);

    // Rock-solid Play / Pause toggle
    const togglePlay = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        const audio = audioRef.current;
        if (!audio) return;

        // If currently playing, pause it!
        if (!audio.paused) {
            userManuallyPaused.current = true;
            audio.pause();
            setIsPlaying(false);
            window.dispatchEvent(new CustomEvent("portfolio-music-change", { detail: { isPlaying: false } }));
        } else {
            // If currently paused, play it!
            userManuallyPaused.current = false;
            initializeAudioTime();
            audio.muted = false;
            setIsMuted(false);
            audio.play()
                .then(() => {
                    setIsPlaying(true);
                    setShowAutoplayPrompt(false);
                    window.dispatchEvent(new CustomEvent("portfolio-music-change", { detail: { isPlaying: true } }));
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
        e?.preventDefault();
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
                title={isPlaying ? "Jeda musik" : "Putar musik"}
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
                title={isPlaying ? "Jeda: Timeless" : "Putar: Timeless"}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') togglePlay(e); }}
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

            {/* Prominent Play / Pause Toggle Button */}
            <button
                type="button"
                className="nav-control-btn nav-play-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
                title={isPlaying ? "Jeda musik (Pause)" : "Putar musik (Play)"}
            >
                {isPlaying ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" rx="1.5" />
                        <rect x="14" y="4" width="4" height="16" rx="1.5" />
                    </svg>
                ) : (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: "2px" }}>
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

function StaggeredMenu({
  position = 'right',
  items = [],
  socialItems = [],
  displaySocials = false,
  displayItemNumbering = false,
  colors,
  logoText = '',
  accentColor,
  className,
  footerContent,
  onLogoClick,
  onItemClick,
}) {
  const [activePanel, setActivePanel] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const sidebarRef   = useRef(null);
  const panelRef     = useRef(null);
  const preLayersRef = useRef(null);

  const open = activePanel === 'menu';
  const toggle = useCallback((panel) => {
    setActivePanel(prev => prev === panel ? null : panel);
  }, []);
  const closeAll = useCallback(() => setActivePanel(null), []);

  // Clear any residual brightness filter
  useEffect(() => {
    document.documentElement.style.filter = '';
    try { localStorage.removeItem('portfolio-brightness'); } catch {}
  }, []);

  // Listen to music state changes
  useEffect(() => {
    const onMusicChange = (e) => {
      setIsMusicPlaying(Boolean(e.detail?.isPlaying));
    };
    window.addEventListener('portfolio-music-change', onMusicChange);
    return () => window.removeEventListener('portfolio-music-change', onMusicChange);
  }, []);

  // Handle outside clicks: do NOT close when clicking inside any popup!
  useEffect(() => {
    if (!activePanel) return;
    const onDown = (e) => {
      if (sidebarRef.current && sidebarRef.current.contains(e.target)) return;
      if (panelRef.current   && panelRef.current.contains(e.target)) return;
      if (e.target.closest && e.target.closest('.sm-popup')) return;
      closeAll();
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [activePanel, closeAll]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeAll(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeAll]);

  const handleLogoSelect = useCallback((e) => {
    e.preventDefault(); closeAll(); onLogoClick?.(e);
  }, [onLogoClick, closeAll]);

  const handleItemSelect = useCallback((e, item) => {
    e.preventDefault(); closeAll(); onItemClick?.(e, item);
  }, [onItemClick, closeAll]);

  return (
    <div
      className={(className ? className + ' ' : '') + 'staggered-menu-floating'}
      style={accentColor ? { ['--sm-accent']: accentColor } : undefined}
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {(() => {
          const raw = colors && colors.length ? colors.slice(0, 4) : ['#0a192f', '#1e40af', '#3b82f6'];
          let arr = [...raw];
          if (arr.length >= 3) arr.splice(Math.floor(arr.length / 2), 1);
          return arr.map((c, i) => (
            <div key={i} className="sm-prelayer" style={{ background: c }} />
          ));
        })()}
      </div>

      {/* Floating vertical pill sidebar */}
      <nav ref={sidebarRef} className="sm-fab-sidebar" aria-label="Quick controls">

        {/* 1. Menu Drawer Button */}
        <button
          id="sm-fab-menu"
          type="button"
          className={`sm-fab-btn${activePanel === 'menu' ? ' sm-fab-btn--active' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => toggle('menu')}
          title="Menu"
        >
          <span className="sm-fab-icon" aria-hidden="true">
            <span className={`sm-fab-hamburger${open ? ' sm-fab-hamburger--open' : ''}`}>
              <span /><span /><span />
            </span>
          </span>
          <span className="sm-fab-label">Menu</span>
        </button>

        <span className="sm-fab-divider" aria-hidden="true" />

        {/* 2. Music Player Popup Button */}
        <button
          id="sm-fab-music"
          type="button"
          className={`sm-fab-btn${activePanel === 'music' ? ' sm-fab-btn--active' : ''}${isMusicPlaying ? ' sm-fab-btn--playing' : ''}`}
          aria-label="Music player"
          aria-expanded={activePanel === 'music'}
          onClick={() => toggle('music')}
          title={isMusicPlaying ? "Musik (Sedang diputar)" : "Musik"}
        >
          <span className="sm-fab-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isMusicPlaying ? 'sm-vinyl-icon--spin' : ''}>
              <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>
            </svg>
            {isMusicPlaying && <span className="sm-music-live-indicator" aria-hidden="true" />}
          </span>
          <span className="sm-fab-label">Musik</span>
        </button>

        <span className="sm-fab-divider" aria-hidden="true" />

        {/* 3. Dark Mode / Light Mode Toggle Button */}
        <button
          id="sm-fab-theme"
          type="button"
          className={`sm-fab-btn sm-fab-btn--theme sm-fab-btn--theme-${theme}`}
          aria-label={theme === 'dark' ? 'Ganti ke Light Mode' : 'Ganti ke Dark Mode'}
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Ganti ke Light Mode' : 'Ganti ke Dark Mode'}
        >
          <span className="sm-fab-icon sm-theme-icon-wrap" aria-hidden="true">
            {theme === 'dark' ? (
              /* Moon Icon for Dark Mode */
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm-theme-svg sm-theme-moon">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            ) : (
              /* Sun Icon for Light Mode */
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sm-theme-svg sm-theme-sun">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            )}
          </span>
          <span className="sm-fab-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>

      </nav>

      {/* Music Popup Panel */}
      <div
        className={`sm-popup sm-popup--music${activePanel === 'music' ? ' sm-popup--open' : ''}`}
        role="dialog"
        aria-label="Music player"
        aria-hidden={activePanel !== 'music'}
      >
        <div className="sm-popup-header">
          <span className="sm-popup-title">🎵 Putar Musik</span>
          <button className="sm-popup-close" onClick={closeAll} aria-label="Tutup">✕</button>
        </div>
        <div className="sm-popup-body">
          <MusicPlayer />
        </div>
      </div>

      {/* Menu Drawer */}
      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="staggered-menu-panel"
        aria-hidden={!open}
      >
        <div className="sm-panel-inner">
          <div className="sm-panel-brand">
            <a href="/" className="sm-brand-link" onClick={handleLogoSelect} aria-label="Logo Jihanz">
              <span className="sm-brand-title">{logoText}</span>
              <span className="sm-brand-sub">PORTFOLIO</span>
            </a>
          </div>
          <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
            {items && items.length ? (
              items.map((it, idx) => (
                <li className="sm-panel-itemWrap" key={it.label + idx}>
                  <a
                    className={`sm-panel-item${it.active ? ' active' : ''}`}
                    href={it.link}
                    aria-label={it.ariaLabel}
                    data-index={idx + 1}
                    onClick={e => handleItemSelect(e, it)}
                  >
                    <span className="sm-panel-itemLabel">{it.label}</span>
                  </a>
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item"><span className="sm-panel-itemLabel">No items</span></span>
              </li>
            )}
          </ul>
          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title">SOSIAL &amp; KONTAK</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i} className="sm-socials-item">
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {footerContent && <div className="sm-panel-footer">{footerContent}</div>}
        </div>
      </aside>
    </div>
  );
}

export default StaggeredMenu;
