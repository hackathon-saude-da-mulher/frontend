"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { AudioRecorder, type AudioState } from "./audio-recorder";
import { transcribeAudio } from "@/app/lib/api";

function pickMimeType(): string {
  const candidates = [
    "audio/ogg;codecs=opus",
    "audio/ogg",
    "audio/webm;codecs=opus",
    "audio/webm",
  ];
  for (const type of candidates) {
    if (
      typeof MediaRecorder !== "undefined" &&
      MediaRecorder.isTypeSupported(type)
    ) {
      return type;
    }
  }
  return "";
}

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [audioState, setAudioState] = useState<AudioState>("idle");
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const blobRef = useRef<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

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

  const isBusy = disabled || isTranscribing;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || isBusy) return;
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

  async function handleStartRecording() {
    setAudioError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      streamRef.current = stream;
      chunksRef.current = [];

      const mimeType = pickMimeType();
      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.start();
      setAudioState("recording");
      setDuration(0);
      timerRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } catch {
      setAudioError("Não foi possível acessar o microfone.");
    }
  }

  function handleStopRecording() {
    stopTimer();
    const recorder = mediaRecorderRef.current;
    if (!recorder) {
      setAudioState("idle");
      return;
    }

    recorder.onstop = () => {
      blobRef.current = new Blob(chunksRef.current, {
        type: recorder.mimeType || "audio/webm",
      });
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      setAudioState("preview");
    };
    recorder.stop();
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

  async function handleSendAudio() {
    const blob = blobRef.current;
    blobRef.current = null;
    setIsPlaying(false);
    setDuration(0);
    setAudioState("idle");
    if (!blob) return;

    setIsTranscribing(true);
    setAudioError(null);
    try {
      const text = await transcribeAudio(blob);
      if (text.trim()) onSend(text.trim());
      else setAudioError("Não entendi o áudio. Tente novamente.");
    } catch {
      setAudioError("Não foi possível transcrever o áudio.");
    } finally {
      setIsTranscribing(false);
    }
  }

  if (isPreview) {
    return (
      <form onSubmit={handleSubmit} className="pb-4">
        {audioError && (
          <p className="mb-2 text-xs text-red-500">{audioError}</p>
        )}
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
      {audioError && <p className="mb-2 text-xs text-red-500">{audioError}</p>}
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
              disabled={isBusy}
              className="flex-1 bg-transparent border-none outline-none text-[12px] pl-4 pr-2 py-3 text-foreground placeholder:text-foreground-muted resize-none overflow-y-auto leading-relaxed disabled:opacity-50"
            />
            <div className="h-6 w-px bg-border mx-2 self-center" />
            {value.trim() ? (
              <button
                type="submit"
                disabled={isBusy}
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
