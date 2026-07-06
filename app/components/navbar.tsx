"use client";

import { TbMapPin, TbMessageCircle, TbShield } from "react-icons/tb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/unidades", label: "Unidades", icon: TbMapPin },
  { href: "/conversas", label: "Conversas", icon: TbMessageCircle },
  { href: "/mais", label: "Sobre", icon: TbShield },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-nav-bg pb-[env(safe-area-inset-bottom)]"
      aria-label="Navegação principal"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);

          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={`flex flex-col items-center gap-1 py-2 px-3 text-xs rounded-[18px] ${
                  isActive ? "bg-nav-active-pill" : ""
                }`}
              >
                <Icon
                  size={22}
                  className={isActive ? "text-nav-active" : "text-nav-inactive"}
                />
                <span
                  className={
                    isActive
                      ? "font-medium text-nav-active"
                      : "text-nav-inactive"
                  }
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
