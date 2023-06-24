import React, { useEffect } from 'react';
import { GameHistoryStyled as Styled } from './GameHistory.styled';
import { IGameHistoryProps } from './GameHistory.types';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, doc } from 'firebase/firestore';
import { db } from '../../../components/global/App';
import CustomText from '../../../components/global/custom-text/CustomText';
import Score from './score/Score';
import GameHistoryItem from './game-history-item/GameHistoryItem';
import { IHistory } from '../../../types/field.types';

const GameHistory: React.FC<IGameHistoryProps> = ({ gameId, players }) => {
  const gameRef = doc(db, 'game', gameId);
  const historyRef = collection(gameRef, 'history');

  const [fetchedHistory, historyLoading, historyError, snapshot] =
    useCollectionData<any>(historyRef);

  return (
    <Styled.Container>
      <Score players={players} />
      <Styled.List>
        {fetchedHistory?.map((history: IHistory) => (
          <GameHistoryItem
            winColor={history.move}
            player={history.winner}
            date={history.timestamp}
          />
        ))}
      </Styled.List>
    </Styled.Container>
  );
};

export default GameHistory;
