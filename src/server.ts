import express, { Express, Request, Response } from 'express';
import { Server } from 'socket.io'
import { v4 as uuidv4 } from 'uuid';
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from './types/Socket.types';
const cors = require('cors')

import dotenv from 'dotenv';
dotenv.config();

// App setup
const PORT = 5000;
const app = express();
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

const corsOptions = {
  origin: process.env.FE_CORS_URL,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(server, {
  cors:{
    origin: process.env.FE_CORS_URL,
    methods: [ 'GET', 'POST' ]
  }
});

app.use(cors())

const SocketIDSet = new Set<string>()

io.on("connection", (socket) => {
  const { id } = socket

  // socket.on("message", () => {
  //   console.log("New message")
  // })

  socket.on("disconnect", () =>{
    console.log(`Closed connection for socket.${id}`)
    SocketIDSet.delete(id)
  })

  SocketIDSet.add(id)

  io.emit("current-connections", [...SocketIDSet] )
});

const serverShutdown = () =>{
  server.close(() => {
    SocketIDSet.clear()
    console.log('Closed out remaining connections');
    process.exit(0);
  });

}

process.on('SIGTERM', serverShutdown);
process.on('SIGINT', serverShutdown);