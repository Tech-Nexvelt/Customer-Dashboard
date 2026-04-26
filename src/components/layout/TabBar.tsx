"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Tab } from "@/types/dashboard";
import C from "@/constants/colors";

interface TabBarProps {
  tabs: Tab[];
  activeId: number;
  onSwitch: (tab: Tab) => void;
}

export default function TabBar({ tabs, activeId, onSwitch }: TabBarProps) {
  const router = useRouter();

  const handleSwitch = (tab: Tab) => {
    router.push(tab.href);
    onSwitch(tab);
  };

  return (
    <div
      style={{
        height: 56,
        background: "transparent",
        display: "flex",
        alignItems: "center",
        overflowX: "auto",
        scrollbarWidth: "none",
        padding: "0 16px",
        gap: 8,
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeId === tab.id;
        return (
          <motion.div
            key={tab.id}
            onClick={() => handleSwitch(tab)}
            initial={false}
            animate={{
              background: isActive ? C.white : "rgba(255,255,255,0)",
              scale: isActive ? 1 : 0.98,
            }}
            whileHover={{ scale: 1.02, background: isActive ? C.white : "rgba(0,0,0,0.02)" }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 14px",
              height: 38,
              cursor: "pointer",
              borderRadius: 14,
              fontSize: 13,
              fontWeight: isActive ? 700 : 500,
              color: isActive ? C.text : C.muted,
              userSelect: "none",
              whiteSpace: "nowrap",
              border: isActive ? `1px solid ${C.border}` : "1px solid transparent",
              boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
            }}
          >
            {isActive && (
              <motion.div 
                layoutId="active-dot"
                style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal }} 
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span style={{ maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis" }}>
              {tab.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
