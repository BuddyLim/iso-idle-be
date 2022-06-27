"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scene = void 0;
const uuid_1 = require("uuid");
const User_1 = require("./User");
class Scene {
    constructor() {
        this.obtainCurrentSceneInfo = () => {
            return Object.fromEntries(this.listOfUser);
        };
        this.addUser = (uuid) => {
            const newUser = new User_1.User(uuid);
            this.listOfUser.set(uuid, newUser);
        };
        this.handeUserMovement = (uuid, newPosX, newPosY) => {
            const movingUser = this.listOfUser.get(uuid);
            if (movingUser !== undefined) {
                movingUser.updateUserPosition(newPosX, newPosY);
                this.listOfUser.set(uuid, movingUser);
                return;
            }
            this.listOfUser.delete(uuid);
        };
        this.removeUser = (uuid) => {
            this.listOfUser.delete(uuid);
        };
        this.shutdownScene = () => {
            this.listOfUser.clear();
        };
        this.id = (0, uuid_1.v4)();
        this.listOfUser = new Map();
    }
}
exports.Scene = Scene;
