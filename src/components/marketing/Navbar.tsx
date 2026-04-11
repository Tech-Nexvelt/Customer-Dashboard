"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo — matches login/signup "D badge" style */}
        <Link href="/" className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#2DD4A7] flex items-center justify-center text-white font-black text-sm">D</span>
          <span className="text-xl font-black tracking-tight text-[#111827]">DevSphere</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827] transition-colors">Features</Link>
          <Link href="#pricing" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827] transition-colors">Pricing</Link>
          <Link href="#how-it-works" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827] transition-colors">How it works</Link>
        </div>

        {/* Auth btns */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block text-sm font-bold text-[#111827] hover:text-[#2DD4A7] transition-all">Log in</Link>
          <Link
            href="/signup"
            className="bg-[#2DD4A7] text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-all flex items-center gap-1.5 shadow-sm shadow-[#2DD4A7]/20"
          >
            Get started <ChevronRight size={15} />
          </Link>
          <button
            className="md:hidden p-2 text-[#111827]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E5E7EB] py-5 px-6 flex flex-col gap-4">
          <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-[#374151] hover:text-[#111827]">Features</Link>
          <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-[#374151] hover:text-[#111827]">Pricing</Link>
          <Link href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-[#374151] hover:text-[#111827]">How it works</Link>
          <div className="border-t border-[#E5E7EB] pt-4 flex flex-col gap-3">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-[#111827] text-center py-2.5 rounded-xl border border-[#E5E7EB] hover:bg-[#F9FAFB]">Log in</Link>
            <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-white bg-[#2DD4A7] text-center py-2.5 rounded-xl hover:opacity-90">Get started</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
