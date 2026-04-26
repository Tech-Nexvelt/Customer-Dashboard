import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import SessionProvider from "@/components/providers/SessionProvider";
import { Toaster } from "react-hot-toast";
import SessionRedirect from "@/components/auth/SessionRedirect";

export const viewport: Viewport = {
  themeColor: "#25eb71ff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Nexvelt | Done-For-You Job Search",
  description: "Automate your job search and internal funnel with Nexvelt.",
  icons: {
    icon: "/NV-logo-short.png",
    apple: "/NV-logo-short.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning data-scroll-behavior="smooth">
      <body className="antialiased" style={{ margin: 0, padding: 0 }}>
        <SessionProvider>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#0F172A',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '12px',
              },
              success: {
                iconTheme: {
                  primary: '#2DD4A7',
                  secondary: '#fff',
                },
              },
            }}
          />
          <SessionRedirect />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
