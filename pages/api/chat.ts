import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../types";
const { Message } = require("../../services/graphql/mongodb/models/message");

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    try {
      const message = req.body;
      // dispatch to channel "message"
      res?.socket?.server?.io?.emit("message", message);
      const msg = new Message(message);
      await msg.save();
      // return message
      res.status(201).json(message);
    } catch (err) {
      console.log({ err: err })
      throw new Error("database error");
    }
  }
};