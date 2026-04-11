"use client";
import React from "react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tab } from "@/types/dashboard";

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
        height: 54,
        background: "#F0F0EC",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #EBEBEB",
        overflowX: "auto",
        flexShrink: 0,
        scrollbarWidth: "none",
        paddingLeft: 12,
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
              padding: "0 12px 0 10px",
              height: 38,
              cursor: "pointer",
              background: isActive ? "#FFFFFF" : "rgba(255,255,255,0.4)",
              borderRadius: 12,
              fontSize: 13,
              fontWeight: isActive ? 600 : 500,
              color: isActive ? "#1A1A1A" : "#6B7280",
              userSelect: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
              position: "relative",
              transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: isActive ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
            }}
          >
            <span style={{ maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis" }}>
              {tab.name}
            </span>
            {tabs.length > 1 && (
              <span 
                onClick={(e) => {
                  e.stopPropagation();
                  onClose(tab.id);
                }}
                style={{ 
                  width: 14, 
                  height: 14, 
                  borderRadius: "50%", 
                  background: isActive ? "#F0F0EC" : "rgba(0,0,0,0.05)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  fontSize: 8, 
                  color: "#9CA3AF",
                  marginLeft: 4,
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
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.5)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#9CA3AF",
          flexShrink: 0,
          marginLeft: 4,
          transition: "background 0.2s",
        }}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
