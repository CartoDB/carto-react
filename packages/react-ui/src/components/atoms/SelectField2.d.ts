import React from 'react';
import { MenuProps } from '@mui/material';
import { SelectProps } from '@mui/material/Select';
import { TextFieldProps } from '@mui/material/TextField';

export type SelectFieldProps2 = Omit<TextFieldProps, 'placeholder'> &
  Omit<SelectProps, 'placeholder'> & {
    placeholder?: React.ReactNode | string;
    size?: 'small' | 'medium';
    renderValue?: (value: string[]) => React.ReactNode;
    menuProps?: Partial<MenuProps>;
    helperText?: React.ReactNode | string;
  };

declare const SelectField2: (props: SelectFieldProps2) => JSX.Element;
export default SelectField2;
