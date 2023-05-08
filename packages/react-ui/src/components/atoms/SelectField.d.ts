import { TextFieldProps } from '@mui/material/TextField';

type SelectFieldItem = {
  label: string;
  value: string | number;
};

export type SelectFieldProps = Omit<TextFieldProps, 'placeholder'> & {
  items: SelectFieldItem[];
  multiple?: boolean;
  placeholder?: React.ReactNode;
  size?: 'small' | 'medium';
};

declare const SelectField: (props: SelectFieldProps) => JSX.Element;
export default SelectField;
