"use client";

import { useState } from "react";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { postLocation } from "@/app/lib/api";
import { getCurrentPosition, markLocationSet } from "@/app/lib/location";
import { useSession } from "@/app/lib/session-context";

interface LocationBannerProps {
  onDone: () => void;
}

/**
 * Dismissible card shown at the top of the chat offering to set the session
 * location, so the agent's "nearby units" tool has something to work with.
 * Non-intrusive: the native geolocation prompt only fires if the user taps
 * "Usar minha localização".
 */
export function LocationBanner({ onDone }: LocationBannerProps) {
  const { sessionId } = useSession();
  const [showCep, setShowCep] = useState(false);
  const [cep, setCep] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function useGeolocation() {
    if (!sessionId) return;
    setIsBusy(true);
    setError(null);
    try {
      const pos = await getCurrentPosition();
      await postLocation(sessionId, {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
      markLocationSet(sessionId);
      onDone();
    } catch {
      setError(
        "Não foi possível obter sua localização. Tente informar o CEP.",
      );
      setShowCep(true);
    } finally {
      setIsBusy(false);
    }
  }

  async function submitCep(e: React.FormEvent) {
    e.preventDefault();
    if (!sessionId) return;
    const digits = cep.replace(/\D/g, "");
    if (digits.length !== 8) {
      setError("Digite um CEP válido com 8 dígitos.");
      return;
    }
    setIsBusy(true);
    setError(null);
    try {
      await postLocation(sessionId, { cep: digits });
      markLocationSet(sessionId);
      onDone();
    } catch {
      setError("CEP inválido ou não encontrado.");
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <div className="mb-3 rounded-2xl border border-border bg-surface p-3 shadow-sm animate-fade-in">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-nav-active/10">
          <FaMapMarkerAlt size={15} className="text-nav-active" />
        </div>
        <div className="flex-1">
          <p className="text-[13px] font-semibold text-foreground">
            Quer recomendações de unidades perto de você?
          </p>
          <p className="mt-0.5 text-[11px] leading-relaxed text-foreground-muted">
            Compartilhe sua localização para que a Susi indique postos de
            atendimento próximos.
          </p>
        </div>
        <button
          type="button"
          onClick={onDone}
          aria-label="Agora não"
          className="shrink-0 text-foreground-muted transition-colors hover:text-foreground"
        >
          <FaTimes size={13} />
        </button>
      </div>

      {error && <p className="mt-2 text-[11px] text-red-500">{error}</p>}

      {showCep ? (
        <form onSubmit={submitCep} className="mt-3 flex gap-2">
          <input
            type="text"
            inputMode="numeric"
            placeholder="00000000"
            maxLength={8}
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            disabled={isBusy}
            className="flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-[12px] text-foreground outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isBusy}
            className="rounded-lg bg-nav-active px-3 py-1.5 text-[12px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            Buscar
          </button>
        </form>
      ) : (
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={useGeolocation}
            disabled={isBusy}
            className="flex-1 rounded-lg bg-nav-active px-3 py-2 text-[12px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {isBusy ? "Localizando..." : "Usar minha localização"}
          </button>
          <button
            type="button"
            onClick={() => setShowCep(true)}
            disabled={isBusy}
            className="flex-1 rounded-lg border border-border bg-surface px-3 py-2 text-[12px] font-medium text-foreground transition-colors hover:bg-surface-muted disabled:opacity-50"
          >
            Informar CEP
          </button>
        </div>
      )}
    </div>
  );
}
