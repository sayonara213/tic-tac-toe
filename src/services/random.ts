export const randomId = (length = 10) => {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

export const crossOrCircle = () => {
  return Math.random() < 0.5 ? 'cross' : 'circle';
};
