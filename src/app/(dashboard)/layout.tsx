"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import TabBar from "@/components/layout/TabBar";
import AIPanel from "@/components/layout/AIPanel";
import JobRealtimeListener from "@/components/dashboard/JobRealtimeListener";
import { DashboardProvider, useDashboard } from "@/lib/dashboard/dashboardContext";
import { navItems } from "@/constants/navItems";
import { supabase } from "@/lib/supabaseClient";
import C from "@/constants/colors";

function DashboardInnerLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { tabs, activeId, switchTab, closeTab, addTab, setActiveId } = useDashboard();
  const [isVerifying, setIsVerifying] = useState(true);

  // Security Check: Redirect if not logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/login");
      } else {
        setIsVerifying(false);
      }
    };
    checkUser();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  // Sync Tabs with Route changes
  useEffect(() => {
    if (isVerifying) return;
    const existing = tabs.find((t) => t.href === pathname);
    if (existing) {
      setActiveId(existing.id);
    } else {
      const navItem = navItems.find((n) => n.href === pathname);
      if (navItem) {
        addTab(navItem.label, navItem.href, "#2DD4A7");
      }
    }
  }, [pathname, tabs, setActiveId, addTab, isVerifying]);

  if (isVerifying) return null; // Prevent flicker

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", background: "#F8FAFC" }}>
      <JobRealtimeListener />
      {/* ── Top: Full-Width Top Bar ── */}
      <TopBar onMenuClick={() => setDrawerOpen((v: boolean) => !v)} />

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* ── Left: Expanded Sidebar ── */}
        <div className="ds-sidebar-desktop" style={{ width: 240, borderRight: "1px solid #F1F5F9" }}>
          <Sidebar expanded={true} />
        </div>

        {/* ── Mobile Drawer ── */}
        {drawerOpen && (
          <>
            <div
              onClick={() => setDrawerOpen(false)}
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 99 }}
            />
            <div style={{ position: "fixed", top: 0, left: 0, zIndex: 100, height: "100vh", width: 240 }}>
              <Sidebar expanded={true} />
            </div>
          </>
        )}

        {/* ── Main Content Area ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden", background: "#FFFFFF" }}>
          <div style={{ background: "#FFFFFF", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
              <TabBar
                tabs={tabs}
                activeId={activeId}
                onSwitch={(tab) => switchTab(tab.id)}
                onClose={closeTab}
                onAdd={() => addTab("New Tab", pathname, C.teal)}
              />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", background: "#F8FAFC" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px", width: "100%" }}>
              {children}
            </div>
          </div>
        </div>

        {/* ── Right: Floating AI Overlay ── */}
        {aiOpen && (
          <div 
            style={{ 
              position: "fixed", 
              top: 0, 
              right: 0, 
              width: 380, 
              height: "100%", 
              background: C.white, 
              borderLeft: `1px solid ${C.border}`, 
              display: "flex", 
              flexDirection: "column",
              zIndex: 100,
              boxShadow: "-10px 0 50px rgba(0,0,0,0.1)",
            }} 
            className="animate-in slide-in-from-right duration-300"
          >
            {/* Close button inside the panel */}
            <div style={{ position: "absolute", top: 18, right: 20, zIndex: 110 }}>
              <button 
                onClick={() => setAiOpen(false)}
                style={{ background: C.bg, border: "none", width: 28, height: 28, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <X size={16} color={C.muted} />
              </button>
            </div>
            <AIPanel />
          </div>
        )}
      </div>

      {/* ── Floating AI Trigger (Visible only when AI is closed) ── */}
      {!aiOpen && (
        <button 
          onClick={() => setAiOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center border border-slate-100 hover:scale-110 active:scale-95 transition-all z-[100] group animate-in zoom-in duration-300"
        >
          <img src="/NV-logo-short.png" alt="Nexvelt AI" className="w-9 h-9 opacity-80 group-hover:opacity-100 transition-opacity" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#2DD4A7] rounded-full border-2 border-white"></div>
        </button>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .ds-sidebar-desktop { display: none !important; }
        }
      `}</style>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardProvider>
      <DashboardInnerLayout>{children}</DashboardInnerLayout>
    </DashboardProvider>
  );
}
