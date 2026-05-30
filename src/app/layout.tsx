import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "NEXUS — Universe of AI",
  description: "Where creativity meets intelligence. Immersive digital experiences that push boundaries.",
  icons: {
    icon: "https://picsum.photos/seed/nexus-fav/32/32",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: "12px",
              background: "#1a1a2e",
              border: "1px solid rgba(139,92,246,0.3)",
              boxShadow: "0 4px 24px rgba(139,92,246,0.15)",
              color: "#fff",
              fontFamily: "system-ui, sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}
