import { FaCheckDouble } from "react-icons/fa";

interface UserMessageProps {
  text: string;
  time: string;
}

export const UserMessage = ({ text, time }: UserMessageProps) => {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-primary-foreground">
        <p className="text-sm">{text}</p>
        <div className="mt-1 flex items-center justify-end gap-1 text-[11px] text-primary-foreground/80">
          <span>{time}</span>
          <FaCheckDouble size={11} />
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
