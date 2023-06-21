import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../components/global/App';

export const getUserFromDB = async (uid: string) => {
  if (uid === '' || uid === undefined) return undefined;
  const user = await getDoc(doc(db, 'users', uid));

  return user.data();
};
