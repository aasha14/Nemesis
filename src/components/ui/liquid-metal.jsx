import React from "react";

function getSizeStyles(size) {
  if (size === "hero") {
    return {
      minHeight: "58px",
      padding: "0 28px",
      fontSize: "20px",
      borderRadius: "999px",
      gap: "12px",
    };
  }

  if (size === "sm") {
    return {
      minHeight: "38px",
      padding: "0 16px",
      fontSize: "13px",
      borderRadius: "999px",
      gap: "8px",
    };
  }

  return {
    minHeight: "46px",
    padding: "0 20px",
    fontSize: "15px",
    borderRadius: "999px",
    gap: "10px",
  };
}

export function LiquidMetalButton({
  children,
  onClick,
  icon,
  size = "default",
  borderWidth = 3,
  metalConfig,
  className = "",
  type = "button",
  disabled = false,
}) {
  const sizeStyles = getSizeStyles(size);

  const colorBack = metalConfig?.colorBack || "#8a8a8a";
  const colorTint = metalConfig?.colorTint || "#ffffff";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "fit-content",
        whiteSpace: "nowrap",
        border: "none",
        outline: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        background: "transparent",
        padding: 0,
        borderRadius: sizeStyles.borderRadius,
        transition: "transform 0.2s ease, opacity 0.2s ease",
        opacity: disabled ? 0.65 : 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
      onMouseDown={(e) => {
        if (!disabled) e.currentTarget.style.transform = "translateY(1px) scale(0.99)";
      }}
      onMouseUp={(e) => {
        if (!disabled) e.currentTarget.style.transform = "translateY(-1px)";
      }}
    >
      <span
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: sizeStyles.minHeight,
          padding: sizeStyles.padding,
          gap: sizeStyles.gap,
          borderRadius: sizeStyles.borderRadius,
          fontSize: sizeStyles.fontSize,
          fontWeight: 600,
          color: "#111111",
          background: `
            linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(236,236,236,0.96) 18%, rgba(186,186,186,0.95) 40%, rgba(255,255,255,0.98) 58%, rgba(170,170,170,0.96) 78%, rgba(245,245,245,0.98) 100%)
          `,
          border: `${borderWidth}px solid ${colorBack}`,
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.95),
            inset 0 -6px 12px rgba(0,0,0,0.12),
            0 8px 22px rgba(0,0,0,0.28),
            0 0 0 1px rgba(255,255,255,0.08)
          `,
          overflow: "hidden",
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: sizeStyles.borderRadius,
            background: `
              linear-gradient(
                120deg,
                rgba(255,255,255,0.05) 0%,
                rgba(255,255,255,0.28) 18%,
                rgba(255,255,255,0.72) 28%,
                rgba(255,255,255,0.10) 38%,
                rgba(255,255,255,0.03) 100%
              )
            `,
            transform: "translateX(-30%)",
            pointerEvents: "none",
          }}
        />

        <span
          style={{
            position: "absolute",
            inset: "2px",
            borderRadius: "999px",
            boxShadow: `inset 0 0 0 1px ${colorTint}22`,
            pointerEvents: "none",
          }}
        />

        {icon ? (
          <span
            style={{
              position: "relative",
              zIndex: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {icon}
          </span>
        ) : null}

        <span
          style={{
            position: "relative",
            zIndex: 1,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
            whiteSpace: "nowrap",
            letterSpacing: "0.01em",
          }}
        >
          {children}
        </span>
      </span>
    </button>
  );
}