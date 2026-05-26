import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "কবিতার আঙিনা — বাংলা সৃজনশীল লেখালেখির প্ল্যাটফর্ম",
  description: "কবিতা, গল্প, ডায়েরি লিখুন এবং শেয়ার করুন। বাংলায় সৃজনশীল লেখালেখির একটি অনন্য প্ল্যাটফর্ম।",
  icons: {
    icon: "https://picsum.photos/seed/bangla-fav/32/32",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className="antialiased min-h-screen">
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: "12px",
              background: "#FFFDF7",
              border: "1px solid #E8DCC8",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              fontFamily: "'Hind Siliguri', sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}
