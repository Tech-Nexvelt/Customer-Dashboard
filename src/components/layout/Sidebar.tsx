"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import {
  Home, Clock, ClipboardList, Bookmark, BarChart2,
  Sparkles, Timer, Settings, LucideIcon, Lock, Users
} from "lucide-react";
import { navItems, bottomNavItems } from "@/constants/navItems";
import { NavItem } from "@/types/dashboard";
import { useDashboard } from "@/lib/dashboard/dashboardContext";
import { PlanType } from "@/constants/planLimits";
import { useUser } from "@/features/auth/hooks/useUser";

const iconMap: Record<string, LucideIcon> = {
  Home, Clock, ClipboardList, Bookmark, BarChart2,
  Sparkles, Timer, Settings, Users,
};

import C from "@/constants/colors";

const LABEL_STYLE: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  color: "#94A3B8",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  marginBottom: 8,
};

const PREMIUM_FEATURES = ["Prep", "Plan", "AI Tools"];

export default function Sidebar({ expanded = true }: { expanded?: boolean }) {
  const router = useRouter();
  const pathname = usePathname();
  const { addTab } = useDashboard();
  
  const { user } = useUser();
  const isAdmin = user?.accessLevel === 'admin';

  const userName = user?.name || "User";

  // Mock plan for now
  const currentPlan: PlanType = "basic";

  const isLocked = (label: string) => {
    return currentPlan === "basic" && PREMIUM_FEATURES.includes(label);
  };


  const handleNav = (item: NavItem) => {
    if (isLocked(item.label)) {
      router.push("/dashboard/plans");
      return;
    }
    router.push(item.href);
    addTab(item.label, item.href, C.teal);
  };

  const renderItem = (item: NavItem) => {
    // Hide Admin Feed if user is not an admin
    if (item.id === "admin" && !isAdmin) return null;

    const Icon = iconMap[item.icon];
    const active = pathname === item.href;
    const locked = isLocked(item.label);
    
    return (
      <div 
        key={item.id} 
        onClick={() => handleNav(item)} 
        style={{ cursor: "pointer", width: "100%", paddingInline: 12, position: "relative", opacity: locked ? 0.7 : 1 }}
      >
        <div
          title={locked ? `${item.label} (Premium Feature)` : item.label}
          style={{
            position: "relative",
            width: "100%",
            height: 44,
            borderRadius: 12,
            display: "flex",
            alignItems: "center",
            padding: expanded ? "0 14px" : "0",
            justifyContent: expanded ? "flex-start" : "center",
            gap: 12,
            zIndex: 1,
            color: active ? C.text : C.muted,
          }}
        >
          {active && (
            <motion.div
              layoutId="sidebar-active"
              style={{
                position: "absolute",
                inset: 0,
                background: C.iconActiveBg,
                borderRadius: 12,
                zIndex: -1,
              }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
            />
          )}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 34 }}>
            {Icon && <Icon size={20} color={active ? C.teal : C.iconInactive} strokeWidth={active ? 2.5 : 2} />}
          </div>
          
          {expanded && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
              <span style={{ 
                fontSize: 14, 
                fontWeight: active ? 700 : 500, 
                marginTop: 1
              }}>
                {item.label}
              </span>
              {locked && <Lock size={12} color={C.muted} />}
            </div>
          )}

          {item.badge !== undefined && item.badge > 0 && (
            <span
              style={{
                marginLeft: "auto",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: C.teal,
                boxShadow: `0 0 10px ${C.teal}40`,
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
        width: expanded ? 240 : 68,
        flexShrink: 0,
        background: C.white,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: expanded ? "flex-start" : "center",
        paddingTop: 14,
        paddingBottom: 24,
        position: "sticky",
        top: 0,
        overflowY: "auto",
        zIndex: 20,
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Brand area removed from here as it's in TopBar now */}
      
      <div style={{ width: "100%", paddingLeft: 22, marginBottom: 16 }}>
        <p style={{ ...LABEL_STYLE, color: C.light_text }}>Platform</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", width: "100%", paddingInline: 14, flex: 1 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
          {navItems.map(renderItem)}
        </div>
        
        <div style={{ width: "100%", height: 1, background: C.border, margin: "24px 0" }} />
        
        <div style={{ width: "100%", paddingLeft: 8, marginBottom: 16 }}>
          <p style={{ ...LABEL_STYLE, marginTop: 0, color: C.light_text }}>Systems</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
          {bottomNavItems.map(renderItem)}
        </div>
      </div>

      <div style={{ width: "100%", padding: "0 14px", marginTop: "auto" }}>
        <div
          style={{
            width: "100%",
            padding: "12px",
            background: C.bg,
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
          }}
          onClick={() => router.push("/dashboard/settings")}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} 
              alt="User" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          {expanded && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userName}</p>
              <p style={{ fontSize: 11, fontWeight: 500, color: C.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Unlock Premium</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
