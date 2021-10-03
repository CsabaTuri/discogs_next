import { NextApiResponseServerIO } from "../../types";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async ( res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log("New Socket.io server...");
    // adapt Next's net Server to http Server
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/socketio",
      cors: {
        origin: '*',
        methods: ["GET", "POST"]
      }
    });
    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;
  }
};