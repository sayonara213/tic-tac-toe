import { useAppSelector } from '../../hooks/hooks';
import AppRouter from './router/AppRouter';
import { Theme } from './theme';

const Main: React.FC = () => {
  const theme = useAppSelector((state) => state.theme);

  return (
    <Theme theme={theme.isLight}>
      <AppRouter />
    </Theme>
  );
};

export default Main;
