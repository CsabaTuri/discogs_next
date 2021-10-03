import jwt from "jsonwebtoken";
require('dotenv').config();
console.log(process.env.PUBLIC_KEY)
const publicKey:string = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHCTviWIVte2drMK3mqMR369zokb
3m+/ZkfHNP1e78PA/ZqWVkyEc53eu/qjRZl7nUH+1sk54feArlN7Q31oq2RnNOpx
OYtHbrMWI5mvyuC8clne2wRNS2xYlDJyfj5LiIcd9B1GvnONUaNzrePfXiG/xl/q
asE3tyJkaRhElzVpAgMBAAE=
-----END PUBLIC KEY-----`;

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
