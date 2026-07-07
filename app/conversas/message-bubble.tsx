import { useEffect, useRef, useState } from "react";
import { FaPause, FaVolumeUp, FaSpinner } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Message } from "./types";
import { synthesizeSpeech } from "@/app/lib/api";

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoadingSpeech, setIsLoadingSpeech] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  async function handleToggleSpeech() {
    const audio = audioRef.current;
    if (audio && !audio.paused) {
      audio.pause();
      setIsSpeaking(false);
      return;
    }
    if (audio) {
      audio.play();
      setIsSpeaking(true);
      return;
    }

    setIsLoadingSpeech(true);
    try {
      const blob = await synthesizeSpeech(message.content);
      const url = URL.createObjectURL(blob);
      urlRef.current = url;
      const newAudio = new Audio(url);
      newAudio.addEventListener("ended", () => setIsSpeaking(false));
      audioRef.current = newAudio;
      await newAudio.play();
      setIsSpeaking(true);
    } catch {
      // playback unavailable (e.g. TTS provider not configured) — fail silently
    } finally {
      setIsLoadingSpeech(false);
    }
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed break-words ${
          isUser
            ? "bg-nav-active text-white rounded-br-md"
            : "bg-surface-muted text-foreground border border-border rounded-bl-md"
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="markdown-body space-y-2 [&_a]:underline [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4 [&_strong]:font-semibold [&_h1]:font-semibold [&_h2]:font-semibold [&_h3]:font-semibold">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        )}
        <div className="mt-1 flex items-center gap-2">
          <p
            className={`text-[10px] ${
              isUser ? "text-white/60" : "text-foreground-muted"
            }`}
          >
            {message.timestamp.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          {!isUser && message.content && (
            <button
              type="button"
              onClick={handleToggleSpeech}
              disabled={isLoadingSpeech}
              aria-label={isSpeaking ? "Pausar leitura" : "Ouvir mensagem"}
              className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors disabled:opacity-60 ${
                isSpeaking
                  ? "bg-nav-active text-white"
                  : "bg-nav-active/10 text-nav-active hover:bg-nav-active/20"
              }`}
            >
              {isLoadingSpeech ? (
                <FaSpinner size={11} className="animate-spin" />
              ) : isSpeaking ? (
                <FaPause size={11} />
              ) : (
                <FaVolumeUp size={11} />
              )}
              <span>
                {isLoadingSpeech
                  ? "Gerando..."
                  : isSpeaking
                    ? "Pausar"
                    : "Ouvir"}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
