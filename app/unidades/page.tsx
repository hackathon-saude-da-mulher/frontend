"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaChevronLeft,
  FaSyncAlt,
  FaInfoCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import UnitCard from "@/app/components/unitCard/unitCard";
import { useUnidades } from "./useUnidades";

export default function Page() {
  const router = useRouter();
  const {
    ubs,
    hospitals,
    locationLabel,
    isLoading,
    error,
    locateByGeolocation,
    locateByCep,
    refresh,
  } = useUnidades();
  const [showCepForm, setShowCepForm] = useState(false);
  const [cep, setCep] = useState("");

  const units = [...ubs, ...hospitals];

  function handleCepSubmit(e: React.FormEvent) {
    e.preventDefault();
    const digits = cep.replace(/\D/g, "");
    if (digits.length !== 8) return;
    setShowCepForm(false);
    locateByCep(digits);
  }

  return (
    <div className="mx-auto flex max-w-md flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-4 py-3">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Voltar"
          className="flex h-8 w-8 items-center justify-center text-foreground"
        >
          <FaChevronLeft size={16} />
        </button>
        <h1 className="text-base font-semibold text-foreground">
          Unidades próximas
        </h1>
        <button
          type="button"
          aria-label="Atualizar localização"
          onClick={() => refresh()}
          disabled={isLoading}
          className="flex h-8 w-8 items-center justify-center text-primary disabled:opacity-50"
        >
          <FaSyncAlt size={15} className={isLoading ? "animate-spin" : ""} />
        </button>
      </header>

      <div className="flex flex-col gap-4 px-4 py-4">
        {/* Localização atual */}
        <div>
          <p className="text-sm text-foreground-muted">
            Mostrando unidades perto de
          </p>
          <p className="text-sm font-semibold text-foreground">
            {locationLabel ?? "Localização não definida"}
          </p>
          <div className="mt-1 flex items-center gap-3">
            <button
              type="button"
              onClick={locateByGeolocation}
              className="text-sm font-medium text-primary hover:underline"
            >
              Usar minha localização
            </button>
            <button
              type="button"
              onClick={() => setShowCepForm((prev) => !prev)}
              className="text-sm font-medium text-primary hover:underline"
            >
              Informar CEP
            </button>
          </div>

          {showCepForm && (
            <form onSubmit={handleCepSubmit} className="mt-2 flex gap-2">
              <input
                type="text"
                inputMode="numeric"
                placeholder="00000000"
                maxLength={8}
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                className="flex-1 rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-foreground outline-none"
              />
              <button
                type="submit"
                className="rounded-md bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/20"
              >
                Buscar
              </button>
            </form>
          )}
        </div>

        {/* Placeholder de mapa */}
        <div className="relative h-40 w-full overflow-hidden rounded-xl border border-border bg-surface-muted">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
            aria-hidden
          />
          <FaMapMarkerAlt
            size={30}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-primary drop-shadow-md"
            aria-hidden
          />
        </div>

        {error && (
          <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-xs text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
            {error}
          </div>
        )}

        {isLoading && units.length === 0 && !error && (
          <p className="py-6 text-center text-sm text-foreground-muted">
            Buscando unidades próximas...
          </p>
        )}

        {!isLoading && units.length === 0 && !error && (
          <p className="py-6 text-center text-sm text-foreground-muted">
            Nenhuma unidade encontrada perto de você.
          </p>
        )}

        {/* Lista de unidades */}
        <div className="flex flex-col">
          {units.map((unit, i) => (
            <UnitCard
              key={unit.key}
              index={i + 1}
              name={unit.name}
              address={unit.address}
              distance={unit.distance}
              latitude={unit.latitude}
              longitude={unit.longitude}
            />
          ))}
        </div>

        {/* Aviso */}
        <div className="flex items-start gap-2 rounded-xl border border-border bg-surface-muted p-3 text-xs text-foreground-muted">
          <FaInfoCircle size={14} className="mt-0.5 shrink-0 text-primary" />
          <p>
            Horários podem variar em feriados e pontos facultativos. Confirme
            antes de ir.
          </p>
        </div>
      </div>
    </div>
  );
}
