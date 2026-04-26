/* src/components/auth/SessionRedirect.tsx */
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

/**
 * Redirects an authenticated user to the dashboard if they land on the homepage
 * or any public route while their session is still valid.
 * Also handles tab focus/visibility changes so that returning users are sent
 * back to the dashboard without a manual click.
 */
export default function SessionRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Helper to perform the redirect when appropriate
  const maybeRedirect = () => {
    if (status === "authenticated" && session) {
      if (window.location.pathname === "/") {
        router.replace("/dashboard/overview");
      }
    }
  };

  useEffect(() => {
    // Initial check on mount (covers page load)
    maybeRedirect();

    // Listen for visibility changes (tab focus/blur)
    const handleVisibility = () => {
      if (!document.hidden) {
        maybeRedirect();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [status, session, router]);

  return null; // This component renders nothing.
}
