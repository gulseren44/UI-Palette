import { useState, useEffect } from "react";
import { DEFAULT_PALETTES, createPalette } from "../interfaces/Palette";

const STORAGE_KEY = "ui-palette-data";

export function usePalettes() {
  // State ilk ayağa kalkarken (Lazy Initialization) LocalStorage'ı kontrol eder.
  // Bu yöntem useEffect gecikmelerini ve senkronizasyon hatalarını tamamen engeller.
  const [palettes, setPalettes] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      } else {
        // Eğer LocalStorage boşsa, varsayılan paletleri diske yazar ve state'e verir
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PALETTES));
        return DEFAULT_PALETTES;
      }
    } catch (error) {
      console.error("LocalStorage okunurken hata oluştu:", error);
      return DEFAULT_PALETTES;
    }
  });

  // Herhangi bir fonksiyon (Ekle, Sil, Güncelle) state'i değiştirdiğinde
  // LocalStorage'ı otomatik olarak güncel tutan temiz bir yan etki (Side Effect)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(palettes));
  }, [palettes]);

  // 1. EKLEME İŞLEMİ (Create)
  const addPalette = ({ title, colors, description }) => {
    const newPalette = createPalette(title, colors, description);
    setPalettes((prevPalettes) => [newPalette, ...prevPalettes]);
  };

  // 2. GÜNCELLEME İŞLEMİ (Update)
  const updatePalette = (id, { title, colors, description }) => {
    setPalettes((prevPalettes) =>
      prevPalettes.map((p) =>
        p.id === id ? { ...p, title, colors, description } : p
      )
    );
  };

  // 3. SİLME İŞLEMİ (Delete)
  const deletePalette = (id) => {
    setPalettes((prevPalettes) => prevPalettes.filter((p) => p.id !== id));
  };

  return { palettes, addPalette, updatePalette, deletePalette };
}