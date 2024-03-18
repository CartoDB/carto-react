import React, { useLayoutEffect, useRef, useState } from 'react';
import { Tooltip } from '@mui/material';
import Typography from '../../components/atoms/Typography';

/** Renders the legend layer title with an optional tooltip if the title is detected to be too long.
 * @param {object} props
 * @param {string} props.title
 * @param {boolean} props.visible
 * @param {object} props.typographyProps
 * @returns {React.ReactNode}
 */
export default function LegendLayerTitle({ title, visible, typographyProps }) {
  const ref = useRef(null);
  const [isOverflow, setIsOverflow] = useState(false);

  useLayoutEffect(() => {
    if (visible && ref.current) {
      const { offsetWidth, scrollWidth } = ref.current;
      setIsOverflow(offsetWidth < scrollWidth);
    }
  }, [title, visible]);

  const element = (
    <Typography
      ref={ref}
      color={visible ? 'textPrimary' : 'textSecondary'}
      variant='button'
      weight='medium'
      component='p'
      noWrap
      my={0.25}
      {...typographyProps}
    >
      {title}
    </Typography>
  );

  if (!isOverflow) {
    return element;
  }

  return <Tooltip title={title}>{element}</Tooltip>;
}
