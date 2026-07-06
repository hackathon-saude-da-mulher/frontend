"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Message } from "./types";
import { wsUrl } from "@/app/lib/config";
import { useSession } from "@/app/lib/session-context";

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

type ServerEvent =
  | { type: "chunk"; content: string }
  | { type: "done" }
  | { type: "error"; message: string };

export function useChat() {
  const { sessionId } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const assistantIdRef = useRef<string | null>(null);

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const ensureSocket = useCallback((): Promise<WebSocket> => {
    return new Promise((resolve, reject) => {
      if (!sessionId) {
        reject(new Error("Sessão não iniciada"));
        return;
      }

      const existing = socketRef.current;
      if (existing && existing.readyState === WebSocket.OPEN) {
        resolve(existing);
        return;
      }

      const socket = new WebSocket(
        wsUrl(`/ws/chat?session_id=${encodeURIComponent(sessionId)}`),
      );

      socket.onopen = () => {
        socketRef.current = socket;
        resolve(socket);
      };

      socket.onerror = () => {
        reject(new Error("Não foi possível conectar ao assistente."));
      };

      socket.onclose = () => {
        if (socketRef.current === socket) socketRef.current = null;
      };

      socket.onmessage = (event) => {
        let data: ServerEvent;
        try {
          data = JSON.parse(event.data);
        } catch {
          return;
        }

        if (data.type === "chunk") {
          const assistantId = assistantIdRef.current;
          if (!assistantId) return;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: m.content + data.content }
                : m,
            ),
          );
        } else if (data.type === "done") {
          setIsLoading(false);
          assistantIdRef.current = null;
        } else if (data.type === "error") {
          setError(data.message);
          setIsLoading(false);
          assistantIdRef.current = null;
        }
      };
    });
  }, [sessionId]);

  useEffect(() => {
    return () => {
      socketRef.current?.close();
    };
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      const userMessage: Message = {
        id: generateId(),
        role: "user",
        content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setError(null);
      setIsLoading(true);

      try {
        const socket = await ensureSocket();

        const assistantMessage: Message = {
          id: generateId(),
          role: "assistant",
          content: "",
          timestamp: new Date(),
        };
        assistantIdRef.current = assistantMessage.id;
        setMessages((prev) => [...prev, assistantMessage]);

        socket.send(JSON.stringify({ type: "message", content }));
      } catch (err) {
        setIsLoading(false);
        setError(
          err instanceof Error
            ? err.message
            : "Não foi possível enviar a mensagem.",
        );
      }
    },
    [ensureSocket],
  );

  function clearMessages() {
    setMessages([]);
    setIsLoading(false);
    setError(null);
    socketRef.current?.close();
    socketRef.current = null;
    assistantIdRef.current = null;
  }

  return {
    messages,
    isLoading,
    error,
    scrollRef,
    sendMessage,
    clearMessages,
  };
}
