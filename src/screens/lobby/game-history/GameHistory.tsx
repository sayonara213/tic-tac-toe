import React, { useEffect } from 'react';
import { GameHistoryStyled as Styled } from './GameHistory.styled';
import { IGameHistoryProps } from './GameHistory.types';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, doc } from 'firebase/firestore';
import { db } from '../../../components/global/App';
import CustomText from '../../../components/global/custom-text/CustomText';
import GameHistoryItem from './game-history-item/GameHistoryItem';
import { IHistory } from '../../../types/field.types';
import CustomButton from '../../../components/button/CustomButton';

const GameHistory: React.FC<IGameHistoryProps> = ({ gameId, players }) => {
  const gameRef = doc(db, 'game', gameId);
  const historyRef = collection(gameRef, 'history');

  const [fetchedHistory, historyLoading, historyError, snapshot] =
    useCollectionData<any>(historyRef);

  const copyId = () => {
    navigator.clipboard.writeText(gameId);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <Styled.Container>
      <Styled.ButtonsWrapper>
        <CustomButton onClick={copyId}>Copy Id</CustomButton>
        <CustomButton onClick={copyLink}>Copy Link</CustomButton>
      </Styled.ButtonsWrapper>

      {fetchedHistory?.length !== 0 && (
        <React.Fragment>
          <CustomText fontFamily='medium' fontSize='large'>
            History:
          </CustomText>
          <Styled.List>
            {fetchedHistory?.map((history: IHistory, index: number) => (
              <GameHistoryItem
                key={index}
                winColor={history.move}
                player={history.winner}
                date={history.timestamp}
              />
            ))}
          </Styled.List>
        </React.Fragment>
      )}
    </Styled.Container>
  );
};

export default GameHistory;
