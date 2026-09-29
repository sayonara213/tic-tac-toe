import { handle, requireUser } from '@/lib/server/auth';
import { restartGame } from '@/lib/server/games';

export const dynamic = 'force-dynamic';

export const POST = handle(async (_req: Request, ctx: RouteContext<'/api/games/[id]/restart'>) => {
  const user = await requireUser();
  const { id } = await ctx.params;
  return Response.json(await restartGame(id, user.uid));
});
