import React, { useEffect, useState } from 'react';
import { IGameListItemProps } from './GameListItem.types';

import { GameListItemStyled as Styled } from './GameListItem.styled';
import MiniField from '../../../../components/global/mini-field/MiniField';
import CustomText from '../../../../components/global/custom-text/CustomText';
import CustomButton from '../../../../components/button/CustomButton';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import { IUser } from '../../../../types/user.types';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../components/global/App';

const GameListItem: React.FC<IGameListItemProps> = ({ game }) => {
  const navigation = useNavigate();

  const [players, setPlayers] = useState<IUser[]>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const joinGame = () => {
    navigation(ROUTES.game + game.id);
  };

  const fetchPlayers = async () => {
    setIsLoading(true);
    const playerIds = game.players.map((player) => player.uid);
    const fetchedPlayers = await Promise.all(
      playerIds.map(async (id) => {
        if (id === '' || id === undefined) return {} as IUser;
        const fetchedPlayer = getDoc(doc(db, 'users', id));
        return (await fetchedPlayer).data();
      }),
    );
    setPlayers(fetchedPlayers as IUser[]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const isFull = game.players[1].uid !== '';

  const playersName = players?.map((player) => player.userName).join(' vs ');

  if (isLoading) {
    return (
      <Styled.Container>
        <Styled.SkeletonText />
        <Styled.InteractiveContainer>
          <Styled.SkeletonField />
          <Styled.SkeletonButton />
        </Styled.InteractiveContainer>
      </Styled.Container>
    );
  }

  return (
    <Styled.Container>
      <CustomText>{playersName}</CustomText>
      <Styled.InteractiveContainer>
        <MiniField field={game.field} />
        <CustomButton width='100px' onClick={joinGame}>
          {isFull ? 'WATCH' : 'JOIN'}
        </CustomButton>
      </Styled.InteractiveContainer>
    </Styled.Container>
  );
};

export default GameListItem;
