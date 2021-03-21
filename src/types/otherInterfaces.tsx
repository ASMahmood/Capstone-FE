export interface currentLineInfo {
  x: number;
  y: number;
}

export interface joinLeaveRoomSocketData {
  roomId: string;
  username: string;
  userId: string;
}

export interface chatMessage {
  sender: string;
  text: string;
  createdAt: string;
}
