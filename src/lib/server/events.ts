import 'server-only';
import { EventEmitter } from 'node:events';

// In-process pub/sub that replaces Firestore's realtime listeners.
// The SSE route subscribes per game; mutations publish after they persist.

const g = globalThis as unknown as { __tttBus?: EventEmitter };
const bus = (g.__tttBus ??= new EventEmitter().setMaxListeners(0));

export const publishGame = (gameId: string) => bus.emit(`game:${gameId}`);

export function subscribeGame(gameId: string, fn: () => void) {
  bus.on(`game:${gameId}`, fn);
  return () => {
    bus.off(`game:${gameId}`, fn);
  };
}
