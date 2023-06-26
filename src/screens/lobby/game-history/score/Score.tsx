import React, { useEffect, useState } from 'react';
import { IScoreProps } from './Score.types';

import { ScoreStyled as Styled } from './Score.styled';
import CustomText from '../../../../components/global/custom-text/CustomText';
import Icon from '../../../../components/global/custom-icon/Icon';

const Score: React.FC<IScoreProps> = ({ players }) => {
  const [playerWins, setPlayerWins] = useState<number[]>([0, 0]);

  useEffect(() => {
    players && setPlayerWins(players.map((player) => player.winCount));
  }, [players]);

  if (!players || players.length < 1) return null;

  return (
    <Styled.Container>
      <Styled.IconWrap type={players[0].move}>
        <Icon type={players[0].move} />
      </Styled.IconWrap>
      <CustomText width='100%' textAlign='center' fontFamily='medium' fontSize='xlarge'>
        {playerWins[0]} - {playerWins[1]}
      </CustomText>
      <Styled.IconWrap type={players[1].move}>
        <Icon type={players[1].move} />
      </Styled.IconWrap>
    </Styled.Container>
  );
};

export default Score;
