"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "homex_favorites_v1";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      // ignore storage errors
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const toggleFavorite = useCallback((propertyId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (propertyId: string) => favorites.includes(propertyId),
    [favorites]
  );

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    count: favorites.length,
    isLoaded,
  };
}
