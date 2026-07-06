"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { AudioRecorder, type AudioState } from "./audio-recorder";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [audioState, setAudioState] = useState<AudioState>("idle");
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const blobRef = useRef<Blob | null>(null);

  const isRecording = audioState === "recording";
  const isPreview = audioState === "preview";

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
  }, [value]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  function handleStartRecording() {
    setAudioState("recording");
    setDuration(0);
    timerRef.current = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
  }

  function handleStopRecording() {
    stopTimer();
    blobRef.current = new Blob([], { type: "audio/webm" });
    setAudioState("preview");
  }

  function handlePlayPause() {
    setIsPlaying((prev) => !prev);
  }

  function handleDelete() {
    blobRef.current = null;
    setIsPlaying(false);
    setDuration(0);
    setAudioState("idle");
  }

  function handleSendAudio() {
    const blob = blobRef.current;
    blobRef.current = null;
    setIsPlaying(false);
    setDuration(0);
    setAudioState("idle");
    console.log("Áudio gravado (mock):", blob);
  }

  if (isPreview) {
    return (
      <form onSubmit={handleSubmit} className="pb-4">
        <div className="relative flex items-center bg-surface rounded-[2rem] p-1.5 border border-border shadow-sm">
          <AudioRecorder
            state={audioState}
            duration={duration}
            isPlaying={isPlaying}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
            onPlayPause={handlePlayPause}
            onDelete={handleDelete}
            onSend={handleSendAudio}
          />
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="pb-4">
      <div className="relative flex items-center bg-surface rounded-[2rem] p-1.5 border border-border shadow-sm">
        {isRecording ? (
          <AudioRecorder
            state={audioState}
            duration={duration}
            isPlaying={isPlaying}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
            onPlayPause={handlePlayPause}
            onDelete={handleDelete}
            onSend={handleSendAudio}
          />
        ) : (
          <>
            <textarea
              ref={textareaRef}
              rows={1}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pergunte sobre saúde, sintomas ou postos de atendimento"
              disabled={disabled}
              className="flex-1 bg-transparent border-none outline-none text-[12px] pl-4 pr-2 py-3 text-foreground placeholder:text-foreground-muted resize-none overflow-y-auto leading-relaxed disabled:opacity-50"
            />
            <div className="h-6 w-px bg-border mx-2 self-center" />
            {value.trim() ? (
              <button
                type="submit"
                disabled={disabled}
                className="w-10 h-10 rounded-full bg-nav-active flex items-center justify-center text-white flex-shrink-0 transition-all duration-200 active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110"
              >
                <FaPaperPlane size={14} className="-ml-0.5 mt-0.5" />
              </button>
            ) : (
              <AudioRecorder
                state={audioState}
                duration={duration}
                isPlaying={isPlaying}
                onStartRecording={handleStartRecording}
                onStopRecording={handleStopRecording}
                onPlayPause={handlePlayPause}
                onDelete={handleDelete}
                onSend={handleSendAudio}
              />
            )}
          </>
        )}
      </div>
    </form>
  );
}
