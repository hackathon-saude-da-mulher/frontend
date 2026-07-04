import type { ReactNode } from "react";

interface MessageSectionProps {
  title: string;
  children: ReactNode;
}

export const MessageSection = ({ title, children }: MessageSectionProps) => {
  return (
    <div>
      <h3 className="mb-3 font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  );
};

export default MessageSection;
