"use client";

import { createContext, useContext, useState } from "react";

type BackgroundContextType = {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
};

const BackgroundContext = createContext<BackgroundContextType | null>(null);

export function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(true); // DEFAULT = ON

  return (
    <BackgroundContext.Provider value={{ enabled, setEnabled }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const ctx = useContext(BackgroundContext);
  if (!ctx) throw new Error("useBackground must be used inside BackgroundProvider");
  return ctx;
}
