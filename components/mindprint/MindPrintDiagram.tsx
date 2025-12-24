"use client";
import React from "react";

type NodeKey = "cp" | "af" | "wm" | "lp" | "er" | "sa";

const CX = 300;
const CY = 300;
const CORE_RADIUS = 66;

export default function MindPrintDiagram({
  active,
  onSelect,
}: {
  active: NodeKey;
  onSelect: (key: NodeKey) => void;
}) {
  const nodes: Array<{
    key: NodeKey;
    label: string;
    x: number;
    y: number;
    icon: JSX.Element;
  }> = [
    { key: "cp", label: "Cognitive processing", x: 420, y: 150, icon: <IconBrain /> },
    { key: "af", label: "Attention & focus", x: 485, y: 300, icon: <IconFocus /> },
    { key: "wm", label: "Working memory", x: 420, y: 450, icon: <IconLayers /> },
    { key: "lp", label: "Learning pace", x: 180, y: 450, icon: <IconGauge /> },
    { key: "er", label: "Error response", x: 115, y: 300, icon: <IconShield /> },
    { key: "sa", label: "Strategy adaptability", x: 180, y: 150, icon: <IconCompass /> },
  ];

  return (
    <div className="w-full">
      <svg viewBox="0 0 600 600" className="w-full h-auto">
        <defs>
          <radialGradient id="kkCoreGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(217,207,242,0.75)" />
            <stop offset="65%" stopColor="rgba(217,207,242,0.25)" />
            <stop offset="100%" stopColor="rgba(217,207,242,0)" />
          </radialGradient>

          <filter id="kkSoftShadow" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow
              dx="0"
              dy="12"
              stdDeviation="16"
              floodColor="rgba(63,58,82,0.12)"
            />
          </filter>
        </defs>

        {/* Guide rings */}
        <circle cx={CX} cy={CY} r="210" fill="none" stroke="rgba(94,85,116,0.12)" strokeWidth="2" />
        <circle cx={CX} cy={CY} r="150" fill="none" stroke="rgba(217,207,242,0.45)" strokeWidth="2" />

        {/* Subtle breathing glow */}
        <g className="kk-breathe">
          <circle cx={CX} cy={CY} r="110" fill="url(#kkCoreGlow)" />
        </g>

        {/* Core */}
        <g filter="url(#kkSoftShadow)">
          <circle
            cx={CX}
            cy={CY}
            r={CORE_RADIUS}
            fill="rgba(255,255,255,0.92)"
            stroke="rgba(217,207,242,0.95)"
            strokeWidth="2"
          />
          <text
            x={CX}
            y={CY - 2}
            textAnchor="middle"
            fontSize="15.5"
            fontWeight={600}
            fill="#3F3A52"
          >
            MindPrint™
          </text>
          <text
            x={CX}
            y={CY + 16}
            textAnchor="middle"
            fontSize="11"
            fill="#6B647F"
          >
            Cognitive learning map
          </text>
        </g>

        {/* Connectors */}
        {nodes.map((n) => {
          const angle = Math.atan2(n.y - CY, n.x - CX);
          const endX = CX + Math.cos(angle) * CORE_RADIUS;
          const endY = CY + Math.sin(angle) * CORE_RADIUS;

          return (
            <line
              key={`line-${n.key}`}
              x1={n.x}
              y1={n.y}
              x2={endX}
              y2={endY}
              stroke={
                n.key === active
                  ? "rgba(94,85,116,0.55)"
                  : "rgba(94,85,116,0.18)"
              }
              strokeWidth={n.key === active ? 2.2 : 1.3}
              strokeLinecap="round"
            />
          );
        })}

        {/* Nodes + labels */}
        {nodes.map((n) => {
          const isActive = n.key === active;
          const labelX = n.x > CX ? n.x + 42 : n.x - 162;

          return (
            <g
              key={n.key}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(n.key)}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={n.x}
                cy={n.y}
                r={isActive ? 27 : 25}
                fill={isActive ? "rgba(217,207,242,0.65)" : "rgba(255,255,255,0.9)"}
                stroke="rgba(217,207,242,0.9)"
                strokeWidth="2"
              />

              <g transform={`translate(${n.x - 10}, ${n.y - 10})`}>
                {n.icon}
              </g>

              <foreignObject
                x={labelX}
                y={n.y - 12}
                width="150"
                height="32"
              >
                <div
                  style={{
                    fontFamily: "inherit",
                    fontSize: 11,
                    fontWeight: 500,
                    color: "#6B647F",
                    lineHeight: 1.15,
                    textAlign: n.x > CX ? "left" : "right",
                    background: "transparent",
                    pointerEvents: "none",
                  }}
                >
                  {n.label}
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ================= ICONS ================= */

function IconBrain() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7.6 4.2c-1.8 0-3.3 1.4-3.3 3.2" stroke="rgba(94,85,116,0.7)" strokeWidth="1.5" />
      <path d="M12.4 4.2c1.8 0 3.3 1.4 3.3 3.2" stroke="rgba(94,85,116,0.7)" strokeWidth="1.5" />
      <path d="M10 5.2v9.2" stroke="rgba(94,85,116,0.35)" strokeWidth="1.2" />
    </svg>
  );
}

function IconFocus() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="3.3" stroke="rgba(94,85,116,0.75)" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="1.2" fill="rgba(94,85,116,0.55)" />
    </svg>
  );
}

function IconLayers() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3.8l6.5 3.4L10 10.6 3.5 7.2Z" stroke="rgba(94,85,116,0.75)" strokeWidth="1.4" />
    </svg>
  );
}

function IconGauge() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4.4 14.3a6.6 6.6 0 1 1 11.2 0" stroke="rgba(94,85,116,0.7)" strokeWidth="1.5" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3.5 15.8 6v5.1" stroke="rgba(94,85,116,0.75)" strokeWidth="1.4" />
    </svg>
  );
}

function IconCompass() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="6.8" stroke="rgba(94,85,116,0.65)" strokeWidth="1.4" />
    </svg>
  );
}
