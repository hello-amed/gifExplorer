import { useContext } from "react";
import { GifStateContext } from "../../context/gifContext/GifContext";
import { State } from "../../context/gifContext/gifReducer";

export function useGifState(): State {
  const context = useContext(GifStateContext);
  if (!context)
    throw new Error("useGifState must be used within a GifProvider");
  return context;
}
