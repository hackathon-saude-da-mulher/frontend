import { Message } from "./types";

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed break-words ${
          isUser
            ? "bg-nav-active text-white rounded-br-md"
            : "bg-surface-muted text-foreground border border-border rounded-bl-md"
        }`}
      >
        <p>{message.content}</p>
        <p
          className={`text-[10px] mt-1 ${
            isUser ? "text-white/60" : "text-foreground-muted"
          }`}
        >
          {message.timestamp.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
