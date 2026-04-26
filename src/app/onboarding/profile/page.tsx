"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Briefcase, MapPin, BarChart, Clock, ChevronRight, Globe, CheckCircle2, Phone, Search } from "lucide-react";
import { AuthInput, AuthButton } from "@/components/ui/AuthComponents";
import { useUser } from "@/features/auth/hooks/useUser";
import { toast } from "react-hot-toast";

// Country data
const countries = [
  { name: "United States", code: "US", flag: "🇺🇸", dialCode: "+1" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧", dialCode: "+44" },
  { name: "India", code: "IN", flag: "🇮🇳", dialCode: "+91" },
  { name: "Canada", code: "CA", flag: "🇨🇦", dialCode: "+1" },
  { name: "Australia", code: "AU", flag: "🇦🇺", dialCode: "+61" },
  { name: "Germany", code: "DE", flag: "🇩🇪", dialCode: "+49" },
  { name: "France", code: "FR", flag: "🇫🇷", dialCode: "+33" },
  { name: "Singapore", code: "SG", flag: "🇸🇬", dialCode: "+65" },
  { name: "United Arab Emirates", code: "AE", flag: "🇦🇪", dialCode: "+971" },
  { name: "Saudi Arabia", code: "SA", flag: "🇸🇦", dialCode: "+966" },
  { name: "Netherlands", code: "NL", flag: "🇳🇱", dialCode: "+31" },
  { name: "Ireland", code: "IE", flag: "🇮🇪", dialCode: "+353" },
  { name: "New Zealand", code: "NZ", flag: "🇳🇿", dialCode: "+64" },
  { name: "South Africa", code: "ZA", flag: "🇿🇦", dialCode: "+27" },
  { name: "Spain", code: "ES", flag: "🇪🇸", dialCode: "+34" },
  { name: "Italy", code: "IT", flag: "🇮🇹", dialCode: "+39" },
  { name: "Brazil", code: "BR", flag: "🇧🇷", dialCode: "+55" },
  { name: "Mexico", code: "MX", flag: "🇲🇽", dialCode: "+52" },
  { name: "Japan", code: "JP", flag: "🇯🇵", dialCode: "+81" },
];

export default function ProfileCompletionPage() {
  const [domain, setDomain] = useState("");
  const [role, setRole] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [workType, setWorkType] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { updateProfile } = useUser();

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

  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const success = await updateProfile({
      domain,
      targetRole: role,
      countryName: selectedCountry.name,
      countryCode: selectedCountry.code,
      dialCode: selectedCountry.dialCode,
      phone: mobileNumber,
      experienceLevel,
      workType,
      onboardingStatus: 'completed'
    });

    if (success) {
      toast.success("Profile completed! Welcome to Nexvelt.");
      router.push("/dashboard/overview");
    } else {
      setLoading(false);
      toast.error("Failed to update profile. Please try again.");
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

  const CountrySelect = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredCountries = countries.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
      <div className="flex flex-col gap-2 relative" ref={dropdownRef}>
        <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">Country</label>
        <div className="relative">
          <div 
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full pl-11 pr-5 py-4 bg-slate-50 border ${isOpen ? 'border-[#2DD4A7] ring-4 ring-[#2DD4A7]/5 bg-white' : 'border-slate-200'} rounded-2xl text-sm font-medium outline-none transition-all cursor-pointer flex items-center justify-between text-[#0F172A]`}
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <MapPin size={18} />
            </div>
            <span className="flex items-center gap-2">
               <span className="text-xl leading-none">{selectedCountry.flag}</span>
               <span>{selectedCountry.name} ({selectedCountry.dialCode})</span>
            </span>
            <ChevronRight size={14} className={`transition-transform text-slate-300 ${isOpen ? '-rotate-90' : 'rotate-90'}`} />
          </div>
          
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 shadow-2xl rounded-2xl overflow-hidden z-[100] animate-in fade-in zoom-in duration-200">
              <div className="p-2 border-b border-slate-50 flex items-center gap-2 sticky top-0 bg-white">
                 <Search size={14} className="text-slate-400 ml-2" />
                 <input 
                   type="text" 
                   autoFocus
                   placeholder="Search country..." 
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
                   className="w-full text-sm py-2 px-1 outline-none font-medium placeholder:text-slate-300"
                 />
              </div>
              <div className="max-h-60 overflow-y-auto p-2 space-y-1">
                {filteredCountries.map((c) => (
                  <div 
                    key={c.code}
                    onClick={() => {
                      setSelectedCountry(c);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={`px-4 py-3 rounded-md text-sm font-medium cursor-pointer transition-colors flex items-center gap-3 ${selectedCountry.code === c.code ? 'bg-blue-100 text-blue-900' : 'text-slate-700 hover:bg-slate-100'}`}
                  >
                    <span className="text-xl leading-none">{c.flag}</span>
                    <span>{c.name} ({c.dialCode})</span>
                  </div>
                ))}
                {filteredCountries.length === 0 && (
                   <div className="px-4 py-3 text-sm text-slate-400 text-center">No countries found</div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 selection:bg-[#2DD4A7]/10">
      <div className="w-full max-w-[500px]">
        <div className="flex flex-col items-center mb-4">
          <Link href="/">
            <img src="/NV-logo-short.png" alt="Nexvelt Logo" className="w-12 h-12 mb-2 drop-shadow-sm cursor-pointer hover:opacity-80 transition-opacity" />
          </Link>
          <h1 className="text-2xl font-black text-[#0F172A] tracking-tighter uppercase italic">Almost Done!</h1>
          <p className="text-slate-400 text-[12px] font-medium mt-1">Complete your professional profile</p>
        </div>

        <div className="bg-white rounded-[35px] shadow-2xl shadow-slate-200/50 p-6 md:p-8 border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#2DD4A7]/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <form onSubmit={handleCompleteProfile} className="flex flex-col gap-4 relative z-10">
            
            <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl mb-1">
               <CheckCircle2 className="text-emerald-500 shrink-0" size={18} />
               <p className="text-[11px] font-medium text-emerald-700">Account verified successfully. Just a few details.</p>
            </div>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <CountrySelect />

               <div className="flex flex-col gap-2 relative">
                 <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">Mobile Number</label>
                 <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl focus-within:bg-white focus-within:border-[#2DD4A7] focus-within:ring-4 focus-within:ring-[#2DD4A7]/5 transition-all">
                    <div className="pl-4 pr-2 text-slate-400 border-r border-slate-200 text-sm font-medium flex items-center gap-2">
                       <span className="text-lg leading-none">{selectedCountry.flag}</span>
                       {selectedCountry.dialCode}
                    </div>
                    <input 
                      type="tel"
                      placeholder="000 000 0000"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full bg-transparent px-3 py-4 outline-none text-sm font-medium placeholder:text-slate-300"
                      required
                    />
                 </div>
               </div>
            </div>

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

            <div className="pt-2">
              <AuthButton type="submit" loading={loading} variant="teal" disabled={!domain || !role || !mobileNumber || !experienceLevel || !workType}>
                Complete Profile & Go to Dashboard
              </AuthButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
