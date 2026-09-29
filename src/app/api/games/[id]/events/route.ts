import { handle } from '@/lib/server/auth';
import { subscribeGame } from '@/lib/server/events';
import { getGame } from '@/lib/server/games';

export const dynamic = 'force-dynamic';

/**
 * Server-Sent Events stream of a game's state: one `game` event on connect and
 * one after every change. Replaces Firestore's onSnapshot listener.
 */
export const GET = handle(async (req: Request, ctx: RouteContext<'/api/games/[id]/events'>) => {
  const { id } = await ctx.params;
  await getGame(id); // 404 before opening the stream

  const encoder = new TextEncoder();
  let cleanup = () => {};

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      let closed = false;
      const send = (chunk: string) => {
        if (!closed) controller.enqueue(encoder.encode(chunk));
      };
      const push = async () => {
        try {
          send(`event: game\ndata: ${JSON.stringify(await getGame(id))}\n\n`);
        } catch {
          /* game vanished; keep the stream quiet */
        }
      };
      const unsubscribe = subscribeGame(id, push);
      const ping = setInterval(() => send(': ping\n\n'), 25_000);
      cleanup = () => {
        if (closed) return;
        closed = true;
        clearInterval(ping);
        unsubscribe();
        try {
          controller.close();
        } catch {}
      };
      req.signal.addEventListener('abort', cleanup);
      send('retry: 2000\n\n');
      push();
    },
    cancel() {
      cleanup();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
});
