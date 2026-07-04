"use client";

import { useState } from "react";
import { FaMicrophone } from "react-icons/fa";

interface MessageComposerProps {
  onSend?: (message: string) => void;
}

export const MessageComposer = ({ onSend }: MessageComposerProps) => {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend?.(trimmed);
    setValue("");
  };

  return (
    <div className="flex items-center gap-2 border-t border-border bg-background p-3">
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") handleSend();
        }}
        type="text"
        placeholder="Digite sua mensagem..."
        className="h-11 flex-1 rounded-full border border-border bg-surface px-4 text-sm text-foreground placeholder-foreground-muted outline-none focus:border-primary"
      />
      <button
        type="button"
        onClick={handleSend}
        aria-label="Enviar mensagem por voz ou texto"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90"
      >
        <FaMicrophone size={16} />
      </button>
    </div>
  );
};

export default MessageComposer;
