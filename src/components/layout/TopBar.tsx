"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Bell, Menu, Home, Sparkles, LogOut } from "lucide-react";
import C from "@/constants/colors";
import { navItems, bottomNavItems } from "@/constants/navItems";
import { useDashboard } from "@/lib/dashboard/dashboardContext";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useUser } from "@/features/auth/hooks/useUser";

const allItems = [...navItems, ...bottomNavItems];

interface TopBarProps {
  onMenuClick: () => void;
}

import Link from "next/link";

export default function TopBar({ onMenuClick }: TopBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { unreadJobCount } = useDashboard();
  const { user } = useUser();
  const active = allItems.find((n) => pathname.startsWith(n.href));

  const userName = user?.name || "User";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div
      style={{
        height: 64,
        background: C.white,
        borderBottom: `1px solid ${C.border}`,
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: 20,
        flexShrink: 0,
        zIndex: 50,
      }}
    >
      {/* Branding Anchor */}
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 20 }}>
        <img 
          src="/NVlogo.png" 
          alt="Nexvelt Logo" 
          style={{ height: 32, width: "auto" }}
        />
      </Link>

      <button
        className="ds-hamburger"
        onClick={onMenuClick}
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: C.bg,
          border: `1px solid ${C.border}`,
          cursor: "pointer",
          display: "flex", // Show on mobile via CSS
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Menu size={18} color={C.text} />
      </button>

      {/* Breadcrumbs */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
        <span style={{ fontSize: 13, color: C.muted, fontWeight: 500 }}>{userName}</span>
        <span style={{ color: C.light_text, fontSize: 14 }}>/</span>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            fontWeight: 700,
            color: C.text,
          }}
        >
          <div 
            style={{ 
              width: 28, 
              height: 28, 
              borderRadius: 8, 
              background: C.bg, 
              border: `1px solid ${C.border}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Home size={15} color={C.text} strokeWidth={2.5} />
          </div>
          {active?.label || "Overview"}
        </div>
      </div>

      {/* Actions Section */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button
          style={{
            background: "#0F172A",
            color: "white",
            padding: "8px 16px",
            borderRadius: 10,
            fontSize: 12,
            fontWeight: 700,
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Sparkles size={14} fill="#2DD4A7" color="#2DD4A7" />
          Unlock Premium
        </button>

        <div style={{ width: 1, height: 24, background: C.border }} />

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ padding: 8, borderRadius: 10, background: C.bg, cursor: "pointer", position: "relative" }}>
            <Bell size={18} color={C.text} strokeWidth={2} />
            {unreadJobCount > 0 && (
              <span 
                style={{ 
                  position: "absolute", 
                  top: -2, 
                  right: -2, 
                  minWidth: 18, 
                  height: 18, 
                  padding: "0 4px",
                  background: C.teal, 
                  borderRadius: 9, 
                  border: "2px solid white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 9,
                  fontWeight: 800,
                  color: "white"
                }}
              >
                {unreadJobCount}
              </span>
            )}
          </div>
          
          <button
            onClick={handleLogout}
            style={{
              padding: 8,
              borderRadius: 10,
              background: C.bg,
              border: `1px solid ${C.border}`,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: C.text,
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#FEF2F2")}
            onMouseLeave={(e) => (e.currentTarget.style.background = C.bg)}
            title="Sign Out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 1025px) {
          .ds-hamburger { display: none !important; }
        }
      `}</style>
    </div>
  );
}
