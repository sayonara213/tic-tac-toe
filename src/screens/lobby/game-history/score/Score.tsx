import React, { useEffect, useState } from 'react';
import { IScoreProps } from './Score.types';

import { ScoreStyled as Styled } from './Score.styled';
import CustomText from '../../../../components/global/custom-text/CustomText';
import Icon from '../../../../components/global/custom-icon/Icon';
import { IUser } from '../../../../types/user.types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../components/global/App';

const Score: React.FC<IScoreProps> = ({ players }) => {
  const [fetchedPlayers, setFetchedPlayers] = useState<IUser[]>([]);

  useEffect(() => {
    fetchPlayers();
  }, [players]);

  const fetchPlayers = async () => {
    if (players.length > 0 && players[1].uid !== '') {
      const newPlayers = players.map(async (player) => {
        const tempPlayer = await getDoc(doc(db, 'users', player.uid));
        return tempPlayer.data() as IUser;
      });
      setFetchedPlayers(await Promise.all(newPlayers));
    }
  };

  if (!players || players.length < 1 || fetchedPlayers.length < 1) return null;

  return (
    <Styled.Container>
      <Styled.IconWrap type={players[0].move}>
        <CustomText fontFamily='medium' fontSize='large'>
          {fetchedPlayers[0].userName}
        </CustomText>
      </Styled.IconWrap>
      <CustomText textAlign='center' fontFamily='medium' fontSize='xlarge'>
        {players[0].winCount} - {players[1].winCount}
      </CustomText>
      <Styled.IconWrap type={players[1].move}>
        <CustomText fontFamily='medium' fontSize='large'>
          {fetchedPlayers[1].userName}
        </CustomText>
      </Styled.IconWrap>
    </Styled.Container>
  );
};

export default Score;
