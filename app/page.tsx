"use client";

import Link from "next/link";
import {
  FaComments,
  FaShieldHeart,
  FaLocationDot,
  FaBell,
  FaArrowRight,
  FaLock,
} from "react-icons/fa6";

type ItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function Item({ icon, title, description }: ItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-muted">
        {icon}
      </div>

      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-foreground-muted">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background px-6 py-8 text-foreground">
      <div className="mx-auto flex max-w-md flex-col">
        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary text-primary-foreground shadow-lg">
            <FaComments className="text-4xl" />
          </div>
        </div>

        {/* Cabeçalho */}
        <section className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            SUSI
          </h1>

          <p className="mt-2 text-lg text-foreground-muted">
            Sistema Unificado de Saúde Inteligente
          </p>

          <p className="mx-auto mt-8 max-w-sm text-base leading-7 text-foreground-muted">
            Converse, tire dúvidas, encontre unidades de saúde e receba
            orientações baseadas em protocolos oficiais do SUS.
          </p>
        </section>

        {/* Botão */}
        <Link
          href="/conversas"
          className="mt-10 flex h-14 items-center justify-between rounded-2xl bg-primary px-6 text-primary-foreground shadow transition-transform active:scale-[0.98]"
        >
          <div className="flex items-center gap-3">
            <FaComments />
            <span className="font-medium">Iniciar conversa</span>
          </div>

          <FaArrowRight />
        </Link>

        {/* Privacidade */}
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
          <FaLock className="mt-1 text-foreground-muted" />

          <p className="text-sm leading-6 text-foreground-muted">
            Suas conversas são sigilosas e utilizadas apenas para melhorar a
            qualidade do serviço.
          </p>
        </div>

      </div>
    </main>
  );
}