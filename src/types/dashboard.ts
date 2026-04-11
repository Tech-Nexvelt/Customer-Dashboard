import { LucideIcon } from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

export interface Tab {
  id: number;
  name: string;
  initials: string;
  color: string;
  active: boolean;
  href: string;
}

export interface StatCardData {
  emoji: string;
  iconBg: string;
  title: string;
  manage: string;
  label: string;
  value: string;
  barColor: string;
  barPercent: number;
  href: string;
}

export interface AssignmentCardData {
  count: number;
  label: string;
  Icon: LucideIcon;
  iconColor: string;
  bg: string;
  href: string;
}

export interface EventData {
  title: string;
  day: string;
  month: string;
  tag: string;
  tagType: "public" | "private";
  barColor: string;
  daysLeft: number;
  barPercent: number;
}
