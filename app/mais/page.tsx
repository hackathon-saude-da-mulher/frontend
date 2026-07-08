"use client";

import { useState } from "react";
import {
  FaShieldAlt,
  FaPhoneAlt,
  FaLock,
  FaUserShield,
  FaFileAlt,
  FaInfoCircle,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";
import { ThemeToggle } from "../components/theme/theme-toggle";

const EMERGENCIA = [
  {
    title: "SAMU",
    number: "192",
    description: "Urgência médica 24h",
    color: "text-warning-foreground",
  },
  {
    title: "Bombeiros",
    number: "193",
    description: "Resgate e emergência",
    color: "text-warning-foreground",
  },
  {
    title: "CVV",
    number: "188",
    description: "Acolhimento emocional 24h",
    color: "text-success-foreground",
  },
];

export default function Page() {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <div className="mx-auto flex max-w-md flex-col min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background px-4 py-3">
        <h1 className="text-base font-semibold text-foreground">Sobre</h1>
        <ThemeToggle />
      </header>

      <div className="flex flex-col gap-6 px-4 py-5">
        {/* Privacidade e LGPD */}
        <section>
          <div className="flex flex-col items-center text-center mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-3">
              <FaShieldAlt size={24} className="text-primary" />
            </div>
            <h2 className="text-base font-semibold text-foreground">
              Privacidade e Segurança
            </h2>
            <p className="mt-1 text-xs text-foreground-muted">
              Seus dados estão protegidos
            </p>
          </div>

          <div className="flex flex-col rounded-xl border border-border bg-surface overflow-hidden">
            <div className="flex items-start gap-3 border-b border-border px-3 py-3">
              <FaLock size={14} className="shrink-0 mt-0.5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Nenhum dado é armazenado
                </p>
                <p className="text-xs leading-relaxed text-foreground-muted">
                  A Susi não salva conversas, dados pessoais ou informações de
                  saúde. Tudo é apagado ao fechar o app.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 border-b border-border px-3 py-3">
              <FaUserShield size={14} className="shrink-0 mt-0.5 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Conformidade com a LGPD
                </p>
                <p className="text-xs leading-relaxed text-foreground-muted">
                  Seguimos a Lei Geral de Proteção de Dados. Sem cadastro,
                  sem coleta, sem compartilhamento.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowTerms(true)}
              className="flex items-center gap-3 px-3 py-3 text-left rounded-b-xl border border-border bg-surface transition-colors hover:bg-surface-muted active:scale-[0.98]"
            >
              <FaFileAlt size={14} className="shrink-0 text-primary" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                  Termos de uso e política de privacidade
                </p>
              </div>
              <FaChevronRight size={12} className="shrink-0 text-foreground-muted" />
            </button>
          </div>
        </section>

        {/* Emergência */}
        <section>
          <h2 className="mb-3 text-sm font-semibold text-foreground">
            Emergência
          </h2>
          <div className="flex flex-col gap-2">
            {EMERGENCIA.map((item) => (
              <div
                key={item.number}
                className="flex items-center justify-between rounded-xl border border-border bg-surface p-3"
              >
                <div>
                  <p className={`text-sm font-semibold ${item.color}`}>
                    {item.title}
                  </p>
                  <p className="text-xs text-foreground-muted">
                    {item.description}
                  </p>
                </div>
                <a
                  href={`tel:${item.number}`}
                  aria-label={`Ligar para ${item.title}`}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface-muted ${item.color} transition-transform active:scale-95`}
                >
                  <FaPhoneAlt size={14} />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Versão */}
        <section className="flex items-center justify-center gap-2 pt-2">
          <FaInfoCircle size={12} className="text-foreground-muted" />
          <p className="text-xs text-foreground-muted">Susi v1.0.0</p>
        </section>
      </div>

      {/* Bottom Sheet - Termos */}
      {showTerms && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setShowTerms(false)}
          />

          {/* Sheet */}
          <div className="relative w-full max-w-md bg-background rounded-t-3xl max-h-[80vh] flex flex-col animate-slide-up shadow-2xl">
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="h-1 w-10 rounded-full bg-foreground-muted/30" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-3">
              <h3 className="text-base font-semibold text-foreground">
                Termos de Uso
              </h3>
              <button
                type="button"
                onClick={() => setShowTerms(false)}
                aria-label="Fechar"
                className="flex h-8 w-8 items-center justify-center rounded-full text-foreground-muted hover:bg-surface-muted transition-colors"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <div className="flex flex-col gap-5 text-sm text-foreground-muted leading-relaxed">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1.5">
                    1. Sobre a Susi
                  </h4>
                  <p>
                    A Susi é uma assistente virtual de triagem e orientação em
                    saúde da mulher. As informações fornecidas são de caráter
                    educativo e não substituem consulta médica presencial.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1.5">
                    2. Coleta e armazenamento de dados
                  </h4>
                  <p>
                    Os dados informados na conversa são processados apenas
                    durante a sessão para gerar a resposta da Susi, e
                    descartados ao encerrá-la, sem armazenamento permanente.
                    Não coletamos nem comparthamos dados pessoais ou de saúde
                    com terceiros.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1.5">
                    3. Conformidade com a LGPD
                  </h4>
                  <p>
                    Em conformidade com a Lei Geral de Proteção de Dados (Lei
                    nº 13.709/2018), a Susi não realiza tratamento de dados
                    pessoais para fins de perfilamento, marketing ou
                    compartilhamento. Não há cadastro, login ou coleta de
                    informações identificáveis.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1.5">
                    4. Limitação de responsabilidade
                  </h4>
                  <p>
                    As respostas da Susi são baseadas em informações gerais de
                    saúde e não devem ser utilizadas como diagnóstico ou
                    tratamento. Em caso de urgência, procure uma unidade de
                    saúde ou ligue para o SAMU (192).
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1.5">
                    5. Disponibilidade do serviço
                  </h4>
                  <p>
                    A Susi é fornecida &ldquo;como está&rdquo;, sem garantias de
                    disponibilidade ininterrupta. Reservamo-nos o direito de
                    modificar ou descontinuar o serviço a qualquer momento.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1.5">
                    6. Alterações nestes termos
                  </h4>
                  <p>
                    Estes termos podem ser atualizados periodicamente. O uso
                    continuado do app após alterações constitui aceitação das
                    novas condições.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1.5">
                    7. Faixa etária
                  </h4>
                  <p>
                    A Susi é destinada a maiores de 18 anos. Menores de idade
                    somente poderão utilizar o serviço mediante autorização de
                    um responsável legal, que assume integralmente a
                    responsabilidade pelo uso.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1.5">
                    8. Legislação aplicável e foro
                  </h4>
                  <p>
                    Estes termos são regidos pela legislação brasileira. Fica
                    eleito o foro da Comarca de São Paulo/SP para dirimir
                    quaisquer questões oriundas do uso do aplicativo, com
                    renúncia expressa a qualquer outro, por mais privilegiado
                    que seja.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1.5">
                    9. Contato
                  </h4>
                  <p>
                    Em caso de dúvidas sobre estes termos, entre em contato
                    pelo e-mail
                    <a
                      href="mailto:suporte@susi.app"
                      className="text-primary font-medium hover:underline"
                    >
                      {" "}suporte@susi.app
                    </a>.
                  </p>
                </div>

                <p className="text-xs text-foreground-muted/60 pt-2">
                  Última atualização: julho de 2026
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-border px-5 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={() => setShowTerms(false)}
                className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.97] shadow-sm"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
