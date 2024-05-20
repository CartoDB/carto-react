import React from 'react';
import { useIntl } from 'react-intl';
import useImperativeIntl from '../../../hooks/useImperativeIntl';
import { Box, Checkbox, Link, styled } from '@mui/material';

const FiltersRoot = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1,
  height: theme.spacing(4),
  marginBottom: theme.spacing(1),
  padding: theme.spacing(1, 0),
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`
}));

const LinkFilter = styled(Link)(({ disabled, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  width: '100%',
  height: '100%',
  padding: theme.spacing(0.5, 1.5),
  textAlign: 'initial',

  ...(disabled && { pointerEvents: 'none', color: theme.palette.text.disabled })
}));

function Filters({ areAllSelected, areAnySelected, selectAll, selectAllDisabled }) {
  const intl = useIntl();
  const intlConfig = useImperativeIntl(intl);

  return (
    <FiltersRoot>
      <LinkFilter
        variant='body2'
        color='textPrimary'
        component='button'
        underline='none'
        disabled={areAllSelected || selectAllDisabled}
        onClick={selectAll}
      >
        <Checkbox
          checked={areAllSelected}
          indeterminate={areAnySelected && !areAllSelected}
        />
        <span>{intlConfig.formatMessage({ id: 'c4r.form.selectAll' })}</span>
      </LinkFilter>
    </FiltersRoot>
  );
}

export default Filters;
