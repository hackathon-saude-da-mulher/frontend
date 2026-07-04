interface DateDividerProps {
  label: string;
}

export const DateDivider = ({ label }: DateDividerProps) => {
  return (
    <div className="py-1 text-center text-xs text-foreground-muted">
      {label}
    </div>
  );
};

export default DateDivider;
