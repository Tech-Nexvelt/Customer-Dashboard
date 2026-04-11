export const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 49,
    color: "#6B7A99",
    features: [
      "ATS Resume (1 version)",
      "LinkedIn Optimization",
      "Job Tracker Access",
      "Email Support",
    ],
    missing: [
      "Portfolio Building",
      "Job Automation",
      "Mock Interviews",
      "Internship Access",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 99,
    color: "#00C896",
    active: true, // Currently active plan
    features: [
      "ATS Resume (3 versions)",
      "Portfolio Website",
      "Job Automation (100/mo)",
      "LinkedIn + GitHub Optimization",
      "10 Mock Interviews",
      "Priority Support",
    ],
    missing: ["Internship Access"],
  },
  {
    id: "premium",
    name: "Premium",
    price: 199,
    color: "#8B5CF6",
    features: [
      "Unlimited Resume Versions",
      "Full Portfolio Suite",
      "Unlimited Job Automation",
      "All Optimizations",
      "Unlimited Mock Interviews",
      "Internship Access",
      "Dedicated Advisor",
      "Placement Guarantee",
    ],
    missing: [],
  },
];
