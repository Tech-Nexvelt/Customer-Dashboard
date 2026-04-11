"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Home, Clock, ClipboardList, Bookmark, MessageCircle, BarChart2,
  Sparkles, Timer, Settings, LucideIcon
} from "lucide-react";
import { navItems, bottomNavItems } from "@/constants/navItems";
import { NavItem } from "@/types/dashboard";
import { useDashboard } from "@/lib/dashboard/dashboardContext";

const iconMap: Record<string, LucideIcon> = {
  Home, Clock, ClipboardList, Bookmark, MessageCircle, BarChart2,
  Sparkles, Timer, Settings,
};

const LABEL_STYLE: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 600,
  color: "#C4C4BE",
  letterSpacing: "0.07em",
  textTransform: "uppercase",
  marginBottom: 4,
  marginTop: 8,
  paddingLeft: 2,
};

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { addTab, tabs } = useDashboard();

  const handleNav = (item: NavItem) => {
    // 1. Physically Navigate
    router.push(item.href);
    
    // 2. Add/Select Tab
    addTab(item.label, item.href, "#10B981");
  };

  const renderItem = (item: NavItem) => {
    const Icon = iconMap[item.icon];
    const active = pathname === item.href;
    
    return (
      <div 
        key={item.id} 
        onClick={() => handleNav(item)} 
        style={{ cursor: "pointer", width: "100%", display: "flex", justifyContent: "center" }}
      >
        <div
          title={item.label}
          style={{
            width: 40,
            height: 40,
            borderRadius: 11,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: active ? "#F3F4F6" : "transparent",
            position: "relative",
            marginBottom: 2,
            transition: "background 0.15s",
          }}
        >
          {Icon && <Icon size={18} color={active ? "#1A1A1A" : "#9CA3AF"} strokeWidth={active ? 2.2 : 1.8} />}
          {item.badge !== undefined && item.badge > 0 && (
            <span
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#10B981",
                border: "1.5px solid #fff",
              }}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        width: 68,
        flexShrink: 0,
        background: "#FFFFFF",
        borderRight: "1px solid #EBEBEB",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 14,
        paddingBottom: 20,
        position: "sticky",
        top: 0,
        overflowY: "auto",
        zIndex: 20,
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 12,
          background: "#1A1A1A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
          flexShrink: 0,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          cursor: "pointer",
        }}
        onClick={() => router.push("/dashboard/overview")}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" fill="white"/>
        </svg>
      </div>

      <div style={{ width: "100%", paddingLeft: 14, marginBottom: 8 }}>
        <p style={LABEL_STYLE}>Menu</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", paddingInline: 10, flex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", alignItems: "center" }}>
          {navItems.map(renderItem)}
        </div>
        <div style={{ width: 28, height: 1, background: "#F0F0EC", margin: "20px 0" }} />
        <div style={{ width: "100%", paddingLeft: 4, marginBottom: 8 }}>
          <p style={{ ...LABEL_STYLE, marginTop: 0 }}>Settings</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%", alignItems: "center" }}>
          {bottomNavItems.map(renderItem)}
        </div>
      </div>

      <div style={{ width: "100%", paddingLeft: 14, marginBottom: 8 }}>
        <p style={LABEL_STYLE}>Account</p>
      </div>
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid #F0F0EC",
          cursor: "pointer",
          flexShrink: 0,
          transition: "transform 0.2s",
        }}
        className="hover-scale"
        onClick={() => router.push("/dashboard/settings")}
      >
        <img 
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Kishore" 
          alt="User" 
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}
