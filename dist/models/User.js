"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const defaultPosX = 0;
const defaultPosY = 0;
class User {
    constructor(uuid) {
        this.updateUserPosition = (newPosX, newPosY) => {
            this.posX = newPosX;
            this.posY = newPosY;
        };
        this.uuid = uuid;
        this.posX = defaultPosX;
        this.posY = defaultPosY;
    }
}
exports.User = User;
