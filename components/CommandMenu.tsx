"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/lib/site";
import { Briefcase, FileText, Home, Mail, Send, User2, Workflow } from "lucide-react";

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "K" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const openFromEvent = () => setOpen(true);
    document.addEventListener("keydown", down);
    window.addEventListener("open-cmdk", openFromEvent as EventListener);
    return () => {
      document.removeEventListener("keydown", down);
      window.removeEventListener("open-cmdk", openFromEvent as EventListener);
    };
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[16vh]"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <Command
        label="Command menu"
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--bg-elev)] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)]"
      >
        <div className="border-b border-white/5 px-4 py-3">
          <Command.Input
            placeholder={`Type a command or search the site...`}
            className="w-full bg-transparent text-sm text-white placeholder:text-[color:var(--ink-dim)] focus:outline-none"
          />
        </div>
        <Command.List className="max-h-[60vh] overflow-y-auto p-2 text-sm">
          <Command.Empty className="p-4 text-[color:var(--ink-dim)]">No results.</Command.Empty>

          <Command.Group heading="Navigate" className="[&_[cmdk-group-heading]]:mono [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2">
            <Item icon={<Home size={14} />} onSelect={() => go("/")}>
              Home
            </Item>
            <Item icon={<Briefcase size={14} />} onSelect={() => go("/work")}>
              Work
            </Item>
            <Item icon={<FileText size={14} />} onSelect={() => go("/services")}>
              Services
            </Item>
            <Item icon={<Workflow size={14} />} onSelect={() => go("/process")}>
              Process
            </Item>
            <Item icon={<User2 size={14} />} onSelect={() => go("/about")}>
              About
            </Item>
            <Item icon={<Mail size={14} />} onSelect={() => go("/contact")}>
              Contact
            </Item>
          </Command.Group>

          <Command.Group heading="Actions" className="[&_[cmdk-group-heading]]:mono [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2">
            <Item icon={<Send size={14} />} onSelect={() => go("/book")}>
              Book a 30-min strategy call
            </Item>
            <Item
              icon={<Mail size={14} />}
              onSelect={() => {
                window.location.href = `mailto:${site.email}?subject=AI%20Consulting%20Inquiry`;
              }}
            >
              Email {site.email}
            </Item>
          </Command.Group>
        </Command.List>
        <div className="flex items-center justify-between border-t border-white/5 px-3 py-2 text-[11px] text-[color:var(--ink-dim)]">
          <span className="mono">⌘K</span>
          <span>Press Esc to close</span>
        </div>
      </Command>
    </div>
  );
}

function Item({
  children,
  onSelect,
  icon,
}: {
  children: React.ReactNode;
  onSelect: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-[color:var(--ink)] aria-selected:bg-white/[0.06] data-[selected=true]:bg-white/[0.06]"
    >
      <span className="text-[color:var(--ink-dim)]">{icon}</span>
      {children}
    </Command.Item>
  );
}
