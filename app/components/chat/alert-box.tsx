import { FaExclamationTriangle } from "react-icons/fa";

interface AlertBoxProps {
  title: string;
  items: string[];
}

export const AlertBox = ({ title, items }: AlertBoxProps) => {
  return (
    <div className="rounded-xl border border-warning-border bg-warning-bg p-3 text-warning-foreground">
      <div className="flex items-center gap-2 font-semibold">
        <FaExclamationTriangle size={13} />
        <span>{title}</span>
      </div>
      <ul className="mt-2 flex flex-col gap-1 pl-1">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-warning-foreground" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertBox;
