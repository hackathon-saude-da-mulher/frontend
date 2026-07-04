

interface UnitCardProps {
    name: string;
    address: string;
    contact: string;
    distance: string;
    office_hours: string;
}

const UnitCard = ({ name, address, contact, distance, office_hours }: UnitCardProps) => {
    return (
        <div className="border rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm text-foreground-muted">{address}</p>
            <p className="text-sm text-foreground-muted">Contato: {contact}</p>
            <p className="text-sm text-foreground-muted">Distância: {distance}</p>
            <p className="text-sm text-foreground-muted">Horário de funcionamento: {office_hours}</p>
        </div>
        
    );
};

export default UnitCard;