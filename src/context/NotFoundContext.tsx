"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type NotFoundContextType = {
  isNotFound: boolean;
  setIsNotFound: (value: boolean) => void;
};

const NotFoundContext = createContext<NotFoundContextType | undefined>(undefined);

export function NotFoundProvider({ children }: { children: ReactNode }) {
  const [isNotFound, setIsNotFound] = useState(false);
  return (
    <NotFoundContext.Provider value={{ isNotFound, setIsNotFound }}>
      {children}
    </NotFoundContext.Provider>
  );
}

export function useNotFound() {
  const context = useContext(NotFoundContext);
  if (!context) {
    throw new Error("useNotFound must be used within a NotFoundProvider");
  }
  return context;
}