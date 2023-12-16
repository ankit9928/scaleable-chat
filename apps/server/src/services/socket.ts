import { Server } from "socket.io";
import { Redis } from "ioredis";

const pub = new Redis({
  host: "redis-2864437e-ankit9928meena-ecde.a.aivencloud.com",
  port: 13261,
  username: "default",
  password: "AVNS_--1eg8SOFEDTe-V4yWi",
});
const sub = new Redis({
  host: "redis-2864437e-ankit9928meena-ecde.a.aivencloud.com",
  port: 13261,
  username: "default",
  password: "AVNS_--1eg8SOFEDTe-V4yWi",
});

class SocketService {
  private _io: Server;

  constructor() {
    console.log("Init Socket service...");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
  }

  public initListeners() {
    const io = this.io;
    console.log("Init Socket Listeners...");

    io.on("connect", async (socket) => {
      console.log(`New Socket Connected`, socket.id);
      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log(`New Message Rec.`, message);
        // publish this mess to redis

        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
