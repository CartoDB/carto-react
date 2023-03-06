import React from 'react';
import PropTypes from 'prop-types';
import { AppBar as MuiAppBar, Divider, Hidden, IconButton, Toolbar } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { styled } from '@mui/material';
import { MenuOutlined } from '@mui/icons-material';

import Typography from '../atoms/Typography';
import { APPBAR_SIZE } from '../../theme/themeConstants';

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: 'calc(100% - 300px)',
    overflow: 'hidden',

    [theme.breakpoints.down('sm')]: {
      minWidth: '188px'
    }
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    height: APPBAR_SIZE,
    marginRight: theme.spacing(1.5)
  },
  menuButton: {
    marginRight: theme.spacing(1),

    '&.MuiButtonBase-root svg path': {
      fill: theme.palette.background.paper
    }
  },
  logo: {
    display: 'flex',
    marginRight: theme.spacing(1.5),

    '& a': {
      display: 'flex'
    },
    '& svg, & img': {
      width: theme.spacing(4),
      height: theme.spacing(4)
    }
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: theme.spacing(1)
  },
  text: {
    display: 'flex',
    alignItems: 'center'
  },
  brandText: {
    whiteSpace: 'nowrap'
  },
  textSeparator: {
    '&::after': {
      content: '"/"',
      margin: theme.spacing(0, 1),
      color: theme.palette.white[60]
    }
  }
}));

const DivRow = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  maxWidth: 'calc(100% - 300px)',
  overflow: 'hidden',

  [theme.breakpoints.down('sm')]: {
    minWidth: '188px'
  }
}));

const DivMenu = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: APPBAR_SIZE,
  marginRight: theme.spacing(1.5)
}));

const IconButtonMenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(1),

  '&.MuiButtonBase-root svg path': {
    fill: theme.palette.background.paper
  }
}));

const DivLogo = styled('div')(({ theme }) => ({
  display: 'flex',
  marginRight: theme.spacing(1.5),

  '& a': {
    display: 'flex'
  },

  '& svg, & img': {
    width: theme.spacing(4),
    height: theme.spacing(4)
  }
}));

const DivContent = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flex: 1,
  marginLeft: theme.spacing(1)
}));

const TypographyText = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center'
}));

const AppBar = ({
  children,
  brandLogo,
  brandText,
  secondaryText,
  showBurgerMenu,
  onClickMenu,
  ...otherProps
}) => {
  const classes = useStyles();

  return (
    <MuiAppBar {...otherProps}>
      <Toolbar>
        <DivRow>
          {showBurgerMenu && (
            <Hidden mdUp>
              <DivMenu>
                <IconButtonMenuButton onClick={onClickMenu}>
                  <MenuOutlined />
                </IconButtonMenuButton>
                <Divider orientation='vertical' flexItem light />
              </DivMenu>
            </Hidden>
          )}
          {brandLogo && <DivLogo>{brandLogo}</DivLogo>}
          {brandText && (
            <Typography
              component='span'
              variant='subtitle1'
              className={[
                classes.text,
                classes.brandText,
                secondaryText && classes.textSeparator
              ].join(' ')}
            >
              {brandText}
            </Typography>
          )}
          {secondaryText && (
            <TypographyText component='span' variant='body2' weight='strong'>
              {secondaryText}
            </TypographyText>
          )}
        </DivRow>

        <DivContent>{children}</DivContent>
      </Toolbar>
    </MuiAppBar>
  );
};

AppBar.defaultProps = {
  showBurgerMenu: false
};

AppBar.propTypes = {
  brandLogo: PropTypes.element,
  brandText: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  secondaryText: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onClickMenu: PropTypes.func,
  showBurgerMenu: PropTypes.bool
};

export default AppBar;
