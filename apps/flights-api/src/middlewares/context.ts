import * as trpcNext from '@trpc/server/adapters/next';
import { verify } from 'jsonwebtoken';

export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {

  async function authenticate() {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const user = await verify(token, process.env.ACCESS_TOKEN_SECRET);
      return user;
    }
    return null;
   }
  const user = await authenticate();

  return {
    user,
    req,
    res,
  };
}
export type Context = Awaited<ReturnType<typeof createContext>>;