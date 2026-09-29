import { handle, readJson, requireUser } from '@/lib/server/auth';
import { makeMove } from '@/lib/server/games';

export const dynamic = 'force-dynamic';

export const POST = handle(async (req: Request, ctx: RouteContext<'/api/games/[id]/move'>) => {
  const user = await requireUser();
  const { id } = await ctx.params;
  const { cell } = await readJson<{ cell: number }>(req);
  return Response.json(await makeMove(id, user.uid, cell));
});
