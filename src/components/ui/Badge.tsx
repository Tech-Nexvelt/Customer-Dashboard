import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "error" | "default";
  style?: React.CSSProperties;
  className?: string;
}

const COLORS = {
  success: { bg: "#ECFDF5", text: "#10B981", border: "#D1FAE5" },
  warning: { bg: "#FFFBEB", text: "#F59E0B", border: "#FEF3C7" },
  error: { bg: "#FEF2F2", text: "#DC2626", border: "#FEE2E2" },
  default: { bg: "#F9FAFB", text: "#6B7280", border: "#F3F4F6" },
};

export default function Badge({ children, variant = "default", style = {}, className = "" }: BadgeProps) {
  const { bg, text, border } = COLORS[variant];
  
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 10px",
        borderRadius: 999,
        background: bg,
        color: text,
        border: `1px solid ${border}`,
        fontSize: 10,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
