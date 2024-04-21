import React, { createContext, useReducer, useEffect } from "react";
import { gifReducer, Action, State } from "./gifReducer";

export const GifStateContext = createContext<State | undefined>(undefined);
export const GifDispatchContext = createContext<
  React.Dispatch<Action> | undefined
>(undefined);

type GifProviderProps = { children: React.ReactNode };

export const GifProvider = ({ children }: GifProviderProps) => {
  const [state, dispatch] = useReducer(
    gifReducer,
    { savedGifs: [] },
    initializeGifState
  );

  function initializeGifState(): State {
    const loadedGifs = localStorage.getItem("savedGifs");
    return loadedGifs ? loadGifsFromStorage(loadedGifs) : { savedGifs: [] };
  }

  function loadGifsFromStorage(gifs: string): State {
    try {
      const loadedGifs = JSON.parse(gifs);
      return Array.isArray(loadedGifs)
        ? { savedGifs: loadedGifs }
        : { savedGifs: [] };
    } catch (event) {
      console.error("Error loading GIFs from localStorage:", event);
      return { savedGifs: [] };
    }
  }

  useEffect(() => {
    localStorage.setItem("savedGifs", JSON.stringify(state.savedGifs));
  }, [state.savedGifs]);

  return (
    <GifStateContext.Provider value={state}>
      <GifDispatchContext.Provider value={dispatch}>
        {children}
      </GifDispatchContext.Provider>
    </GifStateContext.Provider>
  );
};

export default GifProvider;
