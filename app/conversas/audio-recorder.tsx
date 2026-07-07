"use client";

import { useMemo } from "react";
import {
  FaMicrophone,
  FaPlay,
  FaPause,
  FaStop,
  FaTrash,
  FaPaperPlane,
} from "react-icons/fa";

export type AudioState = "idle" | "recording" | "preview";

interface AudioRecorderProps {
  state: AudioState;
  duration: number;
  isPlaying: boolean;
  playbackProgress?: number;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onPlayPause: () => void;
  onDelete: () => void;
  onSend: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function Waveform({ active }: { active: boolean }) {
  const bars = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        animDuration: 0.5 + (((i * 7 + 3) % 10) / 10) * 0.5,
        animDelay: i * 0.04,
        baseHeight: 4 + (((i * 13 + 5) % 10) / 10) * 14,
      })),
    [],
  );

  return (
    <div className="flex items-center gap-[2px] h-7 flex-1 justify-center">
      {bars.map((bar, i) => (
        <div
          key={i}
          className="w-[2.5px] rounded-full bg-nav-active origin-center"
          style={{
            height: active ? `${bar.baseHeight}px` : "4px",
            animation: active
              ? `waveform-bar ${bar.animDuration}s ease-in-out ${bar.animDelay}s infinite`
              : "none",
            transition: "height 0.2s ease",
          }}
        />
      ))}
    </div>
  );
}

export function AudioRecorder({
  state,
  duration,
  isPlaying,
  playbackProgress = 0,
  onStartRecording,
  onStopRecording,
  onPlayPause,
  onDelete,
  onSend,
}: AudioRecorderProps) {
  if (state === "idle") {
    return (
      <button
        type="button"
        onClick={onStartRecording}
        className="w-10 h-10 rounded-full bg-nav-active flex items-center justify-center text-white flex-shrink-0 transition-all duration-200 active:scale-90 hover:brightness-110"
        aria-label="Iniciar gravação de áudio"
      >
        <FaMicrophone size={15} />
      </button>
    );
  }

  if (state === "recording") {
    return (
      <div className="flex items-center gap-3 flex-1 min-w-0 pl-2 pr-1">
        <button
          type="button"
          onClick={onStopRecording}
          className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white flex-shrink-0 transition-all duration-200 active:scale-90 hover:bg-red-600"
          aria-label="Parar gravação"
        >
          <FaStop size={13} />
        </button>
        <Waveform active />
        <span className="text-[11px] text-foreground-muted font-mono tabular-nums whitespace-nowrap select-none ml-1">
          {formatTime(duration)}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5 flex-1 min-w-0 pl-1 pr-1">
      <button
        type="button"
        onClick={onPlayPause}
        className="w-9 h-9 rounded-full bg-surface-muted border border-border flex items-center justify-center text-foreground flex-shrink-0 transition-all duration-200 active:scale-90 hover:bg-border"
        aria-label={isPlaying ? "Pausar" : "Reproduzir"}
      >
        {isPlaying ? (
          <FaPause size={12} />
        ) : (
          <FaPlay size={12} className="ml-0.5" />
        )}
      </button>

      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        <div className="flex-1 h-[3px] bg-surface-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-nav-active rounded-full transition-all duration-150"
            style={{ width: `${Math.min(playbackProgress, 1) * 100}%` }}
          />
        </div>
        <span className="text-[10px] text-foreground-muted font-mono tabular-nums whitespace-nowrap select-none">
          {formatTime(duration)}
        </span>
      </div>

      <button
        type="button"
        onClick={onDelete}
        className="w-9 h-9 rounded-full bg-surface-muted border border-border flex items-center justify-center text-foreground-muted hover:text-red-500 hover:border-red-300 flex-shrink-0 transition-all duration-200 active:scale-90"
        aria-label="Excluir gravação"
      >
        <FaTrash size={12} />
      </button>

      <button
        type="button"
        onClick={onSend}
        className="w-9 h-9 rounded-full bg-nav-active flex items-center justify-center text-white flex-shrink-0 transition-all duration-200 active:scale-90 hover:brightness-110"
        aria-label="Enviar áudio"
      >
        <FaPaperPlane size={12} className="-ml-0.5 mt-0.5" />
      </button>
    </div>
  );
}
