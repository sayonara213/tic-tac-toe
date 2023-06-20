import { doc, getDoc } from 'firebase/firestore';
import { db } from '../components/global/App';
import { FieldEntity } from '../models/game/field/FieldEntity';

export const fetchField = async (id: string) => {
  const docRef = doc(db, 'games', id);
  const tempField = (await getDoc(docRef)) as any;
  const newField = new FieldEntity();
  newField.cells = JSON.parse(tempField.data().field);

  return newField;
};
