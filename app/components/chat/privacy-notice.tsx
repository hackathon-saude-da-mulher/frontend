import { FaLock } from "react-icons/fa";

interface PrivacyNoticeProps {
  message: string;
}

export const PrivacyNotice = ({ message }: PrivacyNoticeProps) => {
  return (
    <div className="flex items-start gap-2 rounded-xl bg-surface-muted p-3 text-xs text-foreground-muted">
      <FaLock size={12} className="mt-0.5 shrink-0" />
      <p>{message}</p>
    </div>
  );
};

export default PrivacyNotice;
