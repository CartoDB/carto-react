// TODO: replace widgets Tooltip content with this component
// https://app.shortcut.com/cartoteam/story/272209/replace-widgets-tooltip-with-tooltipdata
import React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material';

import Typography from '../atoms/Typography';

const Content = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  paddingLeft: 0,
  margin: theme.spacing(0.5, 0, 0, 0)
}));

const Entry = styled('li')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '&:not(:last-child)': {
    marginBottom: theme.spacing(0.5)
  }
}));

const Bullet = styled('span')(({ theme }) => ({
  width: theme.spacing(1),
  height: theme.spacing(1),
  marginRight: theme.spacing(0.5),
  border: `2px solid ${theme.palette.qualitative.bold[1]}`,
  borderRadius: '50%',
  backgroundColor: theme.palette.qualitative.bold[1]
}));

const Category = styled(Typography)(({ theme }) => ({
  minWidth: theme.spacing(10),
  marginRight: theme.spacing(1.5)
}));

const TooltipData = ({ items, title }) => {
  return (
    <>
      {title && (
        <Typography color='inherit' variant='caption' weight='medium'>
          {title}
        </Typography>
      )}

      <Content>
        {items.map((item, index) => (
          <Entry key={index}>
            <Bullet
              style={{
                backgroundColor: `${item.outlinedBullet ? 'transparent' : item.color}`,
                borderColor: item.color
              }}
            ></Bullet>
            {item.category && (
              <Category color='inherit' variant='caption'>
                {item.category}
              </Category>
            )}
            <Typography color='inherit' variant='caption' weight='medium'>
              {item.value}
            </Typography>
          </Entry>
        ))}
      </Content>
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
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      outlinedBullet: PropTypes.bool,
      color: PropTypes.string
    })
  ).isRequired,
  title: PropTypes.string
};

export default TooltipData;
