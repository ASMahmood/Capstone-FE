export default function (
  state = false,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "TOGGLE_LOADING":
      return action.payload;
    default:
      return state;
  }
}
