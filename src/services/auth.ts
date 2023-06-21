import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../components/global/App';
import { IUser } from '../types/user.types';
import { getUserFromDB } from './user';

export const checkIfUserExists = async (user: IUser) => {
  if (user.uid === '') return false;

  const userFromDB = await getUserFromDB(user.uid);

  return userFromDB;
};

export const createUser = async (user: IUser) => {
  console.log(user);

  const docRef = await addDoc(collection(db, 'users'), {});
  const userId = docRef.id;
  const userName = `User ${userId.slice(0, 5)}`;
  await updateDoc(doc(db, 'users', userId), {
    uid: userId,
    userName: userName,
  });
  return {
    uid: userId,
    userName: userName,
  };
};
