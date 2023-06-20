export type TCustomButtonTypes = 'primary' | 'secondary' | 'red' | 'green';

export interface ICustomButtonProps {
  children: JSX.Element | JSX.Element[] | string | string[];
  onClick?: () => void;
  type?: TCustomButtonTypes;
  disabled?: boolean;
  width?: string;
  height?: string;
}

export interface ICustomButtonStyledProps {
  buttonType: TCustomButtonTypes;
  width: string;
  height: string;
}
