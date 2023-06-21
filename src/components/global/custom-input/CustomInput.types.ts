export interface ICustomInputProps {
  value: string;
  onChange: (text: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  width?: string;
  height?: string;
  fontSize?: string;
  fontFamily?: string;
  color?: string;
  backgroundColor?: string;
}
