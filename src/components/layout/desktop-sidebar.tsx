"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PenSquare, MessageCircle, User, Settings, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const mainNav = [
  { href: "/", label: "হোম", icon: Home },
  { href: "/explore", label: "অনুসন্ধান", icon: Search },
  { href: "/write", label: "লিখুন", icon: PenSquare },
  { href: "/messages", label: "বার্তা", icon: MessageCircle },
  { href: "/settings", label: "প্রোফাইল", icon: User },
  { href: "/settings", label: "সেটিংস", icon: Settings },
  { href: "/admin", label: "অ্যাডমিন", icon: Shield },
];

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white border-r border-border fixed left-0 top-0 z-40">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
            <PenSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground leading-tight">
              কবিতার আঙিনা
            </h1>
            <p className="text-[10px] text-muted-foreground">
              সৃজনশীল লেখালেখির প্ল্যাটফর্ম
            </p>
          </div>
        </Link>
      </div>
      <Separator />
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {mainNav.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="w-4.5 h-4.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          কবিতার আঙিনা &copy; ২০২৬
        </p>
      </div>
    </aside>
  );
}
