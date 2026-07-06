"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getUnidadesProximas,
  postLocation,
  UBSResult,
} from "@/app/lib/api";
import { useSession } from "@/app/lib/session-context";

export interface UnitViewModel {
  key: string;
  name: string;
  address: string;
  distance: string;
  latitude: number;
  longitude: number;
}

function toViewModel(u: UBSResult): UnitViewModel {
  return {
    key: `${u.cnes ?? u.ibge}-${u.nome}`,
    name: u.nome,
    address: `${u.logradouro} – ${u.bairro}, ${u.municipio} - ${u.uf}`,
    distance:
      u.distance_km < 1
        ? `${Math.round(u.distance_km * 1000)} m`
        : `${u.distance_km.toFixed(1).replace(".", ",")} km`,
    latitude: u.latitude,
    longitude: u.longitude,
  };
}

function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocalização não é suportada neste navegador."));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
    });
  });
}

export function useUnidades() {
  const { sessionId, isLoading: isSessionLoading } = useSession();
  const [ubs, setUbs] = useState<UnitViewModel[]>([]);
  const [hospitals, setHospitals] = useState<UnitViewModel[]>([]);
  const [locationLabel, setLocationLabel] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLocation, setHasLocation] = useState(false);

  const fetchUnidades = useCallback(async () => {
    if (!sessionId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getUnidadesProximas(sessionId);
      setUbs(data.ubs.map(toViewModel));
      setHospitals(data.hospitals.map(toViewModel));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível carregar as unidades.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [sessionId]);

  const useMyLocation = useCallback(async () => {
    if (!sessionId) return;
    setIsLoading(true);
    setError(null);
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      await postLocation(sessionId, { latitude, longitude });
      setHasLocation(true);
      setLocationLabel(
        `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
      );
      await fetchUnidades();
    } catch (err) {
      setIsLoading(false);
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível obter sua localização.",
      );
    }
  }, [sessionId, fetchUnidades]);

  const useCep = useCallback(
    async (cep: string) => {
      if (!sessionId) return;
      setIsLoading(true);
      setError(null);
      try {
        await postLocation(sessionId, { cep });
        setHasLocation(true);
        setLocationLabel(cep);
        await fetchUnidades();
      } catch (err) {
        setIsLoading(false);
        setError(
          err instanceof Error ? err.message : "CEP inválido.",
        );
      }
    },
    [sessionId, fetchUnidades],
  );

  useEffect(() => {
    if (!isSessionLoading && sessionId && !hasLocation) {
      useMyLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSessionLoading, sessionId]);

  return {
    ubs,
    hospitals,
    locationLabel,
    isLoading: isLoading || isSessionLoading,
    error,
    hasLocation,
    useMyLocation,
    useCep,
    refresh: fetchUnidades,
  };
}
