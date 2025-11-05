import { useContext } from "react";
import { SocketContext } from "../context/socketContext/SocketContext";


export const useSocketHook = () => {
  const ctx = useContext(SocketContext);
  if (!ctx) throw new Error("useSocketHook debe usarse dentro de <SocketProvider>");
  return ctx;
};