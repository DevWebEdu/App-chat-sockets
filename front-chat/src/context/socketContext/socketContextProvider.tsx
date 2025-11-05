import { useEffect, useRef, useState } from "react";
import { SocketContext } from "./SocketContext";
import { io, Socket } from "socket.io-client";
import type { MessageType, RoomType } from "../../types/ChatTypes";
import type { userResponseType } from "../../types/AuthTypes";

export const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentRoom, setCurrentRoom] = useState<string>("");
  const currentRoomRef = useRef<string>("");
  // evaluar si  es necesario enviar el nombre de la sala por url o con el estado es suficiente
  const [messages, setMessages] = useState<{ [room: string]: MessageType[] }>(
    {}
  );
  const socketRef = useRef<Socket | null>(null);
  const [usersConnected, setUsersConnected] = useState<string[]>([]);
  //const [messages, setMessages] = useState<MessageType[]>([])
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [advises, setAdvises] = useState<string>("");
  const [advisesToRoom, setAdvisesToRoom] = useState<string>("");
  const [error , setError ] = useState<string>('')
  const [deletedNotification , setDeleteNotification] = useState<string>('')


  const serverUrl = import.meta.env.VITE_API_URL;

  // Función para actualizar currentRoom y su referencia
  const updateCurrentRoom = (roomName: string) => {
    setCurrentRoom(roomName);
    currentRoomRef.current = roomName;
  };

  const connect = (user: userResponseType) => {
    if (socketRef.current?.connected) return;

    socketRef.current = io(serverUrl, {
      transports: ["websocket"],
      autoConnect: false,
    });

    const socket = socketRef.current;
    socket.connect();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
    // eventos que vienen del back
    socket.on("user_connected", (user: any) => {
      setUsersConnected((prev) => {

        // Si ya existe, no lo agregues
        if (prev.includes(user.username)) return prev;

        // Si no existe, agrégalo
        return [...prev, user.username];
      });

    });

    // seteamos los mensajes con 'send_message'
    socket.on("print_message", ({ room, message }) => {
      setMessages((prev) => ({
        ...prev,
        [room]: [...(prev[room] || []), message],
      }));
    });

    // Cuando se crea la sala
    socket.on("sala_creada", ({ message, roomName }) => {
      setAdvises(message);
    });

    // Al inicializar Traemos todos los rooms -> la vamos a usar para actualizar los rooms cada vez que se una alguien
    socket.on("get_rooms", ({ rooms }) => {
      setRooms(rooms);
    });

    socket.on("load_messages", ({ room, messages }) => {
      setMessages((prev) => ({
        ...prev,
        [room]: messages,
      }));
      updateCurrentRoom(room);
    });

    // Cuando un usuario se une a la sala
    socket.on("user_joined", ({ message, roomName }) => {
      // Solo mostrar si es para la sala actual
      if (roomName === currentRoomRef.current) {
        setAdvisesToRoom(message);
      }
    });

    // controlador de Errores en TOAST
    socket.on("error", ({error}) => {
      setError(error)
    })

    // Notificacion de Eliminacion correcta de room y redireccionamiento a la sala lobby
    socket.on("notification_deleted_room",  ({message}) => {
   
        setDeleteNotification(message)
        //updateCurrentRoom('lobby')

    })

    socket.on("disconnect", (cause) => {
      console.log(cause);
    });
  };

  const setterUserConnected = (user: userResponseType) => {
    socketRef.current?.emit("greetings", user);
  };

  const sendMessage = (msg: MessageType, room: string) => {
    socketRef.current?.emit("message_recieve", msg, room);
  };

 
  const joinRoom = (room: RoomType, user: userResponseType | undefined) => {
    // Limpiar notificaciones anteriores al cambiar de sala
    setAdvisesToRoom("");
    setAdvises("");
    //por el momento del objeto completo
    socketRef.current?.emit("join_to_room", room, user);
  };

  //creacion de los rooms
  const createRoom = (room: RoomType, user: userResponseType | undefined) => {
    socketRef.current?.emit("create_room", room, user);
  };

  //eliminacion de la sala
  const deleteRoom = ( roomId : string ) => {
    socketRef.current?.emit("delete_room",roomId )
    
  }

  useEffect(() => {
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socketRef.current,
        usersConnected,
        connect,
        setterUserConnected,
        sendMessage,
        messages,
        joinRoom,
        createRoom,
        deleteRoom,
        rooms,
        advises,
        advisesToRoom,
        currentRoom,
        error,
        deletedNotification,
        setDeleteNotification
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
