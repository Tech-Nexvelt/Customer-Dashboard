import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { AuthProvider } from "@/lib/auth/authContext";

export const viewport: Viewport = {
  themeColor: "#2DD4A7",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "DevSphere | AI-Powered Management",
  description: "Next gen school and career management platform, powered by intelligent automation.",
  keywords: ["DevSphere", "AI career search", "job application service", "corporate recruitment"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased" style={{ margin: 0, padding: 0 }}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
