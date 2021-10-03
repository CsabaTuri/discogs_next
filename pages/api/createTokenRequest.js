import Ably from "ably/promises";

export default async function handler(req, res) {
  console.log("o6Prnw.3fmkqw:dMQtfFgs7L_tjDj4");
  const client = new Ably.Realtime("o6Prnw.3fmkqw:dMQtfFgs7L_tjDj4");
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: "ably-nextjs-demo",
  });
  res.status(200).json(tokenRequestData);
}
