import React from 'react';
import { useIntl } from 'react-intl';
import useImperativeIntl from '../../../hooks/useImperativeIntl';
import { Box, Link, styled } from '@mui/material';
import Typography from '../../atoms/Typography';

const FiltersRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  marginLeft: 'auto',
  pointerEvents: 'auto'
}));

const LinkFilter = styled(Link)(({ disabled, theme }) => ({
  ...(disabled && { pointerEvents: 'none', color: theme.palette.text.disabled })
}));

function Filters({
  showFilters,
  areAllSelected,
  areAnySelected,
  selectAll,
  unselectAll,
  selectAllDisabled
}) {
  const intl = useIntl();
  const intlConfig = useImperativeIntl(intl);

  if (!showFilters) {
    return null;
  }

  return (
    <FiltersRoot>
      <LinkFilter
        variant='caption'
        component='button'
        disabled={areAllSelected || selectAllDisabled}
        onClick={selectAll}
      >
        {intlConfig.formatMessage({ id: 'c4r.form.selectAll' })}
      </LinkFilter>
      <Typography variant='caption' weight='strong' color='text.hint'>
        •
      </Typography>
      <LinkFilter
        variant='caption'
        component='button'
        onClick={unselectAll}
        disabled={!areAnySelected}
      >
        {intlConfig.formatMessage({
          id: 'c4r.form.selectNone'
        })}
      </LinkFilter>
    </FiltersRoot>
  );
}

export default Filters;
