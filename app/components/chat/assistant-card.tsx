import type { ReactNode } from "react";

interface AssistantCardProps {
  children: ReactNode;
  time?: string;
  variant?: "default" | "success";
}

export const AssistantCard = ({
  children,
  time,
  variant = "default",
}: AssistantCardProps) => {
  const variantClasses =
    variant === "success"
      ? "border-success-border bg-success-bg"
      : "border-border bg-surface";

  return (
    <div className="flex justify-start">
      <div
        className={`max-w-[90%] rounded-2xl rounded-bl-sm border p-4 ${variantClasses}`}
      >
        <div className="flex flex-col gap-3 text-sm text-foreground">
          {children}
        </div>
        {time ? (
          <div className="mt-2 text-right text-[11px] text-foreground-muted">
            {time}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AssistantCard;
