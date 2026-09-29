import { handle, readJson, requireUser } from '@/lib/server/auth';
import { renameUser } from '@/lib/server/games';

export const dynamic = 'force-dynamic';

export const GET = handle(async () => {
  const { uid, userName } = await requireUser();
  return Response.json({ uid, userName });
});

export const PATCH = handle(async (req: Request) => {
  const user = await requireUser();
  const body = await readJson<{ userName: string }>(req);
  return Response.json(await renameUser(user.uid, body.userName));
});
