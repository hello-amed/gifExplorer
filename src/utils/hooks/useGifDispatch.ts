import { useContext } from "react";
import { GifDispatchContext } from "../../context/gifContext/GifContext";
import { Action } from "../../context/gifContext/gifReducer";

export function useGifDispatch(): React.Dispatch<Action> {
  const context = useContext(GifDispatchContext);
  if (!context)
    throw new Error("useGifDispatch must be used within a GifProvider");
  return context;
}
