import io from "socket.io-client";
import { joinLeaveRoomSocketData, chatMessage } from "../types/otherInterfaces";

type chatWithId = chatMessage & { roomId: string };

const connOpt = {
  transports: ["websocket"],
};

let socket = io("http://localhost:3333", connOpt);

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

export const listenChat = (chatFunc: (data: chatMessage) => void) => {
  socket.on("CHAT_MESSAGE", chatFunc);
};

export const sendChat = (data: chatWithId) => {
  socket.emit("CHAT_MESSAGE", data);
};
