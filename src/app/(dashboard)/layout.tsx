"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import TabBar from "@/components/layout/TabBar";
import AIPanel from "@/components/layout/AIPanel";
import { DashboardProvider, useDashboard } from "@/lib/dashboard/dashboardContext";
import { navItems } from "@/constants/navItems";

function DashboardInnerLayout({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  const { tabs, activeId, switchTab, closeTab, addTab, setActiveId } = useDashboard();

  // Sync Tabs with Route changes
  useEffect(() => {
    const existing = tabs.find((t) => t.href === pathname);
    if (existing) {
      setActiveId(existing.id);
    } else {
      // Find the label for this route from navItems
      const navItem = navItems.find((n) => n.href === pathname);
      if (navItem) {
        addTab(navItem.label, navItem.href, "#10B981");
      }
    }
  }, [pathname, tabs, setActiveId, addTab]);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#F0F0EC" }}>
      {/* ── Left: White Sidebar ── */}
      <div className="ds-sidebar-desktop">
        <Sidebar />
      </div>

      {/* ── Mobile Drawer ── */}
      {drawerOpen && (
        <>
          <div
            onClick={() => setDrawerOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 99 }}
          />
          <div style={{ position: "fixed", top: 0, left: 0, zIndex: 100, height: "100vh" }}>
            <Sidebar />
          </div>
        </>
      )}

      {/* ── Main Column with TabBar ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <TabBar
          tabs={tabs}
          activeId={activeId}
          onSwitch={(tab) => switchTab(tab.id)}
          onClose={closeTab}
          onAdd={() => addTab("New Tab", pathname, "#3B82F6")}
        />

        <div style={{ flex: 1, display: "flex", minHeight: 0, overflow: "hidden" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden", background: "#FFFFFF" }}>
            <TopBar onMenuClick={() => setDrawerOpen((v: boolean) => !v)} />
            <div style={{ flex: 1, overflowY: "auto", padding: "24px 22px", background: "#F0F0EC" }}>
              {children}
            </div>
          </div>

          <div style={{ display: "none" }} className="ai-panel-desktop">
            <AIPanel />
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1200px) {
          .ai-panel-desktop { display: flex !important; }
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
