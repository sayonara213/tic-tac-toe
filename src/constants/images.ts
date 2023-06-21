import circle from '../assets/icons/circle.png';
import cross from '../assets/icons/cross.png';

import bulb from '../assets/icons/bulb-white.svg';
import bulbFill from '../assets/icons/bulb-filled-white.svg';
import edit from '../assets/icons/edit-white.svg';
import copy from '../assets/icons/copy-white.svg';
import trash from '../assets/icons/delete-white.svg';
import done from '../assets/icons/done-white.svg';

import bulbBlack from '../assets/icons/bulb-black.svg';
import bulbFillBlack from '../assets/icons/bulb-filled-black.svg';
import editBlack from '../assets/icons/edit-black.svg';
import copyBlack from '../assets/icons/copy-black.svg';
import trashBlack from '../assets/icons/delete-black.svg';
import doneBlack from '../assets/icons/done-black.svg';

export const IMAGES = {
  circle,
  cross,
  bulb,
  bulbFill,
  edit,
  copy,
  trash,
  bulbBlack,
  bulbFillBlack,
  editBlack,
  copyBlack,
  trashBlack,
  done,
  doneBlack,
};

export type TIcon = keyof typeof IMAGES;
