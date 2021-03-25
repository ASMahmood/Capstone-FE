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
  createdAt: Date;
  attachment: string;
}

export interface canvasData {
  canvasData: string;
  roomId: string;
}
