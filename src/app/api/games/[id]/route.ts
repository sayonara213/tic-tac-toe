import { handle } from '@/lib/server/auth';
import { getGame } from '@/lib/server/games';

export const dynamic = 'force-dynamic';

export const GET = handle(async (_req: Request, ctx: RouteContext<'/api/games/[id]'>) => {
  const { id } = await ctx.params;
  return Response.json(await getGame(id));
});
