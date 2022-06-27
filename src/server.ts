import express, { Express, Request, Response } from 'express';
import { Server } from 'socket.io'
import { v4 as uuidv4 } from 'uuid';
import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from './types/Socket.types';
const cors = require('cors')

import dotenv from 'dotenv';
import { Scene } from './models/Scene.model';
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
const currentScene = new Scene()

io.on("connection", (socket) => {
  const { id } = socket
  const uuid = uuidv4()
  // socket.on("message", () => {
  //   console.log("New message")
  // })

  socket.on("disconnect", () =>{
    console.log(`Closed connection for socket.${id} for session ${uuid}`)
    socket.broadcast.emit("remove-session", uuid);
    currentScene.removeUser(uuid)
    SocketIDSet.delete(id)
  })

  socket.on("update-player-pos", (uuid, posX, posY, currentAnim) =>{
    socket.broadcast.emit("update-player-pos", uuid, posX, posY, currentAnim);
    currentScene.handeUserMovement(uuid, posX, posY)
  })

  console.log(`New socket ${id} for session ${uuid}`)
  SocketIDSet.add(id)
  currentScene.addUser(uuid)
  io.emit("new-connection", uuid, currentScene.obtainCurrentSceneInfo())
  // io.emit("current-scene-info", currentScene.obtainCurrentSceneInfo())
});

const serverShutdown = () =>{
  server.close(() => {
    SocketIDSet.clear()
    currentScene.shutdownScene()
    console.log('Closed out remaining connections');
    process.exit(0);
  });

}

process.on('SIGTERM', serverShutdown);
process.on('SIGINT', serverShutdown);