import { TextFieldProps as MuiTextFieldProps } from '@mui/material';

export type TextFieldProps = MuiTextFieldProps & {
  readOnly?: boolean;
};

declare const TextField: (props: TextFieldProps) => JSX.Element;
export default TextField;
