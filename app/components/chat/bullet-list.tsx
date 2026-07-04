interface BulletListProps {
  items: string[];
}

export const BulletList = ({ items }: BulletListProps) => {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground-muted" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};

export default BulletList;
