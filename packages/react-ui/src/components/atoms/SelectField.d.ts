import { TextFieldProps } from '@mui/material/TextField';

export type SelectFieldProps = TextFieldProps & {
  items: [
    {
      label: string;
      value: string | number;
    }
  ];
  multiple?: boolean;
  placeholder: string;
  size?: 'small' | 'medium';
};

declare const SelectField: (props: SelectFieldProps) => JSX.Element;
export default SelectField;
