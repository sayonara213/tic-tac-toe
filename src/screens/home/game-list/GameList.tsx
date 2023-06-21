import React, { useEffect, useState } from 'react';
import { IFetchField } from '../../../types/field.types';

import { GameListStyled as Styled } from './GameList.styled';
import { collection, doc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../../components/global/App';
import GameListItem from './game-list-item/GameListItem';
import Loader from '../../../components/loader/Loader';

const GameList: React.FC = () => {
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
      gameList.push({ id: doc.id, ...(doc.data() as Omit<IFetchField, 'id'>) });
    });
    setGameList(gameList);
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Styled.Container>
      {gameList.map((game) => (
        <GameListItem game={game} key={game.id} />
      ))}
    </Styled.Container>
  );
};

export default GameList;
