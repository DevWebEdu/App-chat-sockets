import { createContext } from "react";
import type { Socket } from "socket.io-client";
import type { RoomType } from "../../types/ChatTypes";
import type { userResponseType } from "../../types/AuthTypes";

type SocketContextType = {
  socket: Socket | null;
  usersConnected: Array<string> | null;
  messages: any;
  connect: (user: any) => void;
  setterUserConnected: (user: any) => void;
  sendMessage : (msg : { content : string , timestamps : string , username : string} , room : string) => void 
  joinRoom : (room: RoomType, user: userResponseType | undefined) => void
  createRoom : (room: RoomType, user: userResponseType | undefined) => void
  deleteRoom : (roomId : string ) => void
  rooms : RoomType[]
  advises : string , 
  advisesToRoom : string,
  currentRoom : string,
  error : string,
  deletedNotification : string,
  setDeleteNotification : ( msg : string) => void
};

export const SocketContext = createContext<SocketContextType | null>(null); 