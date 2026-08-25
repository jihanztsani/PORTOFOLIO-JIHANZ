import React from "react";

// Stiker Smiley Kuning dengan Efek Sudut Terkelupas (Peeling Corner)
export function SmileySticker({ className = "", size = 64, style = {}, onClick }) {
    return (
        <div
            className={`sticker-wrapper sticker-peel-container ${className}`}
            style={{ width: size, height: size, ...style }}
            onClick={onClick}
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sticker-svg"
            >
                <defs>
                    <filter id="sticker-shadow" x="-20%" y="-20%" width="150%" height="150%">
                        <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.45" />
                    </filter>
                    <filter id="peel-shadow" x="-30%" y="-30%" width="160%" height="160%">
                        <feDropShadow dx="-2" dy="-2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.5" />
                    </filter>
                    <radialGradient id="smiley-grad" cx="40%" cy="35%" r="60%">
                        <stop offset="0%" stopColor="#ffdb3a" />
                        <stop offset="70%" stopColor="#e5a912" />
                        <stop offset="100%" stopColor="#c48a07" />
                    </radialGradient>
                    <linearGradient id="peel-back-grad" x1="100%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#d5d5d5" />
                        <stop offset="50%" stopColor="#f5f5f5" />
                        <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                </defs>

                {/* Main Yellow Circle Body with sticker border */}
                <g filter="url(#sticker-shadow)">
                    {/* White sticker border contour */}
                    <circle cx="50" cy="50" r="48" fill="#ffffff" />
                    {/* Yellow Main Face */}
                    <circle cx="50" cy="50" r="45" fill="url(#smiley-grad)" />

                    {/* Eyes */}
                    <ellipse cx="36" cy="40" rx="4.5" ry="6.5" fill="#181818" />
                    <ellipse cx="64" cy="40" rx="4.5" ry="6.5" fill="#181818" />

                    {/* Smile Curve */}
                    <path
                        d="M 28 55 Q 50 82 72 55"
                        stroke="#181818"
                        strokeWidth="5.5"
                        strokeLinecap="round"
                        fill="none"
                    />

                    {/* Dimples / subtle smile ends */}
                    <path d="M 25 53 L 28 58" stroke="#181818" strokeWidth="3.5" strokeLinecap="round" />
                    <path d="M 75 53 L 72 58" stroke="#181818" strokeWidth="3.5" strokeLinecap="round" />
                </g>

                {/* Peeling folded corner at bottom-right */}
                <g filter="url(#peel-shadow)">
                    {/* Folded back triangle/flap */}
                    <path
                        d="M 70 95.4 C 78 85 85 78 95.4 70 L 68 68 Z"
                        fill="url(#peel-back-grad)"
                        stroke="#e0e0e0"
                        strokeWidth="1"
                    />
                </g>
            </svg>
        </div>
    );
}

// Stiker Tangan Peace Sign Merah (✌️)
export function PeaceSticker({ className = "", size = 56, style = {}, onClick }) {
    return (
        <div
            className={`sticker-wrapper sticker-peace ${className}`}
            style={{ width: size, height: size, ...style }}
            onClick={onClick}
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sticker-svg"
            >
                <defs>
                    <filter id="peace-shadow" x="-20%" y="-20%" width="150%" height="150%">
                        <feDropShadow dx="2" dy="4" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.5" />
                    </filter>
                </defs>
                <g filter="url(#peace-shadow)">
                    {/* Bold White Sticker Outline */}
                    <path
                        d="M 45 10 C 40 10 37 15 37 22 L 37 42 C 34 38 31 30 25 30 C 19 30 17 36 18 43 L 22 60 C 25 78 37 90 55 90 C 72 90 84 78 84 60 L 84 45 C 84 39 79 35 73 35 C 70 35 67 37 65 40 L 65 22 C 65 15 62 10 57 10 C 52 10 49 14 49 20 L 49 32 L 45 32 Z"
                        fill="#ffffff"
                        stroke="#ffffff"
                        strokeWidth="8"
                        strokeLinejoin="round"
                    />

                    {/* Red Hand Base */}
                    <path
                        d="M 46 12 C 43 12 40 15 40 22 L 40 43 L 36 43 L 36 34 C 36 29 32 25 27 25 C 22 25 19 29 20 35 L 23 58 C 26 75 37 86 54 86 C 70 86 80 75 80 58 L 80 44 C 80 40 76 37 72 37 C 69 37 66 39 64 42 L 64 22 C 64 16 61 12 56 12 C 51 12 48 16 48 22 L 48 36 L 46 36 Z"
                        fill="#d32828"
                    />

                    {/* Hand & Finger Details */}
                    <path d="M 48 20 L 48 48" stroke="#8a1010" strokeWidth="2.5" strokeLinecap="round" />
                    <path
                        d="M 33 50 C 37 54 48 57 58 52"
                        stroke="#8a1010"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <path
                        d="M 64 46 C 64 52 62 58 58 60"
                        stroke="#8a1010"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <path
                        d="M 76 46 C 76 54 73 62 68 65"
                        stroke="#8a1010"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <path
                        d="M 36 67 C 44 75 56 75 66 70"
                        stroke="#8a1010"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        fill="none"
                    />
                </g>
            </svg>
        </div>
    );
}

// Label Harga Barcode Oranye "44.20"
export function PriceTagSticker({ className = "", style = {} }) {
    return (
        <div className={`sticker-wrapper price-tag-sticker ${className}`} style={style}>
            <div className="price-tag-inner">
                <div className="price-tag-top">
                    <span className="tag-micro-code">REF: 1024</span>
                    <span className="tag-brand">BASKARA</span>
                </div>
                <div className="price-tag-main">
                    <span className="price-val">44.20</span>
                </div>
                <div className="price-tag-barcode">
                    <div className="barcode-bars">
                        <span className="b-1"></span>
                        <span className="b-2"></span>
                        <span className="b-1"></span>
                        <span className="b-3"></span>
                        <span className="b-2"></span>
                        <span className="b-1"></span>
                        <span className="b-4"></span>
                        <span className="b-2"></span>
                        <span className="b-1"></span>
                        <span className="b-3"></span>
                        <span className="b-1"></span>
                        <span className="b-2"></span>
                        <span className="b-4"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Lakban Kertas Masking Tape
export function TapeStrip({
    text,
    variant = "white",
    textColor = "#111111",
    rotate = 0,
    className = "",
    style = {},
}) {
    return (
        <div
            className={`tape-strip tape-${variant} ${className}`}
            style={{
                transform: `rotate(${rotate}deg)`,
                ...style,
            }}
        >
            <div className="tape-texture"></div>
            <span className="tape-text" style={{ color: textColor }}>
                {text}
            </span>
        </div>
    );
}

// Selotip Bening Plastik (Scotch Tape)
export function ScotchTape({ width = 70, height = 24, rotate = -15, className = "", style = {} }) {
    return (
        <div
            className={`scotch-tape ${className}`}
            style={{
                width: `${width}px`,
                height: `${height}px`,
                transform: `rotate(${rotate}deg)`,
                ...style,
            }}
        >
            <div className="scotch-tape-reflection"></div>
        </div>
    );
}

// Siluet Grafis Biru Gaya Duotone Performer
export function BlueSilhouetteGraphic({ className = "", style = {} }) {
    return (
        <div className={`blue-silhouette-card ${className}`} style={style}>
            <ScotchTape width={70} height={20} rotate={-18} className="card-tape-top" />
            <div className="silhouette-image-wrapper">
                <svg
                    viewBox="0 0 280 340"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="silhouette-svg"
                >
                    <defs>
                        <linearGradient id="blueSilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4886f3" />
                            <stop offset="60%" stopColor="#2563eb" />
                            <stop offset="100%" stopColor="#1e40af" />
                        </linearGradient>
                    </defs>

                    {/* Blue Duotone Cutout Figure Silhouette with singer mic pose */}
                    <path
                        d="M 140 45 C 160 45 174 62 174 84 C 174 96 166 108 156 114 C 178 120 205 138 215 168 L 228 220 C 232 234 222 248 206 248 C 199 248 191 243 187 234 L 176 202 L 176 320 C 176 332 165 340 152 340 L 128 340 C 115 340 104 332 104 320 L 104 202 L 93 234 C 89 243 81 248 74 248 C 58 248 48 234 52 220 L 65 168 C 75 138 102 120 124 114 C 114 108 106 96 106 84 C 106 62 120 45 140 45 Z"
                        fill="url(#blueSilGrad)"
                    />

                    {/* Microphone in Hand */}
                    <path
                        d="M 180 128 L 198 112 C 202 108 208 110 210 115 L 214 126 C 216 131 213 136 208 138 L 190 146 Z"
                        fill="#93c5fd"
                    />
                    <ellipse cx="206" cy="118" rx="8" ry="11" fill="#bfdbfe" />

                    {/* Stylized jacket contours */}
                    <path d="M 125 80 Q 140 88 155 80" stroke="#bfdbfe" strokeWidth="4" fill="none" strokeLinecap="round" />
                    <path d="M 130 95 L 140 120 L 150 95" stroke="#1d4ed8" strokeWidth="3" fill="none" />
                    <path d="M 112 135 L 140 168 L 168 135" stroke="#1e3a8a" strokeWidth="5" fill="none" />
                </svg>
            </div>
        </div>
    );
}
