"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef } from "react";

export const INFINITE_IMAGE_FIELD_IMAGES = [
  "https://plus.unsplash.com/premium_photo-1665311515452-a9f54c4266c9?w=400&h=560&fit=crop&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=560&fit=crop&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=560&fit=crop&q=80",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=560&fit=crop&q=80",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=560&fit=crop&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=560&fit=crop&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400&h=560&fit=crop&q=80",
  "https://images.unsplash.com/photo-1440342359743-84fcb8c21f21?w=400&h=560&fit=crop&q=80",
  "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=400&h=560&fit=crop&q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=560&fit=crop&q=80",
  "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=560&fit=crop&q=80",
  "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400&h=560&fit=crop&q=80",
];

function drawRoundedRect(ctx, x, y, w, h, r) {
  if (r <= 0) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    return;
  }
  const clampedR = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + clampedR, y);
  ctx.lineTo(x + w - clampedR, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + clampedR);
  ctx.lineTo(x + w, y + h - clampedR);
  ctx.quadraticCurveTo(x + w, y + h, x + w - clampedR, y + h);
  ctx.lineTo(x + clampedR, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - clampedR);
  ctx.lineTo(x, y + clampedR);
  ctx.quadraticCurveTo(x, y, x + clampedR, y);
  ctx.closePath();
}

// Generate pre-rendered card on offscreen canvas for extreme rendering performance
function createCardOffscreen(img, width, height, radius, dpr) {
  const offscreen = document.createElement("canvas");
  const cw = Math.max(1, Math.round(width * dpr));
  const ch = Math.max(1, Math.round(height * dpr));
  offscreen.width = cw;
  offscreen.height = ch;

  const octx = offscreen.getContext("2d");
  if (!octx) return null;

  octx.scale(dpr, dpr);

  // Clip to rounded shape
  drawRoundedRect(octx, 0, 0, width, height, radius);
  octx.clip();

  if (img && img.complete && img.naturalWidth > 0) {
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const boxAspect = width / height;
    let rw = width;
    let rh = height;
    let rx = 0;
    let ry = 0;

    if (imgAspect > boxAspect) {
      rw = height * imgAspect;
      rx = -(rw - width) / 2;
    } else {
      rh = width / imgAspect;
      ry = -(rh - height) / 2;
    }
    octx.drawImage(img, rx, ry, rw, rh);
  } else {
    // Elegant dark glass placeholder
    octx.fillStyle = "rgba(18, 24, 38, 0.75)";
    octx.fillRect(0, 0, width, height);
  }

  // Border overlay
  drawRoundedRect(octx, 0.5, 0.5, width - 1, height - 1, radius);
  octx.strokeStyle = "rgba(255, 255, 255, 0.14)";
  octx.lineWidth = 1;
  octx.stroke();

  return offscreen;
}

export function InfiniteImageField({
  className,
  images = INFINITE_IMAGE_FIELD_IMAGES,
  imageWidth = 200,
  imageHeight = 280,
  gap = 28,
  maxSpeed = 4,
  smoothing = 0.08,
  borderRadius = 12,
  onImageClick,
  style,
  ...rest
}) {
  const canvasRef = useRef(null);
  const cardCacheRef = useRef([]);
  const dimsRef = useRef({ w: 0, h: 0 });
  const camRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const isInsideRef = useRef(false);
  const rafRef = useRef(0);
  const isRunningRef = useRef(false);

  // Pre-load images & build offscreen cached cards
  useEffect(() => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const newCards = new Array(images.length);

    // Initial placeholder cards
    images.forEach((_, idx) => {
      newCards[idx] = createCardOffscreen(null, imageWidth, imageHeight, borderRadius, dpr);
    });
    cardCacheRef.current = newCards;

    // Load actual images asynchronously
    images.forEach((src, idx) => {
      const img = new Image();
      if (typeof src === "string" && (src.startsWith("http://") || src.startsWith("https://"))) {
        img.crossOrigin = "anonymous";
      }
      img.onload = () => {
        const rendered = createCardOffscreen(img, imageWidth, imageHeight, borderRadius, dpr);
        if (rendered && cardCacheRef.current) {
          cardCacheRef.current[idx] = rendered;
        }
      };
      img.src = src;
    });

    return () => {
      cardCacheRef.current = [];
    };
  }, [images, imageWidth, imageHeight, borderRadius]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      isRunningRef.current = false;
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      isRunningRef.current = false;
      return;
    }

    const { w: W, h: H } = dimsRef.current;
    if (W === 0 || H === 0) {
      isRunningRef.current = false;
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cellW = imageWidth + gap;
    const cellH = imageHeight + gap;
    const cards = cardCacheRef.current;
    const numCards = cards.length || images.length || 1;

    // Physics — cursor offset from center drives velocity
    const tx = isInsideRef.current
      ? (mouseRef.current.x - 0.5) * 2 * maxSpeed
      : 0;
    const ty = isInsideRef.current
      ? (mouseRef.current.y - 0.5) * 2 * maxSpeed
      : 0;

    velRef.current.x += (tx - velRef.current.x) * smoothing;
    velRef.current.y += (ty - velRef.current.y) * smoothing;

    camRef.current.x += velRef.current.x;
    camRef.current.y += velRef.current.y;

    const camX = camRef.current.x;
    const camY = camRef.current.y;

    ctx.clearRect(0, 0, W, H);

    // Compute visible cell range
    const colMin = Math.floor((camX - W / 2) / cellW) - 1;
    const colMax = Math.ceil((camX + W / 2) / cellW) + 1;
    const rowMin = Math.floor((camY - H / 2) / cellH) - 1;
    const rowMax = Math.ceil((camY + H / 2) / cellH) + 1;

    for (let row = rowMin; row <= rowMax; row++) {
      for (let col = colMin; col <= colMax; col++) {
        const sx = col * cellW - camX + W / 2 - imageWidth / 2;
        const sy = row * cellH - camY + H / 2 - imageHeight / 2;

        // Frustum culling
        if (sx + imageWidth < -10 || sx > W + 10 || sy + imageHeight < -10 || sy > H + 10) {
          continue;
        }

        // Deterministic image assignment
        const cardIdx =
          Math.abs(col * 7 + row * 13 + ((col * row * 3) | 0)) % numCards;
        const card = cards[cardIdx];

        if (card) {
          ctx.drawImage(card, sx, sy, imageWidth, imageHeight);
        }
      }
    }

    rafRef.current = requestAnimationFrame(draw);
  }, [imageWidth, imageHeight, gap, maxSpeed, smoothing, images.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const startLoop = () => {
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);

      if (w > 0 && h > 0) {
        dimsRef.current = { w, h };
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        startLoop();
      }
    };

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Mouse handlers
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        mouseRef.current = {
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        };
      }
      startLoop();
    };

    const onEnter = () => {
      isInsideRef.current = true;
      startLoop();
    };
    const onLeave = () => {
      isInsideRef.current = false;
    };

    // Touch handlers for mobile devices
    const onTouchMove = (e) => {
      if (!e.touches || !e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        mouseRef.current = {
          x: (e.touches[0].clientX - rect.left) / rect.width,
          y: (e.touches[0].clientY - rect.top) / rect.height,
        };
      }
      startLoop();
    };

    const onTouchStart = (e) => {
      isInsideRef.current = true;
      if (e.touches && e.touches[0]) {
        const rect = canvas.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          mouseRef.current = {
            x: (e.touches[0].clientX - rect.left) / rect.width,
            y: (e.touches[0].clientY - rect.top) / rect.height,
          };
        }
      }
      startLoop();
    };

    const onTouchEnd = () => {
      isInsideRef.current = false;
    };

    // Click handler to select image
    const handleClick = (e) => {
      if (!onImageClick) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const { w: W, h: H } = dimsRef.current;
      if (W === 0 || H === 0) return;

      const cellW = imageWidth + gap;
      const cellH = imageHeight + gap;
      const numCards = images.length;
      if (!numCards) return;

      const camX = camRef.current.x;
      const camY = camRef.current.y;

      const colMin = Math.floor((camX - W / 2) / cellW) - 1;
      const colMax = Math.ceil((camX + W / 2) / cellW) + 1;
      const rowMin = Math.floor((camY - H / 2) / cellH) - 1;
      const rowMax = Math.ceil((camY + H / 2) / cellH) + 1;

      for (let row = rowMin; row <= rowMax; row++) {
        for (let col = colMin; col <= colMax; col++) {
          const sx = col * cellW - camX + W / 2 - imageWidth / 2;
          const sy = row * cellH - camY + H / 2 - imageHeight / 2;
          if (
            clickX >= sx &&
            clickX <= sx + imageWidth &&
            clickY >= sy &&
            clickY <= sy + imageHeight
          ) {
            const imgIdx =
              Math.abs(col * 7 + row * 13 + ((col * row * 3) | 0)) % numCards;
            onImageClick(images[imgIdx], imgIdx);
            return;
          }
        }
      }
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseenter", onEnter);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("click", handleClick);

    canvas.addEventListener("touchstart", onTouchStart, { passive: true });
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd);

    // Initial loop start
    startLoop();

    return () => {
      isRunningRef.current = false;
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseenter", onEnter);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [draw, onImageClick, imageWidth, imageHeight, gap, images]);

  return (
    <div
      {...rest}
      className={cn("infinite-image-field-root", className)}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        cursor: "crosshair",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          background: "transparent",
          touchAction: "none",
        }}
      />
    </div>
  );
}

export default InfiniteImageField;
