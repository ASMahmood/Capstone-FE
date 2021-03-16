export interface populateUserDispatch {
  populateUser: (user: object) => { type: string; payload: object };
}

export interface populateRoomDispatch {
  populateRoom: (room: object) => { type: string; payload: object };
}
