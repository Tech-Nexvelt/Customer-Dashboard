"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useTabs } from "@/features/dashboard/hooks/useTabs";
import { Tab } from "@/types/dashboard";

interface DashboardContextType {
  tabs: Tab[];
  activeId: number;
  switchTab: (id: number) => void;
  closeTab: (id: number) => void;
  addTab: (name: string, href: string, color?: string) => number;
  setActiveId: (id: number) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const tabsState = useTabs();

  return (
    <DashboardContext.Provider value={tabsState}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
