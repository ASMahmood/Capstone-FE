import { initalState } from "../store";
export default function (
  state = initalState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "POPULATE_ROOM":
      return {
        ...state,
        ...action.payload,
      };
    case "ADD_MESSAGE_TO_CHAT":
      return {
        ...state,
        chatHistory: state.room.chatHistory.concat(action.payload),
      };
    default:
      return state;
  }
}
