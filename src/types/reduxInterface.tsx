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
      chatHistory: {
        sender: string;
        text: string;
        createdAt: string;
        attachment: string;
      }[];
      name: string;
      images: string;
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
    chatHistory: {
      sender: string;
      text: string;
      createdAt: string;
      attachment: string;
    }[];
    name: string;
    _id: string;
    images: string;
  };
}

export interface individualRoom {
  _id: string;
  canvases: {}[];
  participants: {}[];
  onlineParticipants: {}[];
  chatHistory: {}[];
  name: string;
  images: string;
}

export interface individualMessage {
  sender: string;
  text: string;
  createdAt: string;
  attachment: string;
}
