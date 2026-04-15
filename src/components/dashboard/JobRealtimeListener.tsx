"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useDashboard } from "@/lib/dashboard/dashboardContext";

export default function JobRealtimeListener() {
  const { setUnreadJobCount, setTotalJobCount } = useDashboard();

  useEffect(() => {
    // 1. Initial count
    const fetchInitial = async () => {
      // Total count
      const { count: total, error: totalErr } = await supabase
        .from("jobs")
        .select("*", { count: "exact", head: true });
      
      if (!totalErr && total !== null) {
        setTotalJobCount(total);
      }

      // Recent count (unread)
      const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
      const { count: recent, error: recentErr } = await supabase
        .from("jobs")
        .select("*", { count: "exact", head: true })
        .gt("created_at", oneHourAgo);
      
      if (!recentErr && recent !== null) {
        setUnreadJobCount(recent);
      }
    };

    fetchInitial();

    // 2. Realtime subscription
    const channel = supabase
      .channel("realtime_jobs")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "jobs" },
        (payload) => {
          console.log("New job found!", payload);
          setUnreadJobCount((prev) => prev + 1);
          setTotalJobCount((prev) => prev + 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [setUnreadJobCount, setTotalJobCount]);

  return null; // This component doesn't render anything
}
