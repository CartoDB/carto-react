import React from 'react';
import { InputProps, MenuProps } from '@mui/material';
import { SelectProps } from '@mui/material/Select';

export type SelectFieldProps2 = Omit<SelectProps, 'placeholder'> & {
  placeholder?: React.ReactNode | string;
  size?: 'small' | 'medium';
  renderValue?: (value: string[]) => React.ReactNode;
  menuProps?: Partial<MenuProps>;
  inputProps?: Partial<InputProps>;
  helperText?: React.ReactNode | string;
};

declare const SelectField2: (props: SelectFieldProps2) => JSX.Element;
export default SelectField2;
