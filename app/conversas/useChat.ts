"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Message } from "./types";

const mockResponses = [
  "Entendo. Para esse tipo de sintoma, é importante consultar um médico. Posso te ajudar a encontrar a UBS mais próxima?",
  "Recomendo que você procure uma unidade de saúde para avaliação. Deseja ver as unidades próximas a você?",
  "Esse sintoma pode ter várias causas. É importante não se automedicar. Quer que eu encontre uma UBS para você?",
  "Obrigada por compartilhar. Para melhor te ajudar, seria bom consultar um profissional de saúde. Posso te indicar a UBS mais adequada?",
  "Cuidar da saúde é sempre uma boa decisão. Posso te ajudar a encontrar uma unidade de saúde perto de você?",
];

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  function sendMessage(content: string) {
    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const response: Message = {
        id: generateId(),
        role: "assistant",
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, response]);
      setIsLoading(false);
    }, 1000);
  }

  function clearMessages() {
    setMessages([]);
    setIsLoading(false);
  }

  return { messages, isLoading, scrollRef, sendMessage, clearMessages };
}
