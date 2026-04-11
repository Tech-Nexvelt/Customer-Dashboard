"use client";
import { useState } from "react";

export default function Toggle({ defaultOn = false, onChange }: { defaultOn?: boolean; onChange?: (on: boolean) => void }) {
  const [on, setOn] = useState(defaultOn);

  const handleClick = () => {
    const next = !on;
    setOn(next);
    if (onChange) onChange(next);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: 44,
        height: 24,
        borderRadius: 999,
        background: on ? "#00C896" : "#D1D5DB",
        cursor: "pointer",
        position: "relative",
        flexShrink: 0,
        transition: "background 0.2s",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 3,
          left: on ? 23 : 3,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "white",
          transition: "left 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        }}
      />
    </div>
  );
}
