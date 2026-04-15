import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  themeColor: "#25eb71ff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Nexvelt | Modern Management",
  description: "Next-gen management platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="antialiased" style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
