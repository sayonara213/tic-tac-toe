import { useState, useEffect } from 'react';
import Field from './field/Field';
import { FieldEntity } from '../../models/game/field/FieldEntity';
import { GameStyled as Styled } from './Game.styled';
import Confetti from 'react-confetti';
import { db } from '../global/App';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { GameEntity } from '../../models/game/game/GameEntity';
import { fetchField } from '../../services/fetchField';

const Game: React.FC = () => {
  const game = new GameEntity('Tic Tac Toe', new FieldEntity(), 'multiplayer');
  const [field, setField] = useState(game.field);
  const [isWin, setIsWin] = useState(false);
  const [fetchedField, setFetchedField] = useState<FieldEntity | null>(null);

  useEffect(() => {
    restart();
    game.gameMode === 'multiplayer' && fetch();
  }, []);

  useEffect(() => {
    checkWin();
  }, [field]);

  useEffect(() => {
    if (fetchedField) {
      setField(fetchedField);
    }
  }, [fetchedField]);

  const fetch = async () => {
    const temp = await fetchField('CrOai7FLhuOLqjLB55oI');
    setFetchedField(temp);
  };

  const checkWin = async () => {
    if (field.cells.length > 0) {
      const win = field.checkWin();
      if (win) {
        setIsWin(true);
        const docRef = await addDoc(collection(db, 'games'), {
          field: JSON.stringify(field.cells),
          date: new Date(),
          win: field.won,
        });
      }
    }
  };

  const restart = () => {
    setIsWin(false);
    const newField = new FieldEntity();
    newField.initField();
    setField(newField);
  };

  return (
    <Styled.Container>
      <Field field={field} setField={setField} game={game} />
      <Styled.Button onClick={restart}>RESTART</Styled.Button>
      {isWin && <Confetti width={document.body.clientWidth} />}
    </Styled.Container>
  );
};

export default Game;
