"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Bell, MessageSquare, Search, Menu, Home, LucideIcon } from "lucide-react";
import C from "@/constants/colors";
import { navItems, bottomNavItems } from "@/constants/navItems";

const allItems = [...navItems, ...bottomNavItems];

interface IconBtnProps {
  Icon: LucideIcon;
}

const IconBtn: React.FC<IconBtnProps> = ({ Icon }) => (
  <button
    style={{
      width: 34,
      height: 34,
      borderRadius: 10,
      background: "transparent",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    }}
  >
    <Icon size={18} color={C.muted} strokeWidth={1.8} />
  </button>
);

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const pathname = usePathname();
  const active = allItems.find((n) => pathname.startsWith(n.href));

  return (
    <div
      style={{
        height: 60,
        background: "transparent",
        display: "flex",
        alignItems: "center",
        padding: "0 22px",
        gap: 12,
        flexShrink: 0,
        zIndex: 10,
      }}
    >
      <button
        className="ds-hamburger"
        onClick={onMenuClick}
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "white",
          border: "1px solid #EBEBEB",
          cursor: "pointer",
          display: "none",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Menu size={16} color={C.text} />
      </button>

      {/* Breadcrumbs */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
        <span style={{ fontSize: 13, color: "#9CA3AF", fontWeight: 400 }}>Kishore</span>
        <span style={{ color: "#C4C4BE", fontSize: 14 }}>›</span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            fontWeight: 600,
            color: "#1A1A1A",
          }}
        >
          <div 
            style={{ 
              width: 24, 
              height: 24, 
              borderRadius: 6, 
              background: "#FFFFFF", 
              border: "1px solid #EBEBEB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Home size={14} color="#1A1A1A" strokeWidth={2.4} />
          </div>
          {active?.label || "Overview"}
        </div>
      </div>

      {/* Utility Icons */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div 
          onClick={() => alert("Notifications panel")}
          style={{ position: "relative" }}
        >
          <div style={{ padding: 6, borderRadius: 8, background: "white", border: "1px solid #EBEBEB", cursor: "pointer" }}>
            <Bell size={18} color="#1A1A1A" strokeWidth={2} />
          </div>
          <span
            style={{
              position: "absolute",
              top: -2,
              right: -2,
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#10B981",
              border: "2px solid white",
            }}
          />
        </div>
        <div 
          onClick={() => alert("Messages panel")}
          style={{ padding: 6, borderRadius: 8, background: "white", border: "1px solid #EBEBEB", cursor: "pointer" }}
        >
          <MessageSquare size={18} color="#1A1A1A" strokeWidth={2} />
        </div>
        <div 
          onClick={() => alert("Search functionality coming soon!")}
          style={{ padding: 6, borderRadius: 8, background: "white", border: "1px solid #EBEBEB", cursor: "pointer" }}
        >
          <Search size={18} color="#1A1A1A" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}
