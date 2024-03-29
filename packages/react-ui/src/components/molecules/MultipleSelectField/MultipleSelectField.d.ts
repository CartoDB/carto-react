import React from 'react';
import { SelectFieldProps } from '../../atoms/SelectField';
import { TooltipProps } from '@mui/material';

type MultipleSelectFieldOption = {
  label: string | React.ReactNode;
  value: string | number;
  disabled?: boolean;
  tooltip?: string | false;
};

export type MultipleSelectFieldProps<Value = unknown> = Omit<
  SelectFieldProps<Value>,
  'onChange' | 'defaultValue' | 'value'
> & {
  options: MultipleSelectFieldOption[];
  selectedOptions?: string[];
  selectAllDisabled?: boolean;
  onChange: (options: string[]) => void;
  showCounter?: boolean;
  showFilters?: boolean;
  value?: string[] | string;
  tooltipPlacement?: TooltipProps['placement'];
};

declare const MultipleSelectField: <Value>(
  props: MultipleSelectFieldProps<Value>
) => JSX.Element;
export default MultipleSelectField;
