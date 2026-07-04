"use client";

import { useRouter } from "next/navigation";
import {
  FaChevronLeft,
  FaSyncAlt,
  FaInfoCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import UnitCard from "@/app/components/unitCard/unitCard";

const units = [
  {
    name: "UBS Vila Madalena",
    address: "R. Girassol, 123 – Vila Madalena, São Paulo - SP",
    contact: "(11) 1234-5678",
    distance: "450 m",
    office_hours: "Seg a Sex: 7h às 19h",
  },
  {
    name: "UBS Sumaré",
    address: "R. Heitor Penteado, 246 – Sumaré, São Paulo - SP",
    contact: "(11) 9876-5432",
    distance: "1,2 km",
    office_hours: "Seg a Sex: 7h às 19h",
  },
  {
    name: "UBS Alto de Pinheiros",
    address: "R. Cerro Corá, 555 – Alto de Pinheiros, São Paulo - SP",
    contact: "(11) 5555-5555",
    distance: "1,8 km",
    office_hours: "Seg a Sex: 7h às 19h",
  },
  {
    name: "UBS Vila Nova Conceição",
    address: "R. Girassol, 123 – Vila Madalena, São Paulo - SP",
    contact: "(11) 1234-5678",
    distance: "2 km",
    office_hours: "Seg a Sex: 7h às 19h",
  },
  {
    name: "UBS São Vicente",
    address: "R. Heitor Penteado, 246 – Sumaré, São Paulo - SP",
    contact: "(11) 9876-5432",
    distance: "2,5 km",
    office_hours: "Seg a Sex: 7h às 19h",
  },
  {
    name: "UBS Morumbi",
    address: "R. Cerro Corá, 555 – Alto de Pinheiros, São Paulo - SP",
    contact: "(11) 5555-5555",
    distance: "3 km",
    office_hours: "Seg a Sex: 7h às 19h",
  },
];

export default function Page() {
  const router = useRouter();

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
          className="flex h-8 w-8 items-center justify-center text-primary"
        >
          <FaSyncAlt size={15} />
        </button>
      </header>

      <div className="flex flex-col gap-4 px-4 py-4">
        {/* Localização atual */}
        <div>
          <p className="text-sm text-foreground-muted">
            Mostrando unidades perto de
          </p>
          <p className="text-sm font-semibold text-foreground">
            Vila Madalena, São Paulo - SP
          </p>
          <button
            type="button"
            className="mt-1 text-sm font-medium text-primary hover:underline"
          >
            Trocar localização
          </button>
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

        {/* Lista de unidades */}
        <div className="flex flex-col">
          {units.map((unit, i) => (
            <UnitCard key={unit.name} index={i + 1} {...unit} />
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