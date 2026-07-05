"use client";

import { useState } from "react";
import { FaPaperPlane, FaAngleDoubleRight, FaAngleDoubleLeft, FaSignOutAlt, FaRegComment, FaPlus } from "react-icons/fa";
import { ThemeToggle } from "@/app/components/theme/theme-toggle";

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="mx-auto flex max-w-md flex-col h-[calc(100vh-64px)] px-4 bg-background relative">

      {/* Botão de tema */}
      <div className="absolute top-6 right-4 z-20">
        <ThemeToggle />
      </div>

      {/* Menu Flutuante */}
      <div className="absolute top-6 left-4 z-20 flex items-center gap-3">
        {/* Botão de seta (abre e fecha) */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="w-10 h-10 rounded-full bg-nav-active flex items-center justify-center text-white shadow-md transition-transform active:scale-95"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <FaAngleDoubleLeft size={18} /> : <FaAngleDoubleRight size={18} />}
        </button>

        {/* Aparecem ao abrir (tenho que pensar melhor sobre essa parte)*/}
        {isMenuOpen && (
          <div className="flex items-center gap-3">
            {/* Nova Conversa */}
            <button
              className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-foreground-muted hover:text-foreground transition-colors relative shadow-sm"
              title="Nova Conversa"
            >
              <FaRegComment size={17} />
              <FaPlus size={9} className="absolute top-2 right-1.5" />
            </button>

            {/* Sair */}
            <button
              className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-red-500 hover:text-red-400 transition-colors shadow-sm"
              title="Sair"
            >
              <FaSignOutAlt size={17} />
            </button>
          </div>
        )}
      </div>

      {/* Conteúdo Central */}
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

      {/* Input Area Base */}
      <div className="pb-4">
        <div className="relative flex items-center bg-surface rounded-[2rem] p-1.5 border border-border shadow-sm">
          <input
            type="text"
            placeholder="Pergunte sobre saúde, sintomas ou postos de atendimento"
            className="flex-1 bg-transparent border-none outline-none text-[12px] pl-4 pr-2 py-3 text-foreground placeholder:text-foreground-muted truncate"
          />
          <div className="h-6 w-px bg-border mx-2"></div>
          <button className="w-10 h-10 rounded-full bg-nav-active flex items-center justify-center text-white flex-shrink-0 transition-transform active:scale-95">
            <FaPaperPlane size={14} className="-ml-0.5 mt-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
