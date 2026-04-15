"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Mail, Lock, User, Eye, EyeOff, Briefcase, MapPin, BarChart, Clock, ChevronRight, Globe } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { AuthInput, AuthButton } from "@/components/ui/AuthComponents";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [role, setRole] = useState("");
  const [country, setCountry] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [workType, setWorkType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const domainOptions = [
    "software_engineering", "ai_ml_data", "data_analytics", "data_engineering", 
    "cloud_devops", "cyber_security", "finance_compliance", "healthcare_lifescience", 
    "core_engineering", "industrial_automation", "enterprise_tools", "agriculture"
  ];

  const roles = [
    "AI/ML Engineer", "Data Scientist", "Data Engineer", "Data Analyst", "Big Data Engineer",
    "Full Stack Developer", "Frontend Engineer", "Backend Engineer", "Cloud Engineer", "DevOps Engineer",
    "Cyber Security Engineer", "Business Analyst", "Financial Analyst", "Electrical Engineer", "Chemical Engineer",
    "Bioinformatics", "Embedded Software Engineer", "ERP Specialist", "CRM Specialist"
  ];

  const experienceLevels = ["Internship", "Entry Level", "Mid Level", "Senior"];
  const workTypes = ["Full-time", "Remote", "Hybrid"];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!domain || !role || !experienceLevel || !workType || !country) {
      setError("Please fill in all professional details.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password: password.trim(),
        options: { 
          data: { 
            full_name: fullName, 
            domain,
            role,
            country,
            experience_level: experienceLevel,
            work_type: workType
          } 
        },
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        const { error: insertError } = await supabase.from('clients').upsert([{ 
          id: data.user.id, 
          name: fullName, 
          email: email.trim(), 
          domain,
          role,
          country,
          experience: experienceLevel,
          work_type: workType
        }], { onConflict: 'email' });
        
        if (insertError) {
          console.error("Database Upsert Error:", insertError);
          throw new Error(`Profile creation failed: ${insertError.message}`);
        }
        
        router.push("/login?message=Check your email to verify!");
      }
    } catch (err: any) {
      console.error("Signup Error:", err);
      setError(err.message || "An error occurred during signup.");
    } finally {
      setLoading(false);
    }
  };

  const CustomSelect = ({ label, icon, value, onChange, options, placeholder }: any) => {
    const [isOpen, setIsOpen] = React.useState(false);
    
    const formatLabel = (str: string) => {
      if (!str) return "";
      return str
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    };
    
    return (
      <div className="flex flex-col gap-2 relative">
        <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">{label}</label>
        <div className="relative">
          <div 
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full pl-11 pr-5 py-4 bg-slate-50 border ${isOpen ? 'border-[#2DD4A7] ring-4 ring-[#2DD4A7]/5 bg-white' : 'border-slate-200'} rounded-2xl text-sm font-medium outline-none transition-all cursor-pointer flex items-center justify-between text-[#0F172A]`}
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              {icon}
            </div>
            <span className={!value ? "text-slate-400" : ""}>{value ? formatLabel(value) : placeholder}</span>
            <ChevronRight size={14} className={`transition-transform text-slate-300 ${isOpen ? '-rotate-90' : 'rotate-90'}`} />
          </div>
          
          {isOpen && (
            <>
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 shadow-2xl rounded-2xl overflow-hidden z-[100] animate-in fade-in zoom-in duration-200">
                <div className="max-h-60 overflow-y-auto p-2 space-y-1">
                  {options.map((opt: string) => (
                    <div 
                      key={opt}
                      onClick={() => {
                        onChange(opt);
                        setIsOpen(false);
                      }}
                      className={`px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-colors ${value === opt ? 'bg-[#2DD4A7]/10 text-[#2DD4A7]' : 'text-slate-600 hover:bg-slate-50 hover:text-[#0F172A]'}`}
                    >
                      {formatLabel(opt)}
                    </div>
                  ))}
                </div>
              </div>
              <div className="fixed inset-0 z-[90]" onClick={() => setIsOpen(false)}></div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 pt-20 selection:bg-[#2DD4A7]/10">
      <div className="w-full max-w-[440px]">
        <div className="flex flex-col items-center mb-8">
          <Link href="/">
            <img src="/NV-logo-short.png" alt="Nexvelt Logo" className="w-14 h-14 mb-4 drop-shadow-sm cursor-pointer hover:opacity-80 transition-opacity" />
          </Link>
          <h1 className="text-3xl font-black text-[#0F172A] tracking-tighter uppercase italic">Nexvelt</h1>
          <p className="text-slate-400 text-[13px] font-medium mt-1">Join the network</p>
        </div>

        <div className="bg-white rounded-[45px] shadow-2xl shadow-slate-200/50 p-10 md:p-12 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#2DD4A7]/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <form onSubmit={handleSignup} className="flex flex-col gap-6 relative z-10">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-[11px] font-bold rounded-2xl text-center">
                {error}
              </div>
            )}

            <AuthInput label="Full Name" type="text" placeholder="FULL_NAME" value={fullName} onChange={(e: any) => setFullName(e.target.value)} icon={<User size={18} />} required />
            <AuthInput label="Email Address" type="email" placeholder="EMAIL_ADDRESS" value={email} onChange={(e: any) => setEmail(e.target.value)} icon={<Mail size={18} />} required />
            
            <CustomSelect 
              label="Professional Domain" 
              icon={<Globe size={18} />} 
              value={domain} 
              onChange={setDomain} 
              options={domainOptions} 
              placeholder="Select your industry" 
            />

            <CustomSelect 
              label="Target Role" 
              icon={<Briefcase size={18} />} 
              value={role} 
              onChange={setRole} 
              options={roles} 
              placeholder="Select your role" 
            />

            <AuthInput label="Country" type="text" placeholder="COUNTRY" value={country} onChange={(e: any) => setCountry(e.target.value)} icon={<MapPin size={18} />} required />

            <div className="grid grid-cols-2 gap-4">
              <CustomSelect 
                label="Experience" 
                icon={<BarChart size={18} />} 
                value={experienceLevel} 
                onChange={setExperienceLevel} 
                options={experienceLevels} 
                placeholder="Level" 
              />
              <CustomSelect 
                label="Work Type" 
                icon={<Clock size={18} />} 
                value={workType} 
                onChange={setWorkType} 
                options={workTypes} 
                placeholder="Type" 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2DD4A7] transition-colors"><Lock size={18} /></div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium outline-none transition-all focus:bg-white focus:border-[#2DD4A7] focus:ring-4 focus:ring-[#2DD4A7]/5"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#2DD4A7]">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">Confirm Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2DD4A7] transition-colors"><Lock size={18} /></div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium outline-none transition-all focus:bg-white focus:border-[#2DD4A7] focus:ring-4 focus:ring-[#2DD4A7]/5"
                  required
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#2DD4A7]">
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <AuthButton type="submit" loading={loading} variant="teal">Create Account</AuthButton>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-50 text-center relative z-10">
            <p className="text-slate-400 text-[13px] font-medium">Already have an account? <Link href="/login" className="text-[#2DD4A7] hover:text-[#25c99e] font-bold hover:underline transition-colors">Log in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
