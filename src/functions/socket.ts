import io from "socket.io-client";
import {
  joinLeaveRoomSocketData,
  chatMessage,
  canvasData,
} from "../types/otherInterfaces";

type chatWithId = chatMessage & { roomId: string };

const connOpt = {
  transports: ["websocket"],
};

let socket = io(process.env.REACT_APP_BACKEND_URL as string, connOpt);

export const joinRoom = (data: joinLeaveRoomSocketData) => {
  socket.emit("JOIN_ROOM", data);
};

export const leaveRoom = (data: joinLeaveRoomSocketData) => {
  socket.emit("LEAVE_ROOM", data);
};

export const receiveDrawing = (drawfunc: (data: any) => void) => {
  socket.on("drawing", drawfunc);
};

export const sendDrawing = (data: any) => {
  socket.emit("drawing", data);
};

export const sendCanvasData = (data: canvasData) => {
  socket.emit("CANVAS_DATA", data);
};

export const listenChat = (
  chatFunc: (data: chatMessage) => void,
  secFunc?: () => void
) => {
  console.log("socket.ts listen");
  socket.on("CHAT_MESSAGE", chatFunc);
  if (secFunc) secFunc();
};

export const sendChat = (data: chatWithId) => {
  socket.emit("CHAT_MESSAGE", data);
};
