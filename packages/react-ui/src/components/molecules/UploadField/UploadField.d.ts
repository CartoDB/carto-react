import { TextFieldProps } from '@mui/material/TextField';

export type UploadFieldProps = TextFieldProps & {
  buttonText?: string;
  accept?: string[];
  files?: [];
  multiple?: boolean;
  onChange: (file?: File | null) => void;
};

declare const UploadField: (props: UploadFieldProps) => JSX.Element;
export default UploadField;
