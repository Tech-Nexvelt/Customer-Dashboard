"use client";
import { useState } from "react";
import { DEFAULT_TABS } from "@/constants/tabs";
import { Tab } from "@/types/dashboard";

export function useTabs() {
  const [tabs, setTabs] = useState<Tab[]>(DEFAULT_TABS);
  const [activeId, setActiveId] = useState(1);

  const switchTab = (id: number) => setActiveId(id);

  const closeTab = (id: number) => {
    if (tabs.length <= 1) return; // Keep at least one tab
    const remaining = tabs.filter((t) => t.id !== id);
    setTabs(remaining);
    if (activeId === id) {
      setActiveId(remaining[remaining.length - 1].id);
    }
  };

  const addTab = (name: string, href: string, color: string = "#10B981") => {
    const existing = tabs.find((t) => t.href === href);
    if (existing) {
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

  return { tabs, activeId, switchTab, closeTab, addTab, setActiveId };
}
