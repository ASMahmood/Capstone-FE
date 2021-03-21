import { listenChat } from "./socket";
import { chatMessage } from "../types/otherInterfaces";
import { reduxStore } from "../types/reduxInterface";

export const mainChat = async (props: reduxStore) => {
  const handleMessage = (data: chatMessage) => {};
  listenChat(handleMessage);
};
