"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type ScreenKey =
  | "dashboard"
  | "capture"
  | "scan"
  | "estimate"
  | "history"
  | "invoice"
  | "prices"
  | "settings";


interface ScreenContextType {
  screen: ScreenKey;
  go: (screen: ScreenKey) => void;
}


const ScreenContext = createContext<ScreenContextType | null>(null);


export function ScreenProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [screen, setScreen] = useState<ScreenKey>("dashboard");


  function go(screen: ScreenKey) {
    setScreen(screen);
  }


  return (
    <ScreenContext.Provider
      value={{
        screen,
        go,
      }}
    >
      {children}
    </ScreenContext.Provider>
  );
}


export function useScreen() {

  const context = useContext(ScreenContext);

  if (!context) {
    throw new Error(
      "useScreen must be inside ScreenProvider"
    );
  }

  return context;
}
