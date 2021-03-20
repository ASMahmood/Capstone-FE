export interface reduxStore {
  user: {
    _id: string;
    email: string;
    username: string;
    friends: {}[];
    rooms: {
      _id: string;
      canvases: {}[];
      participants: {}[];
      onlineParticipants: {}[];
      name: string;
    }[];
    profilePic: string;
  };
  error: {
    message: string;
    code: number;
    severity: string;
  };
  loading: boolean;
  room: {
    canvases: {}[];
    participants: {}[];
    onlineParticipants: {}[];
    name: string;
    _id: string;
  };
}

export interface individualRoom {
  _id: string;
  canvases: {}[];
  participants: {}[];
  onlineParticipants: {}[];
  name: string;
}
