import { MenuProps } from '@mui/material';
import { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import { TextFieldProps } from '@mui/material/TextField';
import React from 'react';

export type SelectFieldProps = Omit<TextFieldProps, 'placeholder'> &
  Omit<SelectProps, 'placeholder'> & {
    children?: React.ReactNode;
    placeholder?: React.ReactNode;
    size?: 'small' | 'medium';
    customSelectProps?: Partial<SelectProps<unknown>>;
    customRenderValue?: (value: string[]) => React.ReactNode;
    customMenuProps?: Partial<MenuProps>;
  };

declare const SelectField: (props: SelectFieldProps) => JSX.Element;
export default SelectField;
