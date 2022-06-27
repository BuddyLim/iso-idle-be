import { CurrentSceneInfoInterface } from "./Scene.type";
import { UserClassInterface } from "./User.types";

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  message: (callback: () => void) => void;
  "current-connections": (listOfID: Array<string>) => void;
  "new-connection": (uuid: string, currentSceneInfo: CurrentSceneInfoInterface) => void;
  "session-id": (uuid: string) => void;
  "current-scene-info": (currentSceneInfo: CurrentSceneInfoInterface ) => void;
  "update-player-pos": (uuid:string, posX: number, posY: number, currentAnim: string) => void;
  "remove-session": (uuid:string) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  "update-player-pos": (uuid:string, posX: number, posY: number, currentAnim: string) => void;
  message: (callback: () => void) => void;

}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}