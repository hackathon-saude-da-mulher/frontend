"use client";

import { useState } from "react";
import {
  FaAngleDoubleRight,
  FaAngleDoubleLeft,
  FaRegComment,
  FaPlus,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";
import { ThemeToggle } from "@/app/components/theme/theme-toggle";
import { MessageBubble } from "./message-bubble";
import { ChatInput } from "./chat-input";
import { useChat } from "./useChat";

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNewChatConfirm, setShowNewChatConfirm] = useState(false);
  const { messages, isLoading, error, scrollRef, sendMessage, clearMessages } =
    useChat();

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
              onClick={() => setShowNewChatConfirm(true)}
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

      {error && (
        <div className="mb-2 rounded-lg border border-red-300 bg-red-50 px-3 py-2 text-xs text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Input Area */}
      <ChatInput onSend={sendMessage} disabled={isLoading} />

      {/* Modal de confirmação - Nova Conversa */}
      {showNewChatConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowNewChatConfirm(false)}
          />
          <div className="relative w-[90%] max-w-sm bg-background rounded-2xl p-6 shadow-2xl animate-slide-up">
            <button
              onClick={() => setShowNewChatConfirm(false)}
              className="absolute top-3 right-3 text-foreground-muted hover:text-foreground transition-colors"
            >
              <FaTimes size={16} />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-warning-bg flex items-center justify-center mb-4">
                <FaExclamationTriangle size={22} className="text-warning-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Nova conversa?
              </h3>
              <p className="text-sm text-foreground-muted mb-6 leading-relaxed">
                A conversa atual será apagada e uma nova sessão será iniciada. Essa ação não pode ser desfeita.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowNewChatConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl border border-border bg-surface text-foreground text-sm font-medium hover:bg-surface-muted transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    clearMessages();
                    setShowNewChatConfirm(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-nav-active text-white text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
