import { TextFieldProps } from '@mui/material';

export type ReadOnlyTextFieldProps = TextFieldProps & {
  readOnly?: boolean;
};

declare const ReadOnlyTextField: (props: ReadOnlyTextFieldProps) => JSX.Element;
export default ReadOnlyTextField;
