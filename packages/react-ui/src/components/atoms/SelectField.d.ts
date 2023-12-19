import React from 'react';
import { InputProps, MenuProps } from '@mui/material';
import { SelectProps } from '@mui/material/Select';

export type SelectFieldProps<Value = unknown> = Omit<
  SelectProps<Value>,
  'placeholder'
> & {
  placeholder?: React.ReactNode | string;
  size?: 'small' | 'medium';
  menuProps?: Partial<MenuProps>;
  inputProps?: Partial<InputProps>;
  helperText?: React.ReactNode | string;
};

declare const SelectField: <Value>(props: SelectFieldProps<Value>) => JSX.Element;
export default SelectField;
