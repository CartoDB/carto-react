import React from 'react';
import { TypographyTypeMap } from '@mui/material/Typography';
import { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';

export type CartoTypographyTypeMap<D extends React.ElementType = 'span'> =
  TypographyTypeMap<
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
  D extends React.ElementType = CartoTypographyTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TypographyTypeMap<P, D>, D>;

// https://github.com/mui/material-ui/issues/19536#issuecomment-598856255
declare const Typography: OverridableComponent<CartoTypographyTypeMap>;
export default Typography;
