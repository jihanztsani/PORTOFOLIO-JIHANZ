/* eslint-disable react/no-unknown-property */
import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations, Center, OrbitControls, Html } from "@react-three/drei";
import animationModelUrl from "../assets/projek animasi 1 jihanz.glb";
import {
    BLENDER_PYTHON_SCRIPT,
    THREEJS_CONTROLLER_SCRIPT,
    GLTF_METADATA_SPECS
} from "../data/animationScripts";
import "./AnimationViewer3D.css";

const SCRIPT_SNIPPETS = {
    blender: BLENDER_PYTHON_SCRIPT,
    three: THREEJS_CONTROLLER_SCRIPT,
    gltf: GLTF_METADATA_SPECS,
};

function AnimatedScene({ isPlaying, speed }) {
    const { scene, animations } = useGLTF(animationModelUrl);
    const { actions, names } = useAnimations(animations, scene);

    // Start playing all available animation clips
    useEffect(() => {
        if (actions && names.length > 0) {
            names.forEach((name) => {
                const action = actions[name];
                if (action) {
                    action.reset().fadeIn(0.4).play();
                }
            });
        }
    }, [actions, names]);

    // Handle play/pause and playback speed dynamically
    useEffect(() => {
        if (actions && names.length > 0) {
            names.forEach((name) => {
                const action = actions[name];
                if (action) {
                    action.paused = !isPlaying;
                    action.setEffectiveTimeScale(speed);
                }
            });
        }
    }, [isPlaying, speed, actions, names]);

    return (
        <Center top={false}>
            <primitive object={scene} />
        </Center>
    );
}

function Loader() {
    return (
        <Html center>
            <div className="animation-viewer-loading">
                <div className="viewer-spinner"></div>
                <span>Memuat Aset 3D & Animasi...</span>
            </div>
        </Html>
    );
}

export default function AnimationViewer3D({ initialShowScript = false }) {
    const containerRef = useRef(null);
    const controlsRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(true);
    const [speed, setSpeed] = useState(1);
    const [autoRotate, setAutoRotate] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Script viewer state (Default tab = "blender" script)
    const [showScript, setShowScript] = useState(initialShowScript);
    const [activeScriptTab, setActiveScriptTab] = useState("blender");
    const [copied, setCopied] = useState(false);

    // If parent requests script to show, update state
    useEffect(() => {
        if (initialShowScript) {
            setShowScript(true);
        }
    }, [initialShowScript]);

    // Handle reset camera position back to full-scene overview
    const handleResetCamera = () => {
        if (controlsRef.current) {
            controlsRef.current.reset();
        }
    };

    // Handle speed cycle: 1x -> 1.5x -> 0.5x -> 1x
    const handleToggleSpeed = () => {
        setSpeed((prev) => {
            if (prev === 1) return 1.5;
            if (prev === 1.5) return 0.5;
            return 1;
        });
    };

    // Toggle fullscreen on container
    const handleToggleFullscreen = () => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().then(() => {
                setIsFullscreen(true);
            }).catch(() => {});
        } else {
            document.exitFullscreen().then(() => {
                setIsFullscreen(false);
            }).catch(() => {});
        }
    };

    // Copy script code
    const handleCopyScript = () => {
        const textToCopy = SCRIPT_SNIPPETS[activeScriptTab] || "";
        if (navigator.clipboard) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }).catch(() => {});
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    return (
        <div ref={containerRef} className="animation-viewer-container">
            {/* Top Toolbar */}
            <div className="animation-viewer-header">
                <div className="viewer-status">
                    <span className={`viewer-status-dot ${isPlaying ? "" : "paused"}`}></span>
                    <span>
                        {isPlaying ? "Animasi 3D Aktif (BodyAction.017)" : "Animasi Dijeda (Paused)"}
                    </span>
                </div>

                <div className="viewer-controls-group">
                    {/* View Script Toggle */}
                    <button
                        type="button"
                        onClick={() => setShowScript((prev) => !prev)}
                        className={`viewer-btn highlight ${showScript ? "active" : ""}`}
                        title="Lihat Script & Kode Animasi"
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <polyline points="16 18 22 12 16 6" />
                            <polyline points="8 6 2 12 8 18" />
                        </svg>
                        <span>{showScript ? "Tutup Script" : "Lihat Script Animasi"}</span>
                    </button>

                    {/* Play / Pause Toggle */}
                    <button
                        type="button"
                        onClick={() => setIsPlaying((prev) => !prev)}
                        className={`viewer-btn ${isPlaying ? "" : "active"}`}
                        title={isPlaying ? "Jeda Animasi" : "Jalankan Animasi"}
                    >
                        {isPlaying ? (
                            <>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                    <rect x="6" y="4" width="4" height="16" />
                                    <rect x="14" y="4" width="4" height="16" />
                                </svg>
                                <span>Pause</span>
                            </>
                        ) : (
                            <>
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                                <span>Play</span>
                            </>
                        )}
                    </button>

                    {/* Speed Toggle */}
                    <button
                        type="button"
                        onClick={handleToggleSpeed}
                        className="viewer-btn"
                        title="Ubah Kecepatan Animasi"
                    >
                        <span>{speed}x Kecepatan</span>
                    </button>

                    {/* Auto Rotate Toggle */}
                    <button
                        type="button"
                        onClick={() => setAutoRotate((prev) => !prev)}
                        className={`viewer-btn ${autoRotate ? "active" : ""}`}
                        title="Putar Kamera Otomatis"
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                        </svg>
                        <span>{autoRotate ? "Auto-Rotate ON" : "Auto-Rotate"}</span>
                    </button>

                    {/* Reset Camera */}
                    <button
                        type="button"
                        onClick={handleResetCamera}
                        className="viewer-btn"
                        title="Kembalikan Sudut Pandang Keseluruhan Objek"
                    >
                        <span>Reset View</span>
                    </button>

                    {/* Fullscreen */}
                    <button
                        type="button"
                        onClick={handleToggleFullscreen}
                        className="viewer-btn"
                        title={isFullscreen ? "Keluar Layar Penuh" : "Layar Penuh"}
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                            {isFullscreen ? (
                                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                            ) : (
                                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                            )}
                        </svg>
                        <span>{isFullscreen ? "Exit" : "Fullscreen"}</span>
                    </button>
                </div>
            </div>

            {/* Interactive 3D Canvas */}
            <div className="animation-canvas-wrapper">
                <Canvas
                    camera={{ position: [80, 60, 95], fov: 42, near: 0.5, far: 2000 }}
                    gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
                >
                    <ambientLight intensity={1.4} />
                    <directionalLight position={[60, 90, 60]} intensity={1.8} />
                    <directionalLight position={[-60, 60, -60]} intensity={1.0} />
                    <hemisphereLight skyColor="#93c5fd" groundColor="#334155" intensity={0.9} />

                    <Suspense fallback={<Loader />}>
                        <AnimatedScene isPlaying={isPlaying} speed={speed} />
                    </Suspense>

                    <OrbitControls
                        ref={controlsRef}
                        autoRotate={autoRotate}
                        autoRotateSpeed={1.0}
                        enableDamping
                        dampingFactor={0.08}
                        minDistance={5}
                        maxDistance={350}
                        maxPolarAngle={Math.PI / 2 + 0.08}
                    />
                </Canvas>
            </div>

            {/* Collapsible Animation Script Drawer */}
            {showScript && (
                <div className="animation-script-drawer">
                    <div className="script-drawer-header">
                        <div className="script-tabs">
                            <button
                                type="button"
                                onClick={() => setActiveScriptTab("blender")}
                                className={`script-tab-btn ${activeScriptTab === "blender" ? "active" : ""}`}
                            >
                                <span className="tab-lang-badge">PY</span>
                                <span>Blender Python Script</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveScriptTab("three")}
                                className={`script-tab-btn ${activeScriptTab === "three" ? "active" : ""}`}
                            >
                                <span className="tab-lang-badge">JS</span>
                                <span>Three.js Web Controller</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveScriptTab("gltf")}
                                className={`script-tab-btn ${activeScriptTab === "gltf" ? "active" : ""}`}
                            >
                                <span className="tab-lang-badge">JSON</span>
                                <span>Spesifikasi Keyframe</span>
                            </button>
                        </div>

                        <div className="script-actions">
                            <button
                                type="button"
                                onClick={handleCopyScript}
                                className="script-copy-btn"
                                title="Salin Kode Script"
                            >
                                {copied ? (
                                    <>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        <span>Tersalin!</span>
                                    </>
                                ) : (
                                    <>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                        </svg>
                                        <span>Salin Script</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <pre className="script-code-block">
                        <code>{SCRIPT_SNIPPETS[activeScriptTab]}</code>
                    </pre>
                </div>
            )}

            {/* Footer Interaction Guide */}
            <div className="animation-viewer-footer">
                <div className="viewer-hint">
                    <span>🖱️ Drag Kiri: Putar Sudut</span>
                    <span>•</span>
                    <span>Scroll: Zoom In/Out</span>
                    <span>•</span>
                    <span>Drag Kanan: Geser (Pan)</span>
                </div>
                <div className="viewer-meta-badge">
                    <span>WebGL • Three.js • Blender Animation</span>
                </div>
            </div>
        </div>
    );
}

// Preload the GLB model asset
useGLTF.preload(animationModelUrl);
