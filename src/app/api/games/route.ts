import { handle, requireUser } from '@/lib/server/auth';
import { createGame, listGamesFor } from '@/lib/server/games';

export const dynamic = 'force-dynamic';

/** Games the current user plays in, newest first. */
export const GET = handle(async () => {
  const user = await requireUser();
  return Response.json(await listGamesFor(user.uid));
});

export const POST = handle(async () => {
  const user = await requireUser();
  return Response.json(await createGame(user.uid), { status: 201 });
});
