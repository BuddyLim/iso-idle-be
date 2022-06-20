import express, { Express, Request, Response } from 'express';
import { Server } from 'socket.io'
// const socket = require("socket.io");
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

const io = new Server(server, {
  cors:{
    origin: process.env.FE_CORS_URL,
    methods: [ 'GET', 'POST' ]
  }
});

app.use(cors())

io.on("connection", (socket) => {
  socket.on("message", () => {
    console.log("New message")
  })

  socket.on("disconnect", () =>{
    console.log("Closed connection")
  })
  console.log("Made socket connection");
});