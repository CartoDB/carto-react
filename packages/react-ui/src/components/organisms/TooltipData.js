// TODO: replace widgets Tooltip content with this component
// https://app.shortcut.com/cartoteam/story/272209/replace-widgets-tooltip-with-tooltipdata
import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '../atoms/Typography';

const useStyles = makeStyles((theme) => ({
  list: {
    listStyle: 'none',
    paddingLeft: 0,
    margin: theme.spacing(0.5, 0, 0, 0)
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '&:not(:last-child)': {
      marginBottom: theme.spacing(0.5)
    }
  },
  bullet: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    marginRight: theme.spacing(0.5),
    border: `2px solid ${theme.palette.qualitative.bold[1]}`,
    borderRadius: '50%',
    backgroundColor: theme.palette.qualitative.bold[1]
  },
  category: {
    minWidth: theme.spacing(10),
    marginRight: theme.spacing(1.5)
  }
}));

const TooltipData = ({ items, title }) => {
  const classes = useStyles();

  return (
    <>
      {title && (
        <Typography color='inherit' variant='caption' weight='medium'>
          {title}
        </Typography>
      )}

      <ul className={classes.list}>
        {items.map((item, index) => (
          <li key={index} className={classes.item}>
            <span
              className={classes.bullet}
              style={{
                backgroundColor: `${item.outlinedBullet ? 'transparent' : item.color}
            `,
                borderColor: item.color
              }}
            ></span>
            {item.category && (
              <Typography color='inherit' variant='caption' className={classes.category}>
                {item.category}
              </Typography>
            )}
            <Typography color='inherit' variant='caption' weight='medium'>
              {item.value}
            </Typography>
          </li>
        ))}
      </ul>
    </>
  );
};

TooltipData.defaultProps = {
  items: [
    {
      outlinedBullet: false
    }
  ]
};

TooltipData.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      value: PropTypes.number.isRequired,
      outlinedBullet: PropTypes.bool,
      color: PropTypes.string
    })
  ).isRequired,
  title: PropTypes.string
};

export default TooltipData;
