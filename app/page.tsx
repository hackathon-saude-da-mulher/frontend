import { ThemeToggle } from "@/app/components/theme/theme-toggle";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 p-4">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Saúde em Dia</h1>
          <p className="text-sm text-foreground-muted">
            Assistente de saúde do SUS
          </p>
        </div>
        <ThemeToggle />
      </header>

      <div className="rounded-xl border border-border bg-surface-muted p-4 text-sm text-foreground-muted">
        Suas conversas são sigilosas e usadas para melhorar o serviço.
      </div>

      <div className="rounded-xl border border-success-border bg-success-bg p-4">
        <p className="font-medium text-success-foreground">
          Preview do navbar e do toggle de tema abaixo.
        </p>
      </div>
    </div>
  );
}
