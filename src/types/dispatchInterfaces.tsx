export interface populateUserDispatch {
  populateUser: (user: object) => { type: string; payload: object };
}
