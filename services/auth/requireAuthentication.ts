const isAuth: any = require("./tokenAuth");
import { CTX } from "../../types"

export function requireAuthentication(gssp: any) {
  return async (context: CTX) => {
    const token: string = context?.req?.cookies ? JSON.parse(JSON.stringify(context.req.cookies)).token : "";
    const auth: boolean = await isAuth(token);
    if (!auth) {
      // Redirect to login page
      return {
        redirect: {
          destination: "/login",
          statusCode: 302,
        },
      };
    }

    return await gssp(context);
  };
}
