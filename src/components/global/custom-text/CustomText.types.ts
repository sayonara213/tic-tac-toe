import { COLOR, FONT, FONT_SIZE } from '../theme';

export interface ICustomTextProps {
  children: React.ReactNode | string;
  color?: keyof typeof COLOR;
  fontSize?: keyof typeof FONT_SIZE;
  fontFamily?: keyof typeof FONT;
  width?: string;
  height?: string;
  textAlign?: string;
}

export interface ICustomTextStyles {
  color: keyof typeof COLOR;
  fontSize: keyof typeof FONT_SIZE;
  fontFamily: keyof typeof FONT;
  width: string;
  height: string;
  textAlign: string;
}
