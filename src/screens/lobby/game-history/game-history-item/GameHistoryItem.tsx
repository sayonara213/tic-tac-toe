import React, { useEffect, useState } from 'react';

import { GameHistoryItemStyled as Styled } from './GameHistoryItem.styled';
import { IGameHistoryItemProps } from './GameHistoryItem.types';
import { IUser } from '../../../../types/user.types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../components/global/App';
import CustomText from '../../../../components/global/custom-text/CustomText';
import Icon from '../../../../components/global/custom-icon/Icon';

const GameHistoryItem: React.FC<IGameHistoryItemProps> = ({ winColor, player, date }) => {
  const [fetchedPlayer, setFetchedPlayer] = useState<IUser>({} as IUser);

  const fetchPlayer = async () => {
    const playerDoc = await getDoc(doc(db, 'users', player));
    setFetchedPlayer(playerDoc.data() as IUser);
  };

  useEffect(() => {
    fetchPlayer();
  }, [player]);

  return (
    <Styled.Container>
      <CustomText>{fetchedPlayer.userName}</CustomText>
      <Styled.IconWrap type={winColor}>
        <Icon type={winColor} />
      </Styled.IconWrap>
    </Styled.Container>
  );
};

export default GameHistoryItem;
