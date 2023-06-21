import React from 'react';
import { IGameListItemProps } from './GameListItem.types';

import { GameListItemStyled as Styled } from './GameListItem.styled';
import MiniField from '../../../../components/global/mini-field/MiniField';
import CustomText from '../../../../components/global/custom-text/CustomText';
import CustomButton from '../../../../components/button/CustomButton';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';

const GameListItem: React.FC<IGameListItemProps> = ({ game }) => {
  const navigation = useNavigate();

  const joinGame = () => {
    navigation(ROUTES.game + game.id);
  };

  return (
    <Styled.Container>
      <CustomText>{game.id.slice(0, 5).toUpperCase()}</CustomText>
      <MiniField field={game.field} />
      <CustomButton width='100px' onClick={joinGame}>
        JOIN
      </CustomButton>
    </Styled.Container>
  );
};

export default GameListItem;
