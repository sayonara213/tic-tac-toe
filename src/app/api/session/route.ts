import { ensureUser, handle } from '@/lib/server/auth';

export const dynamic = 'force-dynamic';

/** Signs the visitor in (creating an anonymous account on first visit). */
export const POST = handle(async () => {
  const { uid, userName } = await ensureUser();
  return Response.json({ uid, userName });
});
