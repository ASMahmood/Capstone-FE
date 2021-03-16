export interface history {
  user: {
    email: string;
    username: string;
    friends: {}[];
    rooms: {}[];
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
  };
}

export interface MatchParams {
  id: string;
}
