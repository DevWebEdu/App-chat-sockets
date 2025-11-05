import express from "express";
import 'dotenv/config.js'
import { authRouter } from "./router/authRouter";
import { Server } from "socket.io";
import cors from 'cors'
import { dbConnection } from "./config/db";
import colors from 'colors'
import { createServer } from "http";
import { SocketHandlers } from "./socket/SocketHandlers";

export const app = express();
app.use(cors())

export const httpServer = createServer(app)
// aceptamos el formato json
app.use(express.json())

// agregamos la coneccion a la bd
dbConnection()

// routers
app.use('/api/auth/',authRouter)


// Inicializar socket.io en el servidor HTTP
export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // tu frontend en React
    methods: ["GET", "POST"]
  }
});


SocketHandlers(io)

