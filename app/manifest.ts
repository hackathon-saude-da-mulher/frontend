import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Susi – Saúde em Dia",
    short_name: "Susi",
    description:
      "Assistente de saúde da mulher do SUS: tire dúvidas e encontre unidades de atendimento próximas.",
    id: "/",
    start_url: "/conversas",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#b63cb2",
    lang: "pt-BR",
    categories: ["health", "medical", "lifestyle"],
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
