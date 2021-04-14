export default function (
  state = false,
  action: { type: string; payload: boolean }
) {
  switch (action.type) {
    case "TOGGLE_LOADING":
      return action.payload;
    default:
      return state;
  }
}
