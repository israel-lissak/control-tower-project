import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './middlewares/context'
 

export const t = initTRPC.context<Context>().create();