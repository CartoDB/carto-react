import React from 'react';
import { useIntl } from 'react-intl';
import useImperativeIntl from '../../../hooks/useImperativeIntl';
import { Checkbox, Link, styled } from '@mui/material';
import MenuItem from '../MenuItem';

const LinkFilter = styled(Link)(({ disabled, theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  width: '100%',
  textAlign: 'initial',

  ...(disabled && { pointerEvents: 'none', color: theme.palette.text.disabled })
}));

function Filters({ areAllSelected, areAnySelected, selectAll, selectAllDisabled }) {
  const intl = useIntl();
  const intlConfig = useImperativeIntl(intl);

  return (
    <MenuItem fixed>
      <LinkFilter
        variant='body2'
        color='textPrimary'
        component='button'
        underline='none'
        disabled={selectAllDisabled}
        onClick={selectAll}
        tabIndex={0}
      >
        <Checkbox
          checked={areAllSelected}
          indeterminate={areAnySelected && !areAllSelected}
          disabled={selectAllDisabled}
        />
        {intlConfig.formatMessage({ id: 'c4r.form.selectAll' })}
      </LinkFilter>
    </MenuItem>
  );
}

export default Filters;
