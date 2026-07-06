"use client";

import { useState } from "react";
import {
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaRegComment,
  FaPlus,
} from "react-icons/fa";
import { ThemeToggle } from "@/app/components/theme/theme-toggle";
import { MessageBubble } from "./message-bubble";
import { ChatInput } from "./chat-input";
import { useChat } from "./useChat";

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { messages, isLoading, scrollRef, sendMessage, clearMessages } = useChat();

  return (
    <div className="mx-auto flex max-w-md flex-col h-[calc(100vh-64px)] px-4 bg-background relative">

      {/* Botão de tema */}
      <div className="absolute top-6 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Menu Flutuante */}
      <div className="absolute top-6 left-4 z-20 flex items-center gap-3">
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="w-10 h-10 rounded-full bg-nav-active flex items-center justify-center text-white shadow-md transition-transform active:scale-95"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <FaAngleDoubleLeft size={18} /> : <FaAngleDoubleRight size={18} />}
        </button>

        {isMenuOpen && (
          <div className="flex items-center gap-3">
            <button
              onClick={clearMessages}
              className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-foreground-muted hover:text-foreground transition-colors relative shadow-sm"
              title="Nova Conversa"
            >
              <FaRegComment size={17} />
              <FaPlus size={9} className="absolute top-2 right-1.5" />
            </button>
          </div>
        )}
      </div>

      {/* Área de mensagens ou greeting */}
      {messages.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center -mt-16">
          <h1 className="text-[34px] font-normal text-foreground mb-5 tracking-wide">
            Susi
          </h1>
          <h2 className="text-[17px] font-bold text-foreground mb-2 text-center">
            Como posso ajudar hoje?
          </h2>
          <p className="text-[12px] text-foreground-muted text-center max-w-[280px] leading-relaxed">
            Tire dúvidas sobre saúde da mulher, sintomas ou encontre a unidade de atendimento mais adequada para o seu caso.
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pt-20 pb-4">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-start mb-3">
              <div className="bg-surface-muted border border-border rounded-2xl rounded-bl-md px-4 py-3 text-[13px] text-foreground-muted">
                <span className="animate-pulse">Digitando...</span>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      )}

      {/* Input Area */}
      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
}
