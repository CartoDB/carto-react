import React from 'react';
import PropTypes from 'prop-types';
import {
  DialogTitle as MuiDialogTitle,
  styled,
  Chip,
  Box,
  IconButton
} from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';

const StyledDialogTitle = styled(MuiDialogTitle, {
  shouldForwardProp: (prop) => !['isNeutral'].includes(prop)
})(({ isNeutral, theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(2, 3),

  ...(isNeutral && {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary
  })
}));

const ChipTitle = styled(Chip)(({ theme }) => ({
  marginLeft: theme.spacing(1)
}));

const ItemsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1)
}));

const DialogTitle = ({
  title,
  children,
  onClose,
  chipLabel,
  secondaryButons,
  ...otherProps
}) => {
  return (
    <StyledDialogTitle {...otherProps}>
      <ItemsWrapper flex={1}>
        <Box flex={1}>
          {title}

          {chipLabel && <ChipTitle color='default' label={chipLabel} />}
        </Box>

        {children}
      </ItemsWrapper>

      <ItemsWrapper>
        {secondaryButons}

        {onClose && (
          <IconButton onClick={onClose}>
            <CloseOutlined />
          </IconButton>
        )}
      </ItemsWrapper>
    </StyledDialogTitle>
  );
};

DialogTitle.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node,
  chipLabel: PropTypes.string,
  secondaryButons: PropTypes.node,
  onClose: PropTypes.func
};

export default DialogTitle;
