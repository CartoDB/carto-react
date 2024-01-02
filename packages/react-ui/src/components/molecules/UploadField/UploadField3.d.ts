import { ReactNode, Ref } from 'react';
import { TextFieldProps } from '@mui/material/TextField';

export type UploadField2Props = TextFieldProps & {
  label?: string | React.ReactElement;
  name: string;
  placeholder?: string;
  validator?: (file: File) => Promise<string | undefined | null>;
  value?: File | null;
  onFileChange?: (file?: File | null) => void;
  size?: 'small' | 'medium';
  accept?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputRef?: Ref<any>;
  classes?: {
    outlinedOutput?: string;
    formHelperText?: string;
  };
  endAdornment?: ReactNode;
};

declare const UploadField2: (props: UploadField2Props) => JSX.Element;
export default UploadField2;
