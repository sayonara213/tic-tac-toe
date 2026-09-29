import { handle } from '@/lib/server/auth';
import { getHistory } from '@/lib/server/games';

export const dynamic = 'force-dynamic';

/** Past round winners, newest first. */
export const GET = handle(async (_req: Request, ctx: RouteContext<'/api/games/[id]/history'>) => {
  const { id } = await ctx.params;
  return Response.json(await getHistory(id));
});
