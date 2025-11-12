"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoNotifications, IoSettings, IoPerson } from "react-icons/io5";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/transactions", label: "Transactions" },
  { href: "/insights", label: "Insights" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NavLinks = ({ vertical = false }) => (
    <nav
      className={`${
        vertical
          ? "flex flex-col gap-4"
          : "hidden md:flex items-center gap-8"
      } text-[16px] lg:text-[17px]`}
    >
      {links.map(({ href, label }) => {
        const active =
          pathname === href || (href !== "/" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={`pb-1 transition-colors ${
              active
                ? "text-[#8A2BE2] font-semibold border-b-2"
                : "text-[#5f647b] hover:text-[#8A2BE2]"
            }`}
            style={active ? { borderColor: "#8A2BE2" } : {}}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <header className="w-full bg-white/95 backdrop-blur border-b border-gray-100 sticky top-0 z-40">
      <div className="relative max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            {/* Increased logo size */}
            <Image
              src="/images/logo2.png"
              alt="Monievue"
              width={190}
              height={58}
              priority
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {/* Center nav (desktop) — absolutely centered */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <NavLinks />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Notifications Link */}
          <Link
            href="/notifications"
            aria-label="Notifications"
            className="p-2 rounded hover:bg-gray-50 transition-colors"
            title="Notifications"
          >
            <IoNotifications size={24} className="text-[#8A2BE2]" />
          </Link>

          {/* Settings Link */}
          <Link
            href="/settings"
            aria-label="Settings"
            className="p-2 rounded hover:bg-gray-50 transition-colors"
            title="Settings"
          >
            <IoSettings size={24} className="text-[#8A2BE2]" />
          </Link>

          {/* User pill with icon */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm text-[#1e1e2f]  font-bold">VOJI</span>
            <div className="w-8 h-8 rounded-full border-2 border-[#8A2BE2] flex items-center justify-center">
              <IoPerson className="text-[#8A2BE2]" size={18} />
            </div>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded hover:bg-gray-50 transition-colors"
            aria-label="Open menu"
          >
            <div className="w-6 h-0.5 bg-[#1e1e2f] mb-1" />
            <div className="w-6 h-0.5 bg-[#1e1e2f] mb-1" />
            <div className="w-6 h-0.5 bg-[#1e1e2f]" />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <NavLinks vertical />
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border-2 border-[#8A2BE2] flex items-center justify-center">
                  <IoPerson className="text-[#8A2BE2]" size={18} />
                </div>
                <span className="text-sm text-[#1e1e2f] font-medium">VOJI</span>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/notifications"
                  onClick={() => setOpen(false)}
                  className="p-1 rounded hover:bg-gray-50 transition-colors"
                >
                  <IoNotifications size={22} className="text-[#8A2BE2]" />
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setOpen(false)}
                  className="p-1 rounded hover:bg-gray-50 transition-colors"
                >
                  <IoSettings size={22} className="text-[#8A2BE2]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
