"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
// const socket = require("socket.io");
const cors = require('cors');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// App setup
const PORT = 5000;
const app = (0, express_1.default)();
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
const corsOptions = {
    origin: process.env.FE_CORS_URL,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const io = new socket_io_1.Server(server, {
    cors: {
        origin: process.env.FE_CORS_URL,
        methods: ['GET', 'POST']
    }
});
app.use(cors());
io.on("connection", (socket) => {
    socket.on("message", () => {
        console.log("New message");
    });
    socket.on("disconnect", () => {
        console.log("Closed connection");
    });
    console.log("Made socket connection");
});
