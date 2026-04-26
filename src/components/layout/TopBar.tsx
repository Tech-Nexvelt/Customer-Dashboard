"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { 
  Bell, 
  Menu, 
  Home, 
  Sparkles, 
  LogOut, 
  X, 
  ClipboardList, 
  Bookmark, 
  Clock, 
  BarChart2, 
  Timer, 
  Settings,
  LucideIcon
} from "lucide-react";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import C from "@/constants/colors";
import { navItems, bottomNavItems } from "@/constants/navItems";
import { useDashboard } from "@/lib/dashboard/dashboardContext";
import { useUser } from "@/features/auth/hooks/useUser";
import Link from "next/link";

const allItems = [...navItems, ...bottomNavItems];

const ICON_MAP: Record<string, LucideIcon> = {
  Home,
  ClipboardList,
  Bookmark,
  Clock,
  BarChart2,
  Sparkles,
  Timer,
  Settings
};

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { unreadJobCount } = useDashboard();
  const { user } = useUser();
  const active = allItems.find((n) => pathname.startsWith(n.href));

  const userName = user?.name || "User";

  const handleLogout = () => {
    toast((t) => (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-[#0F172A] border border-slate-100 shadow-sm">
              <LogOut size={20} />
            </div>
            <div>
              <p className="text-[15px] font-black text-[#0F172A] tracking-tight uppercase italic">Nexvelt</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sign Out</p>
            </div>
          </div>
          <button onClick={() => toast.dismiss(t.id)} className="text-slate-300 hover:text-slate-500 transition-colors">
            <X size={18} />
          </button>
        </div>
        
        <div className="space-y-1">
          <p className="text-[13px] font-bold text-[#0F172A]">End your session?</p>
          <p className="text-[11px] text-slate-500 font-medium leading-relaxed">You will be securely logged out. Any unsaved changes might be lost.</p>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              toast.loading("Ending session...", { id: "logout-loading" });
              await signOut({ callbackUrl: "/?message=Signed out successfully" });
            }}
            className="flex-1 py-3 bg-[#0F172A] text-white text-[10px] font-black uppercase tracking-[0.15em] rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            Confirm Logout
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="flex-1 py-3 bg-white border border-slate-200 text-slate-500 text-[10px] font-black uppercase tracking-[0.15em] rounded-xl hover:bg-slate-50 transition-all"
          >
            Stay Here
          </button>
        </div>
      </div>
    ), {
      duration: 8000,
      position: "top-center",
      style: {
        borderRadius: '28px',
        background: '#fff',
        padding: '24px',
        minWidth: '350px',
        boxShadow: '0 25px 70px -12px rgba(15, 23, 42, 0.15)',
        border: '1px solid #f1f5f9'
      },
    });
  };

  const ActiveIcon = (active?.icon && ICON_MAP[active.icon]) || Home;

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
            <ActiveIcon size={15} color={C.text} strokeWidth={2.5} />
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
