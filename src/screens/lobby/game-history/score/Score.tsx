import React, { useEffect, useState } from 'react';
import { IScoreProps } from './Score.types';

import { ScoreStyled as Styled } from './Score.styled';
import CustomText from '../../../../components/global/custom-text/CustomText';

const Score: React.FC<IScoreProps> = ({ players }) => {
  const [playerWins, setPlayerWins] = useState<number[]>([0, 0]);

  useEffect(() => {
    players && setPlayerWins(players.map((player) => player.winCount));
  }, [players]);

  return (
    <Styled.Container>
      <CustomText width='100%' textAlign='center' fontFamily='medium' fontSize='xlarge'>
        {playerWins[0]} - {playerWins[1]}
      </CustomText>
    </Styled.Container>
  );
};

export default Score;
