import { NavItem } from "@/types/dashboard";

export const navItems: NavItem[] = [
  { id: "overview", label: "Overview",          href: "/dashboard/overview", icon: "Home"         },
  { id: "prep",     label: "Schedule / Prep",   href: "/dashboard/prep",     icon: "Clock"        },
  { id: "jobs",     label: "Assignments",        href: "/dashboard/jobs",     icon: "ClipboardList"},
  { id: "resume",   label: "Resume & Portfolio", href: "/dashboard/resume",   icon: "Bookmark"     },
  { id: "chat",     label: "Messages",           href: "/dashboard/chat",     icon: "MessageCircle", badge: 2 },
  { id: "plans",    label: "Analytics / Plans",  href: "/dashboard/plans",    icon: "BarChart2"    },
];

export const bottomNavItems: NavItem[] = [
  { id: "settings-ai",      label: "AI Tools",   href: "/dashboard/settings", icon: "Sparkles"  },
  { id: "settings-reports", label: "Reports",    href: "/dashboard/plans",    icon: "BarChart2" },
  { id: "settings-timer",   label: "Timer",      href: "/dashboard/prep",     icon: "Timer"     },
  { id: "settings",         label: "Settings",   href: "/dashboard/settings", icon: "Settings"  },
];
