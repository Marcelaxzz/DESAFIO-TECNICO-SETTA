import { useEffect, useRef } from "react";

const INTERVALO_PADRAO_MS = 30000;

export function useAutoAtualizacao(callback, ativo, intervaloMs = INTERVALO_PADRAO_MS) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!ativo) return;

    const id = setInterval(() => callbackRef.current(), intervaloMs);
    return () => clearInterval(id);
  }, [ativo, intervaloMs]);
}
