import { FaPhoneAlt } from "react-icons/fa";

interface UnitCardProps {
    index: number;
    name: string;
    address: string;
    contact?: string;
    distance: string;
    office_hours?: string;
    latitude?: number;
    longitude?: number;
}

const UnitCard = ({
    index,
    name,
    address,
    contact,
    distance,
    office_hours,
    latitude,
    longitude,
}: UnitCardProps) => {
    const routeUrl =
        latitude !== undefined && longitude !== undefined
            ? `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
            : undefined;
return (
    <div className="mb-3 rounded-xl border border-border bg-surface p-3">
    <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-semibold text-primary">
            {index}
        </span>
        <h2 className="text-sm font-semibold text-foreground">{name}</h2>
        </div>
        <span className="shrink-0 text-xs text-foreground-muted">
        {distance}
        </span>
    </div>

    <p className="mt-1 text-xs leading-relaxed text-foreground-muted">
        {address}
    </p>

    <div className="mt-2 flex items-center justify-between gap-2">
        <p className="text-xs text-foreground-muted">{office_hours ?? ""}</p>

        <div className="flex items-center gap-2">

        {contact && (
        <a
            href={`tel:${contact}`}
            aria-label={`Ligar para ${name}`}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-surface text-foreground-muted transition-colors hover:bg-surface-muted"
        >
            <FaPhoneAlt size={12} />
        </a>
        )}
        {routeUrl ? (
        <a
            href={routeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-8 flex items-center rounded-md bg-primary/10 px-3 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
        >
            Ver rota
        </a>
        ) : (
        <button
            type="button"
            disabled
            className="h-8 rounded-md bg-primary/10 px-3 text-xs font-medium text-primary opacity-50"
        >
            Ver rota
        </button>
        )}
        </div>
    </div>
    </div>
);
};

export default UnitCard;