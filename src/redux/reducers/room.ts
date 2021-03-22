export default function (
  state = { chatHistory: [] },
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
        chatHistory: state.chatHistory.concat(action.payload),
      };
    default:
      return state;
  }
}
