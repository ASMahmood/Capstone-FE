import io from "socket.io-client";
import { joinLeaveRoomSocketData } from "../types/otherInterfaces";

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
