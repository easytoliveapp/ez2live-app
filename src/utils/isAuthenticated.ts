import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function isAuthenticated(request: NextRequest) {
  const token = await getToken({ req: request });

  return token;
}
