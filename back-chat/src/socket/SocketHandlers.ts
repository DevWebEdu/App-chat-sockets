import { Socket, Server } from "socket.io";
import User from "../model/User";
import Room from "../model/Room";
import Message from "../model/Message";

const getTime = () => {
  const fecha = new Date();
  const horaMinuto = fecha.toLocaleTimeString([], {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return horaMinuto;
};

export const SocketHandlers = (io: Server) => {
  io.on("connection", async (socket: Socket) => {
    socket.join("lobby");
    
    
    // init function
    socket.on("greetings", async (user) => {
      if (user.data.status === "online") {
        // Cuando es por primera vez
        // El usuario ingresara, y se hara una verificacion para saber si existe o no el room lobby
        // Si no existe se creara y se seguira con el flujo

        try {
          const roomLobbyExist = await Room.findOne({ name: "lobby" });
          if (!roomLobbyExist) {
            //En caso no exista lo guardamos
            await Room.create({
              createdBy: user.data._id,
              members: [user.data._id],
              name: "lobby",
              createDate: getTime(),
            });
            const roomsCurrently = await getRooms();
            io.emit("get_rooms", {
              rooms: roomsCurrently,
            });
          } else {
            await Room.findOneAndUpdate(
              { name: "lobby" },
              { $addToSet: { members: user.data._id } },
              { new: true, upsert: true }
            );
          }

          const roomsCurrently = await getRooms();
          io.emit("get_rooms", {
            rooms: roomsCurrently,
          });
        } catch (error) {
          socket.emit("error", { error: error.message });
        }

        // no existe else, por que en caso exista seguimos con el flujo
        // y en caso de que no exista lo creamos y nuevamente seguimos con el flujo
        socket.join("lobby");
        // lo extraemos por si es necesario el dato
        socket.data.username = user.data.username;

        if (user.data.fullname) {
          socket.broadcast.emit("user_connected", {
            username: user.data?.username,
          });
        }
      } else {
        socket.emit("error", {
          error: "Debes estar online para ingresar, Logueate Por favor",
        });
      }
    });

    // Al iniciar sesion traemos todos los rooms luego de greetings
    const rooms = await getRooms();
    io.emit("get_rooms", { rooms });

    //unirse a una sala
    socket.on("join_to_room", async (room, user) => {
      // console.log(room)
      // console.log(user)
      // validamos que el room exista
      try {
        // Primero salir de todas las salas (excepto la sala personal del socket)
        const currentRooms = Array.from(socket.rooms);
        currentRooms.forEach((roomName) => {
          if (roomName !== socket.id) {
            socket.leave(roomName);
          }
          // por cada roomName se buscar el room en la base de dato y eliminamos el usuario de los members
          if (roomName === "lobby") return; // no sacar del lobby
          Room.findOneAndUpdate(
            { name: roomName },
            { $pull: { members: user.data._id } } // elimina el user de members
          ).exec();
        });

        const roomExists = await Room.findOne({ name: room.name });

        if (roomExists) {
          await Room.findOneAndUpdate(
            { name: room.name },
            { $addToSet: { members: user.data._id } }, // agrega solo si no existe
            { new: true } // new = devuelve el doc actualizado, upsert = crea si no existe
          );

          socket.join(room.name);

          // aca ya no es necesario enviar el roomname por que mas abajo cargamos los mensaje del chat

          const messages = await Message.find({ room: roomExists._id })
            .populate("sender", "username") // si quieres traer username
            .sort({ createdTime: 1 }); // mensajes en orden ascendente
          //console.log(messages)
          // enviar solo al usuario que entra
          socket.emit("load_messages", { room: room.name, messages });

          const roomsCurrently = await getRooms();
          io.emit("get_rooms", {
            rooms: roomsCurrently,
          });

          socket.broadcast.to(room.name).emit("user_joined", {
            message: `el usuario ${user.data.username} ingresó a la sala ${room.name}`,
            roomName: room.name,
          });
        } else {
          socket.emit("error", {
            error: "No existe la sala a que deseas ingresar",
          });
          return;
        }
      } catch (error) {
        socket.emit("error", { error: error.message });
      }
    });

    //Creacion de Rooms
    // Obtenemos todo el objeto del room
    // Obtenemos solo el _id del user
    socket.on("create_room", async (room, user) => {
      
      try {
        const roomExists = await Room.findOne({ name: room.name });
       
        if (!roomExists) {
       
          await Room.create({
            createDate: getTime(),
            createdBy: user.data._id,
            name: room.name,
            members: [],
          });
        } else {
          // los emits 'error' se envian por toast
          socket.emit("error", { error: "Una sala con ese nombre ya existe" });
          return;
        }
      } catch (error) {
        socket.emit("error", { error: error.message });
      }


      io.to(room.name).emit("sala_creada", {
        message: `el usuario ${user.data.username} ha creado la sala ${room.name}`,
        roomName: room.name,
      });

      const currentlyRooms = await getRooms();
      io.emit("get_rooms", {
        rooms: currentlyRooms,
      });
    });

    //Creacion de mensajes
    socket.on("message_recieve", async (msg, room) => {
      /*
                Objeto recibido
                { username: 'Dipolo17@', content: 'Hola' }
                pan_con_
            */
      const roomExist = await Room.findOne({ name: room });
      const userExist = await User.findOne({ username: msg.username });
      if (roomExist) {
        const newMessage = await Message.create({
          content: msg.content,
          createdTime: getTime(),
          room: roomExist._id,
          sender: userExist._id,
        });

        const populated = await newMessage.populate("sender", "username");

        io.to(room).emit("print_message", { room: room, message: populated });
      } else {
        socket.emit("error", {
          error: "La sala a la que quieres enviar un mensaje no existe",
        });
      }
    });

    //Eliminacion de sala
    socket.on("delete_room", async (roomId: string) => {
      try {

        const roomExists = await Room.findByIdAndDelete(roomId);
       
        if (!roomExists) {
          socket.emit("error", {
            error: "No existe la sala a que deseas eliminar",
          });
          return;
        }

        if (roomExists.name !== "lobby") {
          // ELiminamos el room
          await Room.deleteOne({ name: roomExists.name });
          // Eliminamos los mensajes del room
          await Message.deleteMany({ room: roomId });
          //sacando al socket del room
          const currentRooms = Array.from(socket.rooms);
          currentRooms.forEach((roomName) => {
            if (roomName !== socket.id) {
              socket.leave(roomName);
            }
          });
          // Informamos con una notificacion que el room fue elimado exitosamente
          io.emit("notification_deleted_room", {
            message: "Sala eliminada Correctamente",
          });

          const rooms = await getRooms();
          io.emit("get_rooms", { rooms });
        }
      } catch (error) {
        socket.emit("error", { error: error.message });
      }
    });
    
    socket.on("disconnect", () => {
      //SocketFunctions.disableUserToChat(socket)
      //console.log(socket.connected)
    });
  });
};

// 1 . dentro de connection agregar ValidateUser
const getRooms = async () => {
  const rooms = await Room.find();
  return rooms;
};
