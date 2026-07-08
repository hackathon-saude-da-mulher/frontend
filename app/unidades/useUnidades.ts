"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getUnidadesProximas,
  isStaleSessionError,
  postLocation,
  UBSResult,
} from "@/app/lib/api";
import { useSession } from "@/app/lib/session-context";
import { markLocationSet } from "@/app/lib/location";

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
  const { sessionId, isLoading: isSessionLoading, renewSession } =
    useSession();
  const [ubs, setUbs] = useState<UnitViewModel[]>([]);
  const [hospitals, setHospitals] = useState<UnitViewModel[]>([]);
  const [locationLabel, setLocationLabel] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLocation, setHasLocation] = useState(false);

  const fetchUnidades = useCallback(
    async (id: string) => {
      try {
        const data = await getUnidadesProximas(id);
        setUbs(data.ubs.map(toViewModel));
        setHospitals(data.hospitals.map(toViewModel));
      } catch (err) {
        if (isStaleSessionError(err)) {
          const renewedId = await renewSession();
          if (renewedId) {
            setHasLocation(false);
            return;
          }
        }
        throw err;
      }
    },
    [renewSession],
  );

  const locateByGeolocation = useCallback(async () => {
    if (!sessionId) return;
    setIsLoading(true);
    setError(null);
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      try {
        await postLocation(sessionId, { latitude, longitude });
      } catch (err) {
        if (isStaleSessionError(err) && (await renewSession())) {
          setHasLocation(false);
          return;
        }
        throw err;
      }
      setHasLocation(true);
      markLocationSet(sessionId);
      setLocationLabel(
        `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
      );
      await fetchUnidades(sessionId);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível obter sua localização.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, fetchUnidades, renewSession]);

  const locateByCep = useCallback(
    async (cep: string) => {
      if (!sessionId) return;
      setIsLoading(true);
      setError(null);
      try {
        try {
          await postLocation(sessionId, { cep });
        } catch (err) {
          if (isStaleSessionError(err) && (await renewSession())) {
            setHasLocation(false);
            return;
          }
          throw err;
        }
        setHasLocation(true);
        markLocationSet(sessionId);
        setLocationLabel(cep);
        await fetchUnidades(sessionId);
      } catch (err) {
        setError(err instanceof Error ? err.message : "CEP inválido.");
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId, fetchUnidades, renewSession],
  );

  useEffect(() => {
    if (!isSessionLoading && sessionId && !hasLocation) {
      locateByGeolocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSessionLoading, sessionId]);

  const refresh = useCallback(async () => {
    if (!sessionId) return;
    setIsLoading(true);
    setError(null);
    try {
      await fetchUnidades(sessionId);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível carregar as unidades.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, fetchUnidades]);

  return {
    ubs,
    hospitals,
    locationLabel,
    isLoading: isLoading || isSessionLoading,
    error,
    hasLocation,
    locateByGeolocation,
    locateByCep,
    refresh,
  };
}
