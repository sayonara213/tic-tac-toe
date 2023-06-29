import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../components/global/App';
import { FieldEntity } from '../models/game/field/FieldEntity';
import { crossOrCircle } from './random';
import { IPlayer } from '../types/user.types';

export const fetchField = async (id: string) => {
  const docRef = doc(db, 'games', id);
  const tempField = (await getDoc(docRef)) as any;
  const newField = new FieldEntity();
  newField.cells = JSON.parse(tempField.data().field);

  return newField;
};

export const restartGameService = async (gameRef: any, field: FieldEntity, players: IPlayer[]) => {
  const randomMove = crossOrCircle();

  await updateDoc(gameRef, {
    nextMove: 'circle',
    field: JSON.stringify(field.cells),
    isWin: false,
    players: [
      {
        uid: players[0].uid,
        move: randomMove,
        winCount: players[0].winCount,
      },
      {
        uid: players[1].uid,
        move: randomMove === 'circle' ? 'cross' : 'circle',
        winCount: players[1].winCount,
      },
    ],
  });
};

export const addPlayerService = async (gameRef: any, players: IPlayer[], userId: string) => {
  await updateDoc(gameRef, {
    players: players,
  });
};

export const handleWinHistoryService = async (
  gameRef: any,
  winner: IPlayer,
  players: IPlayer[],
) => {
  const winnerPlayerIndex = players.findIndex((player: IPlayer) => player.uid === winner.uid);
  players[winnerPlayerIndex].winCount = players[winnerPlayerIndex].winCount + 1;

  await updateDoc(gameRef, {
    isWin: true,
    players,
  });

  await addDoc(collection(gameRef, 'history'), {
    move: winner.move,
    timestamp: new Date(),
    winner: winner.uid,
  });
};
