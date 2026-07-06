import { apiUrl } from "./config";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function extractErrorMessage(res: Response): Promise<string> {
  try {
    const body = await res.json();
    if (typeof body.detail === "string") return body.detail;
    if (Array.isArray(body.detail)) {
      return body.detail.map((d: { msg?: string }) => d.msg).join(", ");
    }
  } catch {
    // ignore parse errors, fall back to status text
  }
  return res.statusText || "Erro inesperado";
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(apiUrl(path), {
    ...init,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  if (!res.ok) {
    throw new ApiError(await extractErrorMessage(res), res.status);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export interface UBSResult {
  nome: string;
  logradouro: string;
  bairro: string;
  municipio: string;
  uf: string;
  ibge: string;
  cnes: string | null;
  latitude: number;
  longitude: number;
  distance_km: number;
}

export interface UnidadesProximasResponse {
  ubs: UBSResult[];
  hospitals: UBSResult[];
}

export async function createSession(): Promise<string> {
  const data = await request<{ session_id: string }>("/session", {
    method: "POST",
  });
  return data.session_id;
}

export async function postLocation(
  sessionId: string,
  location: { latitude: number; longitude: number } | { cep: string },
): Promise<void> {
  await request<{ ok: true }>("/location", {
    method: "POST",
    body: JSON.stringify({ session_id: sessionId, ...location }),
  });
}

export async function getUnidadesProximas(
  sessionId: string,
): Promise<UnidadesProximasResponse> {
  return request<UnidadesProximasResponse>(
    `/unidades-proximas?session_id=${encodeURIComponent(sessionId)}`,
  );
}

export async function transcribeAudio(blob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append("audio", blob, "audio.ogg");

  const res = await fetch(apiUrl("/voice/transcribe"), {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new ApiError(await extractErrorMessage(res), res.status);
  }

  const data = (await res.json()) as { text: string };
  return data.text;
}
