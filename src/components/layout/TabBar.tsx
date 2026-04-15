"use client";
import React from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tab } from "@/types/dashboard";
import C from "@/constants/colors";

interface TabBarProps {
  tabs: Tab[];
  activeId: number;
  onSwitch: (tab: Tab) => void;
  onClose: (id: number) => void;
  onAdd: () => void;
}

export default function TabBar({ tabs, activeId, onSwitch, onClose, onAdd }: TabBarProps) {
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
          <div
            key={tab.id}
            onClick={() => handleSwitch(tab)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0 14px",
              height: 38,
              cursor: "pointer",
              background: isActive ? C.white : "transparent",
              borderRadius: 14,
              fontSize: 13,
              fontWeight: isActive ? 700 : 500,
              color: isActive ? C.text : C.muted,
              userSelect: "none",
              whiteSpace: "nowrap",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              border: isActive ? `1px solid ${C.border}` : "1px solid transparent",
              boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.05)" : "none",
            }}
          >
            {isActive && (
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.teal }} />
            )}
            <span style={{ maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis" }}>
              {tab.name}
            </span>
            {tabs.length > 1 && (
              <span 
                onClick={(e) => {
                  e.stopPropagation();
                  onClose(tab.id);
                }}
                style={{ 
                  width: 18, 
                  height: 18, 
                  borderRadius: 6, 
                  background: isActive ? C.bg : "transparent", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  fontSize: 9, 
                  color: C.light_text,
                  marginLeft: 4,
                  transition: "background 0.2s",
                }}
              >
                ✕
              </span>
            )}
          </div>
        );
      })}
      <button
        onClick={onAdd}
        style={{
          width: 34,
          height: 34,
          borderRadius: 12,
          background: C.bg,
          border: `1px solid ${C.border}`,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: C.muted,
          marginLeft: 4,
          transition: "all 0.2s",
        }}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
