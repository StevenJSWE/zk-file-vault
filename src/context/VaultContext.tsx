"use client";

/**
 * VaultContext
 * Holds the in-memory CryptoKey for the current session.
 * The key is derived from the user's passphrase on login and NEVER persisted.
 * Wrap the app in <VaultProvider> inside layout.tsx once implemented.
 */

import { createContext, useContext, useState } from "react";

interface VaultContextValue {
  cryptoKey: CryptoKey | null;
  setKey: (key: CryptoKey) => void;
  clearKey: () => void;
}

const VaultContext = createContext<VaultContextValue | null>(null);

export function VaultProvider({ children }: { children: React.ReactNode }) {
  const [cryptoKey, setCryptoKey] = useState<CryptoKey | null>(null);

  // TODO: optionally lock the vault after an inactivity timeout

  return (
    <VaultContext.Provider
      value={{
        cryptoKey,
        setKey: setCryptoKey,
        clearKey: () => setCryptoKey(null),
      }}
    >
      {children}
    </VaultContext.Provider>
  );
}

export function useVault(): VaultContextValue {
  const ctx = useContext(VaultContext);
  if (!ctx) throw new Error("useVault must be used inside <VaultProvider>");
  return ctx;
}
