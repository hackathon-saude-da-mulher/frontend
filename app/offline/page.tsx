import { FaWifi } from "react-icons/fa";

export const metadata = {
  title: "Sem conexão – Susi",
};

export default function OfflinePage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-nav-active/10">
        <FaWifi size={24} className="text-nav-active" />
      </div>
      <h1 className="text-xl font-semibold text-foreground">Você está offline</h1>
      <p className="max-w-[280px] text-sm leading-relaxed text-foreground-muted">
        Não foi possível conectar à internet. O Susi precisa de conexão para
        conversar e buscar unidades de atendimento. Verifique sua rede e tente
        novamente.
      </p>
    </div>
  );
}
