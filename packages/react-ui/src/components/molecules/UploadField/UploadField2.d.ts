import { TextFieldProps } from '@mui/material/TextField';

export type UploadFieldProps = Omit<TextFieldProps, 'onChange'> & {
  name?: string;
  buttonText?: string;
  accept?: string[] | string | null;
  files?: [];
  multiple?: boolean;
  onChange?: (file?: File | null) => void;
  inProgress?: boolean;
  handleValidation?: (file: File) => Promise<string | undefined | null>;
  handleReset?: () => void;
  file?: File | null;
};

declare const UploadField: (props: UploadFieldProps) => JSX.Element;
export default UploadField;
