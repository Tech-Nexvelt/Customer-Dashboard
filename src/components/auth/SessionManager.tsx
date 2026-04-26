"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Clock, LogOut, ShieldAlert } from "lucide-react";

export default function SessionManager() {
  const { data: session, status } = useSession();
  const [warningShown, setWarningShown] = useState(false);

  const handleAutoLogout = async () => {
    toast.error("Session expired. Logging out for security.", {
      icon: <ShieldAlert size={18} />,
      duration: 5000,
    });
    
    // Give user a moment to see the error toast
    setTimeout(async () => {
      await signOut({ callbackUrl: "/" });
    }, 2000);
  };

  const showExpiryWarning = (remainingMs: number) => {
    const minutes = Math.floor(remainingMs / 60000);
    const seconds = Math.floor((remainingMs % 60000) / 1000);

    toast((t) => (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 border border-amber-100 shadow-sm">
            <Clock size={20} className="animate-pulse" />
          </div>
          <div>
            <p className="text-[13px] font-black text-[#0F172A] tracking-tight uppercase italic">Security Alert</p>
            <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Session Expiring</p>
          </div>
        </div>
        
        <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
          Your secure session will expire in about <span className="font-bold text-[#0F172A]">{minutes}m {seconds}s</span> for your protection.
        </p>

        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              // Refreshing the page is the simplest way to renew session in NextAuth
              window.location.reload();
            }}
            className="flex-1 py-2.5 bg-[#2DD4A7] text-[#0F172A] text-[10px] font-black uppercase tracking-[0.1em] rounded-xl hover:opacity-90 transition-all shadow-md shadow-emerald-100"
          >
            Extend Session
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              handleAutoLogout();
            }}
            className="flex-1 py-2.5 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-[0.1em] rounded-xl hover:bg-slate-200 transition-all"
          >
            Log Out Now
          </button>
        </div>
      </div>
    ), {
      duration: 15000,
      position: "bottom-right",
      style: {
        borderRadius: '24px',
        background: '#fff',
        padding: '20px',
        minWidth: '320px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        border: '1px solid #fef3c7'
      },
    });
  };

  useEffect(() => {
    if (status === "authenticated" && session?.expires) {
      const expiryTime = new Date(session.expires).getTime();
      const currentTime = new Date().getTime();
      const timeRemaining = expiryTime - currentTime;

      // Check every 30 seconds
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const remaining = expiryTime - now;

        // If less than 2 minutes remaining and warning not shown
        if (remaining > 0 && remaining < 120000 && !warningShown) {
          showExpiryWarning(remaining);
          setWarningShown(true);
        }

        // If expired
        if (remaining <= 0) {
          handleAutoLogout();
          clearInterval(interval);
        }
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [session, status, warningShown]);

  return null;
}
