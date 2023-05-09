import React from 'react';
import { TypographyTypeMap as MuiTypographyTypeMap } from '@mui/material/Typography';
import { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';

export type TypographyTypeMap<D extends React.ElementType = 'span'> =
  MuiTypographyTypeMap<
    {
      /**
       * Font weight for Carto typography:
       *
       *  * `'regular'` - 400
       *  * `'medium'` - 500
       *  * `'strong'` - 600
       */
      weight?: CartoFontWeight;
      italic?: boolean;
    },
    D
  >;

export type CartoFontWeight = 'regular' | 'medium' | 'strong';

export type TypographyProps<
  D extends React.ElementType = TypographyTypeMap['defaultComponent']
> = OverrideProps<TypographyTypeMap<D>, D>;

// https://github.com/mui/material-ui/issues/19536#issuecomment-598856255
declare const Typography: OverridableComponent<TypographyTypeMap>;
export default Typography;
