export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  message: (callback: () => void) => void;
  "current-connections": (listOfID: Array<string>) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  message: (callback: () => void) => void;

}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}