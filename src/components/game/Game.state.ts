import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { FieldEntity, TMove } from '../../models/game/field/FieldEntity';
import { GameEntity } from '../../models/game/game/GameEntity';
import { IPlayer } from '../../types/field.types';
import { db } from '../global/App';
import { useAppSelector } from '../../hooks/hooks';

export const useGameState = (gameId: string, setPlayers: any) => {
  const user = useAppSelector((state) => state.user);

  const [game, setGame] = useState(new GameEntity(new FieldEntity(), 'multiplayer', 'circle'));
  const [field, setField] = useState(game.field);
  const [isWin, setIsWin] = useState(false);
  const [isFull, setIsFull] = useState(false);

  const gameRef = doc(db, 'game', gameId);

  const [fetchedField, fieldLoading, fieldError, snapshot] = useDocumentData<any>(gameRef);

  useEffect(() => {
    fetchMultiplayer();
  }, [game]);

  useEffect(() => {
    if (fieldLoading) return;
    addPlayer();
    checkPlayerMove();
  }, [fieldLoading]);

  useEffect(() => {
    fetchMultiplayer();
    handleSetPlayers();
  }, [fetchedField]);

  const fetchMultiplayer = () => {
    if (!fetchedField) return;
    const temp = JSON.parse(fetchedField?.field);
    const newField = new FieldEntity();
    newField.cells = temp;
    newField.move = fetchedField?.nextMove;
    setField(newField);

    checkWin(newField);
  };

  const checkWin = async (tempField: FieldEntity) => {
    if (tempField.cells.length > 0) {
      const win = tempField.checkWin();
      console.log('checking win', game);
      if (win === game.playerMove) {
        setIsWin(true);
        saveWin(game.playerMove, user.uid);
      } else {
        setIsWin(false);
      }
    }
  };

  const saveWin = async (move: TMove, winner: string) => {
    if (fetchedField?.isWin) return;
    const players = findPlayers();
    const winnerPlayerIndex = players.findIndex((player: IPlayer) => player.uid === winner);
    players[winnerPlayerIndex].winCount = players[winnerPlayerIndex].winCount + 1;
    await updateDoc(doc(db, 'game', gameId), {
      players,
      isWin: true,
    });
    await addDoc(collection(gameRef, 'history'), {
      winner,
      move,
      timestamp: new Date(),
    });
  };

  const checkPlayerMove = () => {
    if (!fetchedField) return;
    const players = fetchedField?.players;
    const currentPlayer = players.find((player: IPlayer) => player.uid === user.uid);
    if (currentPlayer === undefined) return;
    const tempGame = new GameEntity(field, 'multiplayer', currentPlayer.move);
    console.log('checked player move', tempGame);

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
        isWin: false,
      });
    }
    setField(newField);
  };

  const checkIfMoved = () => {
    if (!fetchedField) return;
    const temp = JSON.parse(fetchedField?.field);
    const isMoved = temp.cells?.some((cell: any) => cell.type !== 'empty');
    return isMoved;
  };

  const addPlayer = async () => {
    const players = findPlayers();
    if (players.find((player: IPlayer) => player.uid === user.uid)) return;
    if (players[1].uid !== '') {
      setIsFull(true);
      return;
    }
    players[1] = { uid: user.uid, move: players[1].move, winCount: 0 };
    await updateDoc(doc(db, 'game', gameId), {
      players,
    });
  };

  const findPlayers = () => {
    if (!fetchedField) return;
    const players = fetchedField?.players;
    return players;
  };

  const handleSetPlayers = () => {
    const players = findPlayers();
    setPlayers(players);
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
