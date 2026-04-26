import { NavItem } from "@/types/dashboard";

export const navItems: NavItem[] = [
  { id: "overview", label: "Overview",          href: "/dashboard/overview", icon: "Home"         },
  { id: "jobs",     label: "Job Links",        href: "/dashboard/jobs",     icon: "ClipboardList"},
  { id: "resume",   label: "Resume", href: "/dashboard/resume",   icon: "Bookmark"     },
  { id: "prep",     label: "Prep",               href: "/dashboard/prep",     icon: "Clock"        },
  { id: "plans",    label: "Plan",               href: "/dashboard/plans",    icon: "BarChart2"    },
];

export const bottomNavItems: NavItem[] = [
  { id: "settings-ai",      label: "AI Tools",   href: "/dashboard/settings", icon: "Sparkles"  },
  { id: "settings-reports", label: "Reports",    href: "/dashboard/plans",    icon: "BarChart2" },
  { id: "settings-timer",   label: "Timer",      href: "/dashboard/prep",     icon: "Timer"     },
  { id: "settings",         label: "Settings",   href: "/dashboard/settings", icon: "Settings"  },
];
