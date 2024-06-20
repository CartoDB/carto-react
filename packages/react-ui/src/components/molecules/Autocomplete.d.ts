import { ChipTypeMap } from '@mui/material';
import { AutocompleteProps as MuiAutocompleteProps } from '@mui/material/Autocomplete';

// Boilerplate to avoid Typescript error with generic types: we must repeat all original typings in declaration, so variants like multiple/freesolo, etc. have proper typings
export type AutocompleteProps<
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']
> = MuiAutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent> & {
  creatable?: boolean;
  newItemTitle?: string | (value: string) => (React.ReactNode | string);
  newItemIcon?: React.ReactNode;
};

declare const Autocomplete: <
  Value,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined,
  ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']
>(
  props: AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo, ChipComponent>
) => JSX.Element;
export default Autocomplete;
