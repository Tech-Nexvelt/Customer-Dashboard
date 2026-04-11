import React from "react";

interface AvatarProps {
  name?: string;
  src?: string;
  size?: number | string;
  className?: string;
  online?: boolean;
}

export default function Avatar({ name = "User", src = "", size = 42, className = "", online = false }: AvatarProps) {
  const isString = typeof size === "string";
  const dim = isString ? size : `${size}px`;
  
  return (
    <div style={{ position: "relative", display: "inline-block", flexShrink: 0 }}>
      {online && (
        <div 
          style={{ 
            position: "absolute", 
            bottom: 1, 
            right: 1, 
            width: 10, 
            height: 10, 
            background: "#10B981", 
            border: "2.5px solid white", 
            borderRadius: "50%", 
            zIndex: 10 
          }} 
        />
      )}
      <div
        className={className}
        style={{
          width: dim,
          height: dim,
          borderRadius: "50%",
          overflow: "hidden",
          background: "linear-gradient(135deg, #10B981, #3B82F6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: 700,
          fontSize: isString ? 14 : Math.floor(size / 2.5),
          border: "1.5px solid white",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        {src ? (
          <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span>{name.charAt(0).toUpperCase()}</span>
        )}
      </div>
    </div>
  );
}
