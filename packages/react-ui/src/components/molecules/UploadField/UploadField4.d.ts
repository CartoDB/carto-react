import { TextFieldProps } from '@mui/material/TextField';
import { InputProps } from '@mui/material';

export type UploadField4Props = Omit<TextFieldProps, 'placeholder' | 'onChange'> & {
  name?: string;
  buttonText?: string;
  accept?: string[] | string | null;
  files?: [];
  multiple?: boolean;
  onChange?: (file?: File | null) => void;
  inProgress?: boolean;
  inputProps?: Partial<InputProps>;
  nativeInputProps?: object;
  placeholder?: string | React.ReactNode;
};

declare const UploadField4: (props: UploadField4Props) => JSX.Element;
export default UploadField4;
