"use client";

import { useRouter } from "next/navigation";
import { FaChevronLeft, FaInfoCircle } from "react-icons/fa";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

interface ChatHeaderProps {
  title: string;
  subtitle: string;
}

export const ChatHeader = ({ title, subtitle }: ChatHeaderProps) => {
  const router = useRouter();

  return (
    <header className="flex items-center gap-3 border-b border-border px-4 py-3">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Voltar"
        className="flex h-8 w-8 shrink-0 items-center justify-center text-foreground"
      >
        <FaChevronLeft size={16} />
      </button>

      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <HiOutlineChatBubbleLeftRight size={20} />
      </span>

      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-semibold text-foreground">
          {title}
        </h1>
        <p className="truncate text-xs text-foreground-muted">{subtitle}</p>
      </div>

      <button
        type="button"
        aria-label="Sobre este assistente"
        className="flex h-8 w-8 shrink-0 items-center justify-center text-primary"
      >
        <FaInfoCircle size={18} />
      </button>
    </header>
  );
};

export default ChatHeader;
