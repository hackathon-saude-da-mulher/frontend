import UnitCard from "@/app/components/unitCard/unitCard";

export default function Page() {

  const units = [
    {
      name: "Unidade 1",
      address: "Rua Exemplo, 123",
      contact: "(11) 1234-5678",
      distance: "5 km",
      office_hours: "Seg-Sex: 9h - 18h"
    },
    {
      name: "Unidade 2",
      address: "Avenida Exemplo, 456",
      contact: "(11) 9876-5432",
      distance: "10 km",
      office_hours: "Seg-Sex: 8h - 17h"
    },
    {
      name: "Unidade 3",
      address: "Praça Exemplo, 789",
      contact: "(11) 5555-5555",
      distance: "15 km",
      office_hours: "Seg-Sex: 10h - 19h"
    }
  ]


  return (
    <div className="p-4 flex flex-col gap-4">
      {
        units.map((unit, index) => (
          <UnitCard key={index}
            name={unit.name}
            address={unit.address}
            contact={unit.contact}
            distance={unit.distance}
            office_hours={unit.office_hours}
          />  
        ))
      }
    </div>
  );
}
