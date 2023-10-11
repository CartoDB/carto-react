import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, styled } from '@mui/material';
import Typography from '../../../components/atoms/Typography';
import { calculatePercentage, findLargestCategory } from '../../utils/chartUtils';

const Root = styled(Box)(({ theme }) => ({
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingBottom: theme.spacing(1)
}));

const Category = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  maxWidth: '140px',
  textTransform: 'uppercase'
}));

const MarkerColor = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  borderRadius: theme.spacing(0.5),
  width: theme.spacing(1),
  minWidth: theme.spacing(1),
  height: theme.spacing(1)
}));

function PieCentralText({ data, selectedCategories }) {
  const [selectedItem, setSelectedItem] = useState({});

  // Select the largest category to display in CentralText and calculate its percentage from the total
  const topSelectedCategory = useMemo(() => {
    if (!data || data.length === 0) {
      return null;
    }

    let array;
    if (selectedCategories.length > 0) {
      array = data.filter((dataItem) => selectedCategories.includes(dataItem.name));
    } else {
      array = data;
    }

    const largestCategory = findLargestCategory(array);
    const category = array.find((element) => element === largestCategory);

    if (!category) {
      return null;
    }

    let sumValue = 0;
    for (const category of data) {
      sumValue += category.value;
    }

    const percentage = calculatePercentage(category.value, sumValue);
    category.percentage = percentage;

    return category;
  }, [data, selectedCategories]);

  useEffect(() => {
    if (topSelectedCategory) {
      setSelectedItem(topSelectedCategory);
    }
  }, [topSelectedCategory, setSelectedItem]);

  const { name, percentage, color } = selectedItem;

  if (!selectedItem) {
    return null;
  }

  return (
    <Root>
      <Typography variant='h5'>{percentage}</Typography>
      <Category>
        <MarkerColor bgcolor={color} component='span' />
        <Typography component='span' variant='body2' noWrap>
          {name}
        </Typography>
      </Category>
    </Root>
  );
}

PieCentralText.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.number,
      color: PropTypes.string
    })
  ),
  selectedCategories: PropTypes.array
};

export default PieCentralText;
