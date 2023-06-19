import { randomId } from './random';

export const generateUid = () => {
  if (sessionStorage.getItem('uid')) return;
  const uid = randomId();
  sessionStorage.setItem('uid', uid);
};

export const getUid = () => {
  return sessionStorage.getItem('uid');
};
