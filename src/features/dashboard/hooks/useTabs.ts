"use client";
import { useState } from "react";
import { DEFAULT_TABS } from "@/constants/tabs";
import { Tab } from "@/types/dashboard";
import { navItems, bottomNavItems } from "@/constants/navItems";

const allNavItems = [...navItems, ...bottomNavItems];

export function useTabs() {
  const [tabs, setTabs] = useState<Tab[]>(DEFAULT_TABS);
  const [activeId, setActiveId] = useState(1);
  const [unreadJobCount, setUnreadJobCount] = useState(0);
  const [totalJobCount, setTotalJobCount] = useState(0);

  const switchTab = (id: number) => {
    setActiveId(id);
    const activeTab = tabs.find(t => t.id === id);
    if (activeTab?.href === "/dashboard/jobs") {
      setUnreadJobCount(0);
    }
  };

  const closeTab = (id: number) => {
    if (tabs.length <= 1) return; // Keep at least one tab
    const remaining = tabs.filter((t) => t.id !== id);
    setTabs(remaining);
    if (activeId === id) {
      const lastTab = remaining[remaining.length - 1];
      setActiveId(lastTab.id);
      if (lastTab.href === "/dashboard/jobs") {
        setUnreadJobCount(0);
      }
    }
  };

  const addTab = (name: string, href: string, color: string = "#10B981") => {
    if (href === "/dashboard/jobs") {
      setUnreadJobCount(0);
    }
    const existing = tabs.find((t) => t.href === href);
    if (existing) {
      // Sync label if it changed in navItems
      const nav = allNavItems.find(n => n.href === href);
      if (nav && existing.name !== nav.label) {
        setTabs(prev => prev.map(t => t.id === existing.id ? { ...t, name: nav.label } : t));
      }
      setActiveId(existing.id);
      return existing.id;
    }
    
    const newId = Date.now();
    const newTab: Tab = {
      id: newId,
      name,
      initials: name.charAt(0).toUpperCase(),
      color,
      active: true,
      href,
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveId(newId);
    return newId;
  };

  return { 
    tabs, 
    activeId, 
    switchTab, 
    closeTab, 
    addTab, 
    setActiveId, 
    unreadJobCount, 
    setUnreadJobCount,
    totalJobCount,
    setTotalJobCount
  };
}
