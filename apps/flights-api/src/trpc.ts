import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './middlewares/context'
 

export const t = initTRPC.context<Context>().create();

export const isAuthenticated = t.middleware(({ ctx, next }) => {
    const { req } = ctx;
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    } 
    
    return next();
})