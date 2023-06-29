import { doc } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { FieldEntity, TMove } from '../../models/game/field/FieldEntity';
import { db } from '../global/App';
import { useAppSelector } from '../../hooks/hooks';
import {
  addPlayerService,
  handleWinHistoryService,
  restartGameService,
} from '../../services/fetchField';
import { IPlayer } from '../../types/user.types';

export const useGameState = (gameId: string, setPlayers: any) => {
  const user = useAppSelector((state) => state.user);

  const [playerMove, setPlayerMove] = useState<TMove>('circle');
  const [field, setField] = useState(new FieldEntity());

  const [isWin, setIsWin] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [isFull, setIsFull] = useState(false);

  const gameRef = doc(db, 'game', gameId);

  const [fetchedField, fieldLoading, fieldError, snapshot] = useDocumentData(gameRef);

  useEffect(() => {
    if (!fetchedField) return;
    addPlayer();
  }, [fieldLoading]);

  useEffect(() => {
    handleFetchedField();
    checkPlayerMove();
  }, [fetchedField]);

  useEffect(() => {
    if (!isWin) return;
    handleSaveWin();
  }, [isWin]);

  const handleFetchedField = () => {
    if (!fetchedField) return;

    const tempField = new FieldEntity();
    tempField.cells = JSON.parse(fetchedField.field);
    tempField.move = fetchedField.nextMove;

    handleWin(tempField);
    setField(tempField);
    handleScore();
  };

  const addPlayer = async () => {
    const players = fetchedField?.players;
    checkPlayerMove();
    setPlayers(players);

    if (checkIfFull() || getCurrentPlayer()) return;

    players[1] = {
      ...players[1],
      uid: user.uid,
    };

    addPlayerService(gameRef, players, user.uid);
  };

  const checkIfFull = () => {
    const players = fetchedField?.players;
    if (!players) return;

    if (players[1].uid !== '') {
      if (players.some((player: IPlayer) => player.uid !== user.uid)) {
        setIsFull(true);
      }
      return true;
    } else {
      return false;
    }
  };

  const checkPlayerMove = () => {
    const player = getCurrentPlayer();
    if (player) {
      setPlayerMove(player.move);
    }
  };

  const getCurrentPlayer = () => {
    const players = fetchedField?.players;
    if (!players) return;

    return players.find((player: IPlayer) => player.uid === user.uid) as IPlayer;
  };

  const handleWin = async (tempField: FieldEntity) => {
    const result = tempField.checkWin();
    const player = getCurrentPlayer();

    switch (result) {
      case 'circle':
        if (player?.move === 'circle') {
          setIsWin(true);
        }
        break;
      case 'cross':
        if (player?.move === 'cross') {
          setIsWin(true);
        }
        break;
      case 'draw':
        setIsDraw(true);
        break;
      default:
        setIsWin(false);
        setIsDraw(false);
        break;
    }
  };

  const handleRestart = async () => {
    if (!field.checkWin()) return;

    const players = fetchedField?.players;
    const newField = new FieldEntity();
    newField.initField();
    setField(newField);
    await restartGameService(gameRef, newField, players);
    setIsWin(false);
  };

  const handleSaveWin = async () => {
    const player = getCurrentPlayer();
    const players = fetchedField?.players;
    const fetchedWin = fetchedField?.isWin;
    if (!player || !players || fetchedWin) return;

    await handleWinHistoryService(gameRef, player, players);
    setPlayers(players);
  };

  const handleScore = () => {
    const players = fetchedField?.players;
    if (!players) return;
    setPlayers(players);
  };

  return {
    playerMove,
    field,
    isWin,
    handleRestart,
    setField,
    fieldLoading,
    isFull,
  };
};
