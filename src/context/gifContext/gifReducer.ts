import { CardItem } from "../../types";

export type Action =
  | { type: "ADD_GIF"; gif: CardItem }
  | { type: "REMOVE_GIF"; id: string }
  | { type: "LOAD_SAVED_GIFS"; gifs: CardItem[] };

export type State = { savedGifs: CardItem[] };

export function gifReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_GIF":
      return { ...state, savedGifs: [...state.savedGifs, action.gif] };
    case "REMOVE_GIF":
      return {
        ...state,
        savedGifs: state.savedGifs.filter((gif) => gif.id !== action.id),
      };
    case "LOAD_SAVED_GIFS":
      return { ...state, savedGifs: action.gifs };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
}
