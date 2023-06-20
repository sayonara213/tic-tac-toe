import { doc, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { FieldEntity } from '../../models/game/field/FieldEntity';
import { GameEntity } from '../../models/game/game/GameEntity';
import { getUid } from '../../services/auth';
import { IPlayer } from '../../types/field.types';
import { db } from '../global/App';

export const useGameState = (gameId: string) => {
  const [game, setGame] = useState(new GameEntity(new FieldEntity(), 'multiplayer', 'circle'));
  const [field, setField] = useState(game.field);
  const [isWin, setIsWin] = useState(false);
  const [isFull, setIsFull] = useState(false);

  const gameRef = doc(db, 'game', gameId);

  const [fetchedField, fieldLoading, fieldError, snapshot] = useDocumentData<any>(gameRef);

  useEffect(() => {
    if (fieldLoading) return;
    addPlayer();
    checkPlayerMove();
  }, [fieldLoading]);

  useEffect(() => {
    fetchMultiplayer();
  }, [fetchedField]);

  const fetchMultiplayer = () => {
    if (!fetchedField) return;
    const temp = JSON.parse(fetchedField?.field);
    const newField = new FieldEntity();
    newField.cells = temp;
    newField.move = fetchedField?.nextMove;
    checkWin(newField);
    setField(newField);
  };

  const checkWin = async (tempField: FieldEntity) => {
    if (tempField.cells.length > 0) {
      const win = tempField.checkWin();
      if (win === game.playerMove) {
        setIsWin(true);
      } else {
        setIsWin(false);
      }
    }
  };

  const checkPlayerMove = () => {
    if (!fetchedField) return;
    const players = fetchedField?.players;
    const currentPlayer = players.find((player: IPlayer) => player.name === getUid()).move;
    if (currentPlayer === undefined) return;
    const tempGame = new GameEntity(field, 'multiplayer', currentPlayer);
    setGame(tempGame);
  };

  const restart = async () => {
    setIsWin(false);
    const newField = new FieldEntity();
    newField.initField();
    if (!checkIfMoved()) {
      await updateDoc(doc(db, 'game', gameId), {
        field: JSON.stringify(newField.cells),
        nextMove: 'circle',
      });
    }
    setField(newField);
  };

  const checkIfMoved = () => {
    if (!fetchedField) return;
    const temp = JSON.parse(fetchedField?.field);
    console.log(temp);

    const isMoved = temp.cells?.some((cell: any) => cell.type !== 'empty');
    return isMoved;
  };

  const addPlayer = async () => {
    if (!fetchedField) return;
    const players = fetchedField?.players;
    if (players.find((player: IPlayer) => player.name === getUid())) return;
    if (players[1].name !== '') {
      setIsFull(true);
      return;
    }
    players[1] = { name: getUid(), move: players[1].move };
    await updateDoc(doc(db, 'game', gameId), {
      players,
    });
  };

  return {
    game,
    field,
    isWin,
    restart,
    setField,
    fieldLoading,
  };
};
