# Susi — Frontend

Interface web do **Susi**, assistente de saúde da mulher do SUS. Permite conversar
com o agente (texto ou voz), receber respostas fundamentadas em conteúdo oficial e
encontrar unidades de atendimento (UBS e hospitais) próximas.

É um app **mobile-first** e **instalável (PWA)**, construído com Next.js (App Router),
React 19 e Tailwind CSS v4.

> ⚠️ Esta é uma versão do Next.js com mudanças relevantes de convenção. Antes de
> alterar código, consulte os guias em `node_modules/next/dist/docs/` (ver
> [`AGENTS.md`](./AGENTS.md)).

## Funcionalidades

- **Chat com o agente** (`/conversas`) — conversa por WebSocket com streaming das
  respostas, renderizadas em Markdown. Cada resposta do assistente pode ser ouvida
  em áudio (text-to-speech).
- **Entrada por voz** — gravação de áudio no chat, transcrita pelo backend
  (speech-to-text) e enviada como mensagem.
- **Banner de localização** — na tela inicial do chat, oferece definir a localização
  (geolocalização do navegador ou CEP) para que o agente recomende unidades próximas.
- **Unidades próximas** (`/unidades`) — lista de UBS e hospitais ordenados por
  distância, com link de rota no Google Maps. Localização por GPS ou CEP.
- **Sobre** (`/mais`) — privacidade/LGPD, termos de uso e telefones de emergência.
- **Tema claro/escuro** e **PWA** (instalável na tela inicial, com página offline).

## Requisitos

- Node.js 20+
- [Yarn](https://yarnpkg.com/) (o repositório usa `yarn.lock`)
- O [backend](../backend) rodando (padrão: `http://localhost:8000`) — fornece as
  APIs de sessão, chat (WebSocket), localização, unidades e voz.

## Configuração

A URL do backend é configurável via variável de ambiente. Sem ela, o padrão é
`http://localhost:8000` (ver [`app/lib/config.ts`](./app/lib/config.ts)). A URL do
WebSocket é derivada automaticamente (`http` → `ws`).

```bash
# .env.local (opcional)
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Como rodar

```bash
yarn install          # instala dependências
yarn dev              # servidor de desenvolvimento em http://localhost:3000
```

Abra [http://localhost:3000](http://localhost:3000). O chat fica em
[`/conversas`](http://localhost:3000/conversas).

Para rodar **backend e frontend juntos**, use o script na raiz do repositório:

```bash
../run.sh             # sobe backend (:8000) e frontend (:3000)
../run.sh --install   # instala dependências dos dois antes de subir
```

## Scripts

| Comando       | Descrição                                    |
|---------------|----------------------------------------------|
| `yarn dev`    | Servidor de desenvolvimento (hot reload)     |
| `yarn build`  | Build de produção                            |
| `yarn start`  | Sobe o build de produção                     |
| `yarn lint`   | ESLint                                        |

## Integração com o backend

O cliente HTTP/WebSocket fica em [`app/lib/api.ts`](./app/lib/api.ts). Endpoints usados:

| Endpoint                          | Uso no frontend                                    |
|-----------------------------------|----------------------------------------------------|
| `POST /session`                   | Cria a sessão anônima (persistida em localStorage) |
| `WS /ws/chat?session_id=…`        | Chat com streaming (`chunk` / `done` / `error`)    |
| `POST /location`                  | Define a localização da sessão (lat/long ou CEP)   |
| `GET /unidades-proximas`          | Lista UBS e hospitais próximos                     |
| `POST /voice/transcribe`          | Transcreve áudio gravado (fala → texto)            |
| `POST /voice/speech`              | Sintetiza áudio da resposta (texto → fala)         |

A sessão é anônima e criada automaticamente no primeiro acesso
([`app/lib/session-context.tsx`](./app/lib/session-context.tsx)). Como o backend
mantém o estado em memória, ao reiniciá-lo o frontend renova a sessão
automaticamente quando detecta uma sessão obsoleta.

## Estrutura

```
app/
  conversas/        Chat: página, hook (useChat), input, bolhas, gravador de áudio,
                    banner de localização
  unidades/         Lista de unidades próximas (página + useUnidades)
  mais/             Sobre, privacidade/LGPD, termos, emergência
  offline/          Página exibida offline (PWA)
  components/       Navbar, tema, cartão de unidade, registro do service worker
  lib/              api, config, contexto de sessão, helpers de localização
  manifest.ts       Web App Manifest (PWA)
public/
  sw.js             Service worker (cache do shell + fallback offline)
  icon-*.png        Ícones do PWA
```

## PWA

A aplicação é instalável: manifesto em [`app/manifest.ts`](./app/manifest.ts) e
service worker em [`public/sw.js`](./public/sw.js) (precache do shell, navegação
_network-first_ com fallback para `/offline`; chamadas à API/WebSocket nunca são
cacheadas). O service worker exige **HTTPS** (ou `localhost`) para registrar.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 · `next-themes` (tema claro/escuro) · `react-icons`
- `react-markdown` + `remark-gfm` (renderização das respostas)
