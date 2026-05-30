import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Zahidul Islam — AI & Machine Learning Developer",
  description:
    "Portfolio of Zahidul Islam — Building intelligent systems with deep learning, NLP, and computer vision.",
  icons: {
    icon: "/logo.svg",
  },
  metadataBase: new URL("https://universe-of-ai.github.io/ai-ml-developer-portfolio"),
  openGraph: {
    title: "Zahidul Islam — AI & Machine Learning Developer",
    description:
      "Portfolio of Zahidul Islam — Building intelligent systems with deep learning, NLP, and computer vision.",
    type: "website",
    locale: "en_US",
    url: "https://universe-of-ai.github.io/ai-ml-developer-portfolio",
    siteName: "Zahidul Islam Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zahidul Islam — AI & ML Developer",
    description:
      "Building intelligent systems with deep learning, NLP, and computer vision.",
  },
  other: {
    "theme-color": "#0A0A0F",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: "12px",
              fontFamily: "system-ui, sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}
