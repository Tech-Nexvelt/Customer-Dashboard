import React from "react";
import C from "@/constants/colors";

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default function Card({ children, style = {}, className = "" }: CardProps) {
  return (
    <div
      className={className}
      style={{
        background: C.white,
        borderRadius: 16,
        padding: 20,
        border: `1px solid ${C.border}`,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
