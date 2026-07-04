"use client";

import { FaFolder, FaIdCard, FaPills } from "react-icons/fa";
import { ChatHeader } from "@/app/components/chat/chat-header";
import { PrivacyNotice } from "@/app/components/chat/privacy-notice";
import { DateDivider } from "@/app/components/chat/date-divider";
import { UserMessage } from "@/app/components/chat/user-message";
import { AssistantCard } from "@/app/components/chat/assistant-card";
import { BulletList } from "@/app/components/chat/bullet-list";
import { AlertBox } from "@/app/components/chat/alert-box";
import { SourceCitation } from "@/app/components/chat/source-citation";
import { RecommendedSteps } from "@/app/components/chat/recommended-steps";
import { Checklist } from "@/app/components/chat/checklist";
import { MessageSection } from "@/app/components/chat/message-section";
import { MessageComposer } from "@/app/components/chat/message-composer";

export default function Page() {
  return (
    <div className="mx-auto flex h-[calc(100dvh-4rem)] max-w-md flex-col">
      <ChatHeader title="Saúde em Dia" subtitle="Assistente de saúde do SUS" />

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
        <PrivacyNotice message="Suas conversas são sigilosas e usadas para melhorar o serviço. Saiba mais." />

        <DateDivider label="Hoje, 09:12" />

        <UserMessage
          text="Estou com dor na parte de baixo da barriga há 3 dias, o que pode ser?"
          time="09:12"
        />

        <AssistantCard time="09:13">  
          <p>
            Entendo, Mariana. Dor na parte inferior da barriga pode ter
            diversas causas.
          </p>
          <p>As mais comuns em mulheres na sua faixa etária incluem:</p>
          <BulletList
            items={[
              "Cólicas menstruais",
              "Ovulação (mittelschmerz)",
              "Infecções urinárias",
              "Infecções ginecológicas",
              "Síndrome do intestino irritável",
            ]}
          />
          <AlertBox
            title="Sinais de alerta (procure urgência se tiver):"
            items={[
              "Dor muito forte e súbita",
              "Febre alta",
              "Sangramento intenso",
              "Vômitos persistentes",
              "Desmaio ou fraqueza",
            ]}
          />
          <p>
            Isso não substitui uma avaliação clínica. Se os sintomas
            persistirem ou piorarem, procure uma unidade de saúde.
          </p>
          <SourceCitation source="Protocolo de Atenção à Saúde da Mulher – Ministério da Saúde (2022)" />
        </AssistantCard>

        <UserMessage text="Preciso ir a um hospital?" time="09:15" />

        <AssistantCard variant="success" time="09:16">
          <p className="text-foreground">
            Pelo que você contou, não parece ser uma emergência.
          </p>

          <RecommendedSteps
            title="O caminho recomendado é:"
            steps={[
              "UBS (Unidade Básica de Saúde) do seu território",
              "Avaliação com enfermeiro(a) ou médico(a)",
              "Se necessário, encaminhamento para exames ou especialista",
            ]}
          />

          <hr className="border-success-border" />

          <Checklist
            title="Leve na consulta:"
            items={[
              { icon: FaFolder, label: "Cartão SUS" },
              { icon: FaIdCard, label: "Documento com foto" },
              { icon: FaPills, label: "Lista de medicamentos (se usa)" },
            ]}
          />

          <hr className="border-success-border" />

          <MessageSection title="O que esperar:">
            <BulletList
              items={[
                "Acolhimento e escuta",
                "Avaliação clínica",
                "Conduta e orientações",
              ]}
            />
          </MessageSection>
        </AssistantCard>
      </div>

      <MessageComposer />
    </div>
  );
}
