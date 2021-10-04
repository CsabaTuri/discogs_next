import jwt from "jsonwebtoken";
const fs = require('fs');
var publicKey = fs.readFileSync('public.key');

async function isAuth(token: string): Promise<void> {
  return await jwt.verify(
    token,
    publicKey,
    { algorithms: ["RS256"] },
    async function (err: any, decoded: any) {
      if (err) {
        return false;
      }
      return decoded;
    }
  );
}
module.exports = isAuth;
