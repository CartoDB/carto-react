import React from 'react';
import PropTypes from 'prop-types';
import { AppBar as MuiAppBar, Divider, Hidden, IconButton, Toolbar } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { MenuOutlined } from '@mui/icons-material';
import Typography from '../atoms/Typography';
import { APPBAR_SIZE } from '../../theme/themeConstants';

const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: 'center'
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    height: APPBAR_SIZE,
    marginRight: theme.spacing(1.5)
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  logo: {
    display: 'flex',
    marginRight: theme.spacing(1.5),

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
  textSeparator: {
    '&::after': {
      content: '"/"',
      margin: theme.spacing(0, 1),
      color: theme.palette.white[60]
    }
  }
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
        <div className={classes.row}>
          {showBurgerMenu && (
            <Hidden mdUp>
              <div className={classes.menu}>
                <IconButton onClick={onClickMenu} className={classes.menuButton}>
                  <MenuOutlined />
                </IconButton>
                <Divider orientation='vertical' flexItem light />
              </div>
            </Hidden>
          )}
          {brandLogo && <div className={classes.logo}>{brandLogo}</div>}
          {brandText && (
            <Typography
              variant='subtitle1'
              className={secondaryText && classes.textSeparator}
            >
              {brandText}
            </Typography>
          )}
          {secondaryText && (
            <Typography variant='body2' weight='strong'>
              {secondaryText}
            </Typography>
          )}
        </div>

        <div className={classes.content}>{children}</div>
      </Toolbar>
    </MuiAppBar>
  );
};

AppBar.defaultProps = {
  showBurgerMenu: false
};

AppBar.propTypes = {
  brandLogo: PropTypes.element,
  brandText: PropTypes.string,
  secondaryText: PropTypes.string,
  onClickMenu: PropTypes.func,
  showBurgerMenu: PropTypes.bool
};

export default AppBar;
