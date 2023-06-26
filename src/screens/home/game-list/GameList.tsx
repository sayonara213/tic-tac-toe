import React, { useEffect, useState } from 'react';
import { IFetchField } from '../../../types/field.types';

import { GameListStyled as Styled } from './GameList.styled';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../../components/global/App';
import GameListItem from './game-list-item/GameListItem';
import { useAppSelector } from '../../../hooks/hooks';
import { IPlayer } from '../../../types/user.types';

const GameList: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const [gameList, setGameList] = useState<IFetchField[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchGameList();
  }, []);

  const fetchGameList = async () => {
    setIsLoading(true);
    const gameList: IFetchField[] = [];
    const querySnapshot = await getDocs(query(collection(db, 'game'), orderBy('date', 'desc')));
    querySnapshot.forEach((doc) => {
      const players = doc.data().players;
      if (players.some((player: IPlayer) => player.uid === user.uid)) {
        gameList.push({ id: doc.id, ...(doc.data() as Omit<IFetchField, 'id'>) });
      }
    });
    setGameList(gameList);
    setIsLoading(false);
  };

  return (
    <Styled.Container>
      <Styled.List>
        {gameList.map((game) => (
          <GameListItem game={game} key={game.id} />
        ))}
      </Styled.List>
    </Styled.Container>
  );
};

export default GameList;
