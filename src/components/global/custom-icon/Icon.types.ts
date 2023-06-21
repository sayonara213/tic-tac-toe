import { TIcon } from '../../../constants/images';

export interface IIconProps {
  type: TIcon;
  width?: string;
  height?: string;
  onClick?: () => void;

  fadeIn?: boolean;
}
