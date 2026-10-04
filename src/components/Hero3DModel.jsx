/* eslint-disable react/no-unknown-property */
import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Environment, Html } from "@react-three/drei";
import modelUrl from "../assets/3dmodeljihanz.glb";
import "./Hero3DModel.css";

/**
 * ModelMesh:
 *  - Auto-spins on Y when not dragging.
 *  - Click + drag X  → rotates Y axis.
 *  - Click + drag Y  → tilts X axis (clamped).
 *  - Smooth exp-decay lerp on everything — no jumps.
 *  - Single useFrame, no Float, no OrbitControls.
 */
function ModelMesh({ dragRef, isDraggingRef }) {
    const { scene }        = useGLTF(modelUrl);
    const groupRef         = useRef();
    const spinClockRef     = useRef(0);   // auto-spin accumulator
    const floatClockRef    = useRef(0);   // float accumulator
    const currentRotY      = useRef(0);   // damped Y
    const currentRotX      = useRef(0);   // damped X

    useFrame((_, delta) => {
        if (!groupRef.current) return;

        const d = Math.min(delta, 0.05);

        // Auto-spin: pauses during drag so cursor feels fully in control
        if (!isDraggingRef.current) {
            spinClockRef.current += d * 0.65;
        }

        // Target = auto-spin + drag offset
        const targetY = spinClockRef.current + dragRef.current.x;
        const targetX = dragRef.current.y;

        // Smooth damp (exp-decay ~100ms)
        const lerpFactor = 1 - Math.exp(-d * 10);
        currentRotY.current += (targetY - currentRotY.current) * lerpFactor;
        currentRotX.current += (targetX - currentRotX.current) * lerpFactor;

        groupRef.current.rotation.y = currentRotY.current;
        groupRef.current.rotation.x = currentRotX.current;

        // Gentle float only when not dragging
        if (!isDraggingRef.current) {
            floatClockRef.current += d;
            groupRef.current.position.y = Math.sin(floatClockRef.current * 1.1) * 0.045;
        }
    });

    return (
        <group ref={groupRef}>
            <Center>
                <primitive object={scene} />
            </Center>
        </group>
    );
}

function Loader() {
    return (
        <Html center>
            <div className="hero-3d-loading">
                <div className="hero-3d-spinner"></div>
                <span className="hero-3d-loading-text">Loading 3D Model...</span>
            </div>
        </Html>
    );
}

export default function Hero3DModel() {
    // dragRef: accumulated drag offsets (x = Y-axis rotation, y = X-axis tilt)
    const dragRef        = useRef({ x: 0, y: 0 });
    const isDraggingRef  = useRef(false);
    const lastPosRef     = useRef({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false); // only for CSS cursor

    // Global move + up so drag works even outside the canvas
    useEffect(() => {
        const onMove = (e) => {
            if (!isDraggingRef.current) return;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            const dx = clientX - lastPosRef.current.x;
            const dy = clientY - lastPosRef.current.y;
            lastPosRef.current = { x: clientX, y: clientY };

            // Sensitivity: 0.012 rad per pixel
            dragRef.current.x += dx * 0.012;
            // Clamp vertical tilt to ±70°
            dragRef.current.y = Math.max(
                -1.2,
                Math.min(1.2, dragRef.current.y + dy * 0.012)
            );
        };

        const onUp = () => {
            isDraggingRef.current = false;
            setIsDragging(false);
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
        window.addEventListener("touchmove", onMove, { passive: true });
        window.addEventListener("touchend", onUp);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
            window.removeEventListener("touchmove", onMove);
            window.removeEventListener("touchend", onUp);
        };
    }, []);

    const onPointerDown = (e) => {
        isDraggingRef.current = true;
        setIsDragging(true);
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        lastPosRef.current = { x: clientX, y: clientY };
    };

    return (
        <div
            className={`hero-3d-container${isDragging ? " is-dragging" : ""}`}
            onMouseDown={onPointerDown}
            onTouchStart={onPointerDown}
        >
            <Canvas
                camera={{ position: [0, 0.1, 1.8], fov: 42 }}
                style={{ width: "100%", height: "100%" }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <ambientLight intensity={1.6} />
                <directionalLight position={[4, 8, 6]} intensity={2.2} />
                <directionalLight position={[-4, 4, -4]} intensity={1.2} color="#93c5fd" />
                <pointLight position={[0, -1, 2]} intensity={0.9} color="#3b82f6" />
                <Environment preset="city" />

                <Suspense fallback={<Loader />}>
                    <ModelMesh dragRef={dragRef} isDraggingRef={isDraggingRef} />
                </Suspense>
            </Canvas>

            <div className="hero-3d-glow-base"></div>

            {/* Hint: fades out once user has dragged at least once */}
            <div className="hero-3d-drag-hint">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0m-2 6V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/>
                    <path d="M6 14v4a6 6 0 0 0 12 0v-2"/>
                </svg>
                <span>DRAG TO ROTATE</span>
            </div>
        </div>
    );
}

useGLTF.preload(modelUrl);
