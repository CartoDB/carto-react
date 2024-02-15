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
import Typography from '../atoms/Typography';

const ChipTitle = styled(Chip)(({ theme }) => ({
  marginLeft: theme.spacing(1)
}));

const ItemsWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  overflow: 'hidden'
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
    <MuiDialogTitle {...otherProps}>
      <ItemsWrapper>
        <Box flex={1} maxWidth={0.8}>
          <Typography variant='inherit' noWrap>
            {title}
          </Typography>

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
    </MuiDialogTitle>
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
