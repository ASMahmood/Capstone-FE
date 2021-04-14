export interface populateUserDispatch {
  populateUser: (user: object) => { type: string; payload: object };
}

export interface populateRoomDispatch {
  populateRoom: (room: object) => { type: string; payload: object };
}

export interface messageDispatch {
  newMessage: (message: object) => { type: string; payload: object };
}

export interface loaderDispatch {
  toggleLoader: (current: boolean) => { type: string; payload: boolean };
}
