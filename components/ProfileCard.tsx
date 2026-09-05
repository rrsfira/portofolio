"use client";

import { useEffect, useState } from "react";
import { BadgeCheck, MapPin, Radio } from "lucide-react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { profile } from "@/lib/data";

export function ProfileCard() {
  const prefersReducedMotion = useReducedMotion();
  const [isLightTheme, setIsLightTheme] = useState(false);
  const driveFolderLink =
    "https://drive.google.com/drive/folders/1L4knkjeiS5fwBdf6vyirQtg0aolo9QWH?usp=sharing";
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(driveFolderLink)}`;

  useEffect(() => {
    const syncTheme = () => {
      setIsLightTheme(document.documentElement.dataset.theme === "light");
    };

    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  // =========================================================
  // POINTER / TILT
  // =========================================================

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  // =========================================================
  // DRAG
  // =========================================================
  // Hanya CARD yang menggunakan drag.
  // Lanyard tetap berada di posisi atas dan memanjang mengikuti
  // posisi connector/card.
  // =========================================================

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // =========================================================
  // CARD TILT
  // =========================================================

  const tiltX = useSpring(useTransform(pointerY, [-1, 1], [7, -7]), {
    stiffness: 180,
    damping: 24,
    mass: 0.55,
  });

  const tiltY = useSpring(useTransform(pointerX, [-1, 1], [-9, 9]), {
    stiffness: 180,
    damping: 24,
    mass: 0.55,
  });

  // =========================================================
  // CARD SHADOW
  // =========================================================

  const shadowX = useTransform(pointerX, [-1, 1], [14, -14]);

  const shadowY = useTransform(pointerY, [-1, 1], [24, 16]);

  // =========================================================
  // CARD HIGHLIGHT
  // =========================================================

  const highlightX = useTransform(pointerX, [-1, 1], [18, 82]);

  const highlightY = useTransform(pointerY, [-1, 1], [18, 78]);

  // =========================================================
  // IMAGE PARALLAX
  // =========================================================

  const imageX = useSpring(useTransform(pointerX, [-1, 1], [-5, 5]), {
    stiffness: 110,
    damping: 18,
  });

  const imageY = useSpring(useTransform(pointerY, [-1, 1], [-4, 4]), {
    stiffness: 110,
    damping: 18,
  });

  // =========================================================
  // CARD HIGHLIGHT
  // =========================================================

  const highlight = useMotionTemplate`
    radial-gradient(
      circle at ${highlightX}% ${highlightY}%,
      rgb(255 255 255 / 0.18),
      transparent 34%
    )
  `;

  // =========================================================
  // CARD SHADOW
  // =========================================================

  const cardShadow = useMotionTemplate`
    ${shadowX}px ${shadowY}px 60px rgb(0 0 0 / 0.58),
    0 0 45px rgb(var(--accent) / 0.16)
  `;

  const cardShellClass = isLightTheme
    ? "border-slate-200 bg-white/85 text-slate-900"
    : "border-white/14 bg-card/88 text-white";

  const cardHeaderClass = isLightTheme ? "text-slate-600" : "text-white/54";

  const imageWrapClass = isLightTheme
    ? "border-slate-200 bg-slate-200"
    : "border-white/10 bg-black";

  // Teks di atas foto harus mengikuti tema.
  // Pada light mode, teks gelap + panel putih membuat foto jauh
  // lebih bersih dan tidak terlihat seperti tertutup overlay hitam.
  const infoTextClass = isLightTheme ? "text-slate-700" : "text-white";

  const infoStrongClass = isLightTheme ? "text-slate-900" : "text-white";

  const qrFrameClass = isLightTheme
    ? "border-slate-300 bg-white/80"
    : "border-white/10 bg-white/5";

  const leftMidX = useTransform(dragX, (value) => 124 + value * 0.35);

  const leftCurveX = useTransform(dragX, (value) => 125 + value * 0.45);

  const leftCurve2X = useTransform(dragX, (value) => 127 + value * 0.7);

  const leftEndX = useTransform(dragX, (value) => 130 + value);

  const rightMidX = useTransform(dragX, (value) => 136 + value * 0.35);

  const rightCurveX = useTransform(dragX, (value) => 135 + value * 0.45);

  const rightCurve2X = useTransform(dragX, (value) => 133 + value * 0.7);

  const rightEndX = useTransform(dragX, (value) => 130 + value);

  const leftMidY = useTransform(dragY, (value) => 145 + value * 0.65);

  const leftCurveY = useTransform(dragY, (value) => 153 + value * 0.8);

  const leftCurve2Y = useTransform(dragY, (value) => 160 + value * 0.95);

  const leftEndY = useTransform(dragY, (value) => 166 + value);

  const rightMidY = useTransform(dragY, (value) => 145 + value * 0.65);

  const rightCurveY = useTransform(dragY, (value) => 153 + value * 0.8);

  const rightCurve2Y = useTransform(dragY, (value) => 160 + value * 0.95);

  const rightEndY = useTransform(dragY, (value) => 166 + value);

  // =========================================================
  // DYNAMIC SVG PATH
  // =========================================================

  const leftStrapPath = useMotionTemplate`
  M 114 -40
  C 114 35, 117 90, ${leftMidX} ${leftMidY}
  C ${leftCurveX} ${leftCurveY},
    ${leftCurve2X} ${leftCurve2Y},
    ${leftEndX} ${leftEndY}
`;

  const rightStrapPath = useMotionTemplate`
  M 146 -40
  C 146 35, 143 90, ${rightMidX} ${rightMidY}
  C ${rightCurveX} ${rightCurveY},
    ${rightCurve2X} ${rightCurve2Y},
    ${rightEndX} ${rightEndY}
`;

  // Highlight mengikuti path utama.

  const leftHighlightPath = useMotionTemplate`
  M 114 -40
  C 114 35, 117 90, ${leftMidX} ${leftMidY}
  C ${leftCurveX} ${leftCurveY},
    ${leftCurve2X} ${leftCurve2Y},
    ${leftEndX} ${leftEndY}
`;

  const rightHighlightPath = useMotionTemplate`
  M 146 -40
  C 146 35, 143 90, ${rightMidX} ${rightMidY}
  C ${rightCurveX} ${rightCurveY},
    ${rightCurve2X} ${rightCurve2Y},
    ${rightEndX} ${rightEndY}
`;

  // =========================================================
  // POINTER MOVE
  // =========================================================

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const normalizedX = ((event.clientX - rect.left) / rect.width) * 2 - 1;

    const normalizedY = ((event.clientY - rect.top) / rect.height) * 2 - 1;

    pointerX.set(Math.max(-1, Math.min(1, normalizedX)));

    pointerY.set(Math.max(-1, Math.min(1, normalizedY)));
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      className="
        relative
        mx-auto
        h-[390px]
        w-full
        max-w-[330px]
        touch-none
        sm:h-[620px]
      "
      data-cursor="card"
    >
      {/* =======================================================
          CENTERING WRAPPER
          ======================================================= */}

      <div
        className="
          absolute
          left-1/2
          top-0
          w-[min(260px,72vw)]
          -translate-x-1/2
        "
      >
        {/* =====================================================
            LANYARD
            =====================================================
            
            IMPORTANT:
            Lanyard TIDAK berada di dalam motion.div yang di-drag.

            Titik atas lanyard tetap.
            Path bagian bawah mengikuti dragX / dragY.
        ===================================================== */}

        <motion.svg
          viewBox="0 0 260 600"
          className="
  pointer-events-none
  absolute
  left-1/2
  top-0
  z-20
          hidden
          h-[600px]
  w-full
  -translate-x-1/2
  overflow-visible
          sm:block
"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="strap" x1="0" x2="1" y1="0" y2="0">
              <stop
                offset="0%"
                stopColor="rgb(var(--accent))"
                stopOpacity="0.72"
              />

              <stop offset="25%" stopColor="#ffffff" stopOpacity="0.32" />

              <stop
                offset="50%"
                stopColor="rgb(var(--accent))"
                stopOpacity="0.95"
              />

              <stop offset="75%" stopColor="#ffffff" stopOpacity="0.32" />

              <stop
                offset="100%"
                stopColor="rgb(var(--accent))"
                stopOpacity="0.72"
              />
            </linearGradient>

            {/* Strap glow */}
            <filter id="strapGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />

              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* =================================================
              LEFT STRAP
          ================================================= */}

          <motion.path
            d={leftStrapPath}
            fill="none"
            stroke="url(#strap)"
            strokeLinecap="round"
            strokeWidth="10"
            filter="url(#strapGlow)"
          />

          {/* =================================================
              RIGHT STRAP
          ================================================= */}

          <motion.path
            d={rightStrapPath}
            fill="none"
            stroke="url(#strap)"
            strokeLinecap="round"
            strokeWidth="10"
            filter="url(#strapGlow)"
          />

          {/* =================================================
              LEFT STRAP HIGHLIGHT
          ================================================= */}

          <motion.path
            d={leftHighlightPath}
            fill="none"
            stroke="rgb(255 255 255 / 0.28)"
            strokeLinecap="round"
            strokeWidth="2"
          />

          {/* =================================================
              RIGHT STRAP HIGHLIGHT
          ================================================= */}

          <motion.path
            d={rightHighlightPath}
            fill="none"
            stroke="rgb(255 255 255 / 0.28)"
            strokeLinecap="round"
            strokeWidth="2"
          />

          {/* =================================================
              METAL CONNECTOR
              ================================================= */}

          <motion.g
            style={{
              x: dragX,
              y: dragY,
            }}
          >
            {/* Main connector */}

            <rect
              x="120"
              y="158"
              width="20"
              height="28"
              rx="5"
              fill="#202020"
              stroke="rgb(255 255 255 / 0.65)"
              strokeWidth="1.5"
            />

            {/* Connector opening */}

            <rect
              x="125"
              y="163"
              width="10"
              height="11"
              rx="3"
              fill="rgb(var(--accent) / 0.45)"
            />

            {/* Metal lower part */}

            <rect
              x="124"
              y="178"
              width="12"
              height="8"
              rx="3"
              fill="#707070"
              stroke="rgb(255 255 255 / 0.45)"
              strokeWidth="1"
            />
          </motion.g>
        </motion.svg>

        {/* =====================================================
            ID CARD
            =====================================================

            Hanya card yang menggunakan drag.
        ===================================================== */}

        <motion.div
          className="
    absolute
    left-0
            top-0
    z-10
    w-full
    select-none
            sm:top-[150px]
  "
          style={{
            x: dragX,
            y: dragY,

            rotateX: prefersReducedMotion ? 0 : tiltX,

            rotateY: prefersReducedMotion ? 0 : tiltY,

            transformPerspective: 1100,
            transformOrigin: "50% 0%",
          }}
          drag={!prefersReducedMotion}
          dragConstraints={{
            left: -350,
            right: 350,
            top: -80,
            bottom: 300,
          }}
          dragElastic={0.08}
          dragMomentum={false}
          dragPropagation={false}
          whileDrag={{
            scale: 1.01,
          }}
          onDragEnd={() => {
            animate(dragX, 0, {
              type: "spring",
              stiffness: 150,
              damping: 9,
              mass: 0.65,
            });

            animate(dragY, 0, {
              type: "spring",
              stiffness: 150,
              damping: 9,
              mass: 0.65,
            });
          }}
          onPointerMove={handlePointerMove}
          onPointerLeave={resetPointer}
        >
          {/* ===================================================
              CARD
          =================================================== */}

          <motion.article
            className={`
              relative
              overflow-hidden
              rounded-[22px]
              border
              p-3
              backdrop-blur-2xl
              ${cardShellClass}
            `}
            style={{
              boxShadow: cardShadow,
              transformOrigin: "50% 0%",
            }}
          >
            {/* =================================================
                CARD HIGHLIGHT
            ================================================= */}

            <motion.div
              className="
                pointer-events-none
                absolute
                inset-0
                z-20
              "
              style={{
                background: highlight,
              }}
            />

            <div className="relative z-10">
              {/* ===============================================
                  CARD HEADER
              =============================================== */}

              <div
                className={`
                    mb-3
                  flex
                  items-center
                  justify-between
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.22em]
                  ${cardHeaderClass}
                `}
              >
                <span>Studio Pass</span>

                <span className="text-accent">Active</span>
              </div>

              {/* ===============================================
                  PROFILE IMAGE
              =============================================== */}

              <div
                className={`
                  relative
                  aspect-[4/5]
                  overflow-hidden
                  rounded-2xl
                  border
                  ${imageWrapClass}
                `}
              >
                <motion.img
                  src="/profile.jpg"
                  alt="Portrait placeholder for portfolio owner"
                  className={`
                    h-full
                    w-full
                    object-cover
                    transition
                    duration-700
                    hover:scale-105
                    ${
                      isLightTheme
                        ? "grayscale-0 brightness-[1.02] contrast-[0.98]"
                        : "grayscale"
                    }
                  `}
                  style={{
                    x: imageX,
                    y: imageY,
                    scale: 1.06,
                  }}
                  draggable={false}
                />

                {/* Image gradient */}

                <div
                  className={`
                    absolute
                    inset-0
                    ${
                      isLightTheme
                        ? "bg-gradient-to-t from-black/35 via-black/0 to-transparent"
                        : "bg-gradient-to-t from-black via-black/8 to-transparent"
                    }
                  `}
                />

                {/* Profile information */}

                <div
                  className="
                    absolute
                      bottom-3
                      left-3
                      right-3
                    flex
                    items-end
                    justify-between
                  "
                >
                  <div
                    className={`
                      ${
                        isLightTheme
                          ? "drop-shadow-[0_2px_6px_rgba(255,255,255,0.75)]"
                          : ""
                      }
                    `}
                  >
                    <p
                      className={`
                          text-lg
                        font-semibold
                        tracking-tight
                        ${infoStrongClass}
                        ${
                          isLightTheme
                            ? ""
                            : "drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
                        }
                      `}
                      style={
                        isLightTheme
                          ? undefined
                          : { textShadow: "0 2px 8px rgba(0,0,0,0.7)" }
                      }
                    >
                      {profile.name}
                    </p>

                    <p
                      className={`
                        mt-1
                        text-xs
                        uppercase
                        tracking-[0.2em]
                        ${infoTextClass}
                        ${
                          isLightTheme
                            ? ""
                            : "drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
                        }
                      `}
                      style={
                        isLightTheme
                          ? undefined
                          : { textShadow: "0 2px 6px rgba(0,0,0,0.6)" }
                      }
                    >
                      Fullstack Developer
                    </p>
                  </div>

                  <BadgeCheck
                    className="
                      h-6
                      w-6
                      text-accent
                      drop-shadow-[0_0_18px_rgb(var(--accent)/0.85)]
                    "
                  />
                </div>
              </div>

              {/* ===============================================
                  CARD INFORMATION
              =============================================== */}

              <div
                className="
                  mt-3
                  grid
                  grid-cols-[1fr_auto]
                  gap-3
                "
              >
                <div className="space-y-2">
                  {/* ID */}

                  <p
                    className={`
                      text-xs
                      leading-4
                      ${infoTextClass}
                    `}
                  >
                    PORTOFOLIO / 2026
                  </p>

                  {/* Location */}

                  <p
                    className={`
                      flex
                      items-center
                      gap-2
                      text-xs
                      ${infoTextClass}
                    `}
                  >
                    <MapPin
                      className="
                        h-3.5
                        w-3.5
                        text-accent
                      "
                    />

                    {profile.location}
                  </p>

                  {/* Availability */}

                  <p
                    className={`
                      flex
                      items-center
                      gap-2
                      text-xs
                      ${infoTextClass}
                    `}
                  >
                    <Radio
                      className="
                        h-3.5
                        w-3.5
                        text-accent
                      "
                    />
                    Open to selected work
                  </p>
                </div>

                {/* =============================================
                    QR / CODE GRID
                ============================================= */}

                <a
                  href={driveFolderLink}
                  target="_blank"
                  rel="noreferrer"
                  className={`
                    block
                    h-16
                    w-16
                    overflow-hidden
                    rounded-xl
                    border
                    p-1.5
                    transition
                    hover:scale-[1.02]
                    hover:border-accent/40
                    ${qrFrameClass}
                  `}
                  aria-label="Open Google Drive folder"
                >
                  <img
                    src={qrCodeUrl}
                    alt="QR code to open the Google Drive folder"
                    className="h-full w-full rounded-lg object-cover"
                    draggable={false}
                  />
                </a>
              </div>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </div>
  );
}
