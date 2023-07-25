import { MenuProps } from '@mui/material';
import { SelectProps } from '@mui/material/Select';
import { TextFieldProps } from '@mui/material/TextField';
import React from 'react';

export type SelectFieldProps = Omit<TextFieldProps, 'placeholder'> &
  Omit<SelectProps, 'placeholder'> & {
    placeholder?: React.ReactNode;
    size?: 'small' | 'medium';
    selectProps?: Partial<SelectProps<unknown>>;
    renderValue?: (value: string[]) => React.ReactNode;
    menuProps?: Partial<MenuProps>;
  };

declare const SelectField: (props: SelectFieldProps) => JSX.Element;
export default SelectField;
