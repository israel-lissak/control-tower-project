import { TRPCError } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { verify } from 'jsonwebtoken';

export async function createContext({ req }: trpcNext.CreateNextContextOptions) {
 
  const token = req.headers.authorization?.split(' ')[1];

  verify(token, process.env.ACCESS_TOKEN_SECRET);

  return {}

}
export type Context = Awaited<ReturnType<typeof createContext>>;