import type { IconType } from "react-icons";

export interface ChecklistItem {
  icon: IconType;
  label: string;
}

interface ChecklistProps {
  title: string;
  items: ChecklistItem[];
}

export const Checklist = ({ title, items }: ChecklistProps) => {
  return (
    <div>
      <h3 className="mb-3 font-semibold text-foreground">{title}</h3>
      <ul className="flex flex-col gap-2">
        {items.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2">
            <Icon size={14} className="shrink-0 text-foreground-muted" />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Checklist;
