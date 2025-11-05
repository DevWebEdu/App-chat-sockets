import colors from 'colors'
import { httpServer } from './server'

const port = process.env.PORT || 5000



httpServer.listen(port, () => {
    console.log(colors.blue.bold(`Servidor Funcionando en el puerto ${port}`))
})

// import express from "express";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import cors from "cors";

// const app = express();
// app.use(cors()); // permitir conexiones desde el front

// const server = createServer(app);

// // Inicializar socket.io en el servidor HTTP
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173", // tu frontend en React
//     methods: ["GET", "POST"]
//   }
// });

// // Escuchar conexiones
// io.on("connection", (socket) => {
//   console.log("Cliente conectado:", socket.id);

//   // Escuchar evento desde el cliente
//   socket.on("mensaje", (data) => {
//     console.log("Mensaje recibido:", data);

//     // reenviar a todos los clientes
//     io.emit("mensaje", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("Cliente desconectado:", socket.id);
//   });
// });

// const PORT = 5000;
// server.listen(PORT, () => {
//   console.log(`Servidor escuchando en http://localhost:${PORT}`);
// });