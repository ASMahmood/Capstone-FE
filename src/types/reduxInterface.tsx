export interface reduxStore {
  user: {
    email: String;
    username: String;
    friends: {}[];
    rooms: {}[];
    profilePic: String;
  };
  error: {
    message: String;
    code: Number;
    severity: String;
  };
  loading: Boolean;
  room: {
    canvases: {}[];
    participants: {}[];
    onlineParticipants: {}[];
    name: String;
  };
}
