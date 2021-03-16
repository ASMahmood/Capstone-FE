export default function (state = {}, action: { type: string; payload: any }) {
  switch (action.type) {
    case "POPULATE_ROOM":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
