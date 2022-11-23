import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  Grid,
  InputAdornment,
  Link,
  Divider,
  SvgIcon,
  TextField,
  Typography,
  makeStyles,
  Tooltip
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { animateValues } from './utils/animations';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.body2
  },

  categoriesWrapper: {
    maxHeight: theme.spacing(40),
    overflow: 'auto',
    padding: theme.spacing(0, 1, 1, 0)
  },

  selectable: {
    cursor: 'pointer',
    flexWrap: 'nowrap',

    '&:hover $progressbar div': {
      backgroundColor: theme.palette.secondary.dark
    }
  },

  element: {
    '&$unselected': {
      color: theme.palette.text.disabled,

      '& $progressbar div': {
        backgroundColor: theme.palette.text.disabled
      }
    },

    '&$rest $progressbar div': {
      backgroundColor: theme.palette.text.disabled
    }
  },

  label: {
    fontWeight: theme.typography.fontWeightBold,
    marginRight: theme.spacing(2)
  },

  progressbar: {
    height: theme.spacing(0.5),
    width: '100%',
    margin: theme.spacing(0.5, 0, 1, 0),
    borderRadius: theme.spacing(0.5),
    backgroundColor: theme.palette.action.disabledBackground,

    '& div': {
      width: 0,
      height: '100%',
      borderRadius: theme.spacing(0.5),
      backgroundColor: theme.palette.secondary.main,
      transition: `background-color ${theme.transitions.easing.sharp} ${theme.transitions.duration.shortest}ms,
                   width ${theme.transitions.easing.sharp} ${theme.transitions.duration.complex}ms`
    }
  },

  skeletonProgressbar: {
    height: theme.spacing(1),
    width: '100%',
    margin: theme.spacing(0.5, 0, 1, 0)
  },

  unselected: {},

  rest: {
    cursor: 'default'
  },

  optionsSelectedBar: {
    marginBottom: theme.spacing(2),
    paddingRight: theme.spacing(1),

    '& .MuiTypography-caption': {
      color: theme.palette.text.secondary
    },

    '& .MuiButton-label': {
      ...theme.typography.caption
    }
  },

  linkAsButton: {
    ...theme.typography.caption,
    cursor: 'pointer',

    '& + hr': {
      margin: theme.spacing(0, 1)
    }
  },

  searchInput: {
    marginTop: theme.spacing(-0.5)
  }
}));

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const REST_CATEGORY = '__rest__';

const SearchIcon = () => (
  <SvgIcon>
    <path
      d='M11,4 C14.8659932,4 18,7.13400675 18,11 C18,12.7003211 17.3937669,14.2590489 16.3856562,15.4718279 L19.4748737,18.5606602 L18.0606602,19.9748737 L14.8998887,16.8138615 C13.7854137,17.5629194 12.4437497,18 11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 Z M11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 Z'
      id='-↳Color'
      fill='inherit'
    ></path>
  </SvgIcon>
);

function CategoryWidgetUI(props) {
  const {
    data,
    formatter,
    labels,
    maxItems,
    order,
    selectedCategories,
    animation,
    filterable,
    searchable
  } = props;
  const [sortedData, setSortedData] = useState([]);
  const [maxValue, setMaxValue] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [blockedCategories, setBlockedCategories] = useState([]);
  const [tempBlockedCategories, setTempBlockedCategories] = useState(false);
  const [animValues, setAnimValues] = useState([]);
  const requestRef = useRef();
  const prevAnimValues = usePrevious(animValues);
  const referencedPrevAnimValues = useRef();
  const classes = useStyles({ filterable });

  // Get blockedCategories in the same order as original data
  const sortBlockedSameAsData = (blockedCategories) =>
    sortedData.reduce((acum, elem) => {
      if (blockedCategories.includes(elem.name)) acum.push(elem.name);
      return acum;
    }, []);

  const handleCategorySelected = (name) => {
    if (name !== REST_CATEGORY) {
      let categories;

      if (selectedCategories.indexOf(name) < 0) {
        categories = [...selectedCategories, name];
      } else {
        categories = selectedCategories.filter((c) => c !== name);
      }

      if (props.onSelectedCategoriesChange) {
        props.onSelectedCategoriesChange(categories);
      }
    }
  };

  const handleClearClicked = () => {
    props.onSelectedCategoriesChange([]);
  };

  const handleUnblockClicked = () => {
    props.onSelectedCategoriesChange([]);
    setBlockedCategories([]);
  };

  const handleBlockClicked = () => {
    setBlockedCategories(sortBlockedSameAsData(selectedCategories));
  };

  const handleApplyClicked = () => {
    const blockedCategoriesOrdered = sortBlockedSameAsData(tempBlockedCategories);

    props.onSelectedCategoriesChange([...blockedCategoriesOrdered]);
    setBlockedCategories([...blockedCategoriesOrdered]);
    setTempBlockedCategories([]);
    setShowAll(false);
    setSearchValue('');
  };

  const handleCancelClicked = () => {
    setSearchValue('');
    setShowAll(false);
  };

  const handleCategoryBlocked = (name) => {
    if (name !== REST_CATEGORY) {
      let categories;

      if (tempBlockedCategories.indexOf(name) < 0) {
        categories = [...tempBlockedCategories, name];
      } else {
        categories = tempBlockedCategories.filter((c) => c !== name);
      }

      setTempBlockedCategories(categories);
    }
  };

  const handleSearchFocus = (event) => {
    event.currentTarget.scrollIntoView();
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.currentTarget.value);
  };

  const handleShowAllCategoriesClicked = () => {
    setShowAll(true);
    setTempBlockedCategories([...selectedCategories]);
  };

  const compressList = useCallback(
    (list) => {
      if (!showAll) {
        // Showing top or selected categories
        if (!blockedCategories.length) {
          const main = list.slice(0, maxItems);
          if (main.length < list.length) {
            const rest = list.slice(maxItems).reduce(
              (acum, elem) => {
                acum.value += elem.value;
                return acum;
              },
              { name: REST_CATEGORY, value: 0 }
            );
            return [...main, rest];
          } else {
            return main;
          }

          // Showing only blocked categories
        } else {
          const main = blockedCategories.reduce((acum, name) => {
            const categoryElem = list.find((elem) => elem.name === name);
            acum.push({
              name,
              value: categoryElem ? categoryElem.value : null
            });
            return acum;
          }, []);
          return main;
        }

        // Showing all categories to block
      } else {
        return searchValue
          ? list.filter((elem) => {
              return (
                elem.name !== null &&
                elem.name !== undefined &&
                (elem.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1 ||
                  (labels[elem.name]
                    ? labels[elem.name]
                        .toLowerCase()
                        .indexOf(searchValue.toLowerCase()) !== -1
                    : false))
              );
            })
          : list;
      }
    },
    [blockedCategories, labels, maxItems, searchValue, showAll]
  );

  const getCategoriesCount = useCallback(() => {
    const blocked = blockedCategories.length;
    return blocked ? data.length - blocked : data.length - maxItems;
  }, [data, maxItems, blockedCategories]);

  const getCategoryLabel = useCallback(
    (name) => {
      if (name === REST_CATEGORY) {
        return `Others ${searchable ? '' : `(${getCategoriesCount()})`}`;
      } else {
        return labels[name] || `${name}`;
      }
    },
    [getCategoriesCount, labels, searchable]
  );

  const getProgressbarLength = useCallback(
    (value) => {
      return value >= maxValue
        ? value != null
          ? '100%'
          : 0
        : `${((value || 0) * 100) / maxValue}%`;
    },
    [maxValue]
  );

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setBlockedCategories([]);
    }
  }, [selectedCategories]);

  useEffect(() => {
    if (data) {
      // Ranking
      if (order === CategoryWidgetUI.ORDER_TYPES.RANKING) {
        const sorted = [...data].sort((a, b) => b.value - a.value);
        const compressed = compressList(sorted);
        compressed.length ? setMaxValue(compressed[0].value) : setMaxValue(1);
        setSortedData(compressed);

        // Fixed order
      } else if (order === CategoryWidgetUI.ORDER_TYPES.FIXED) {
        setMaxValue(
          Math.max.apply(
            Math,
            data.map((e) => e.value)
          )
        );
        const compressed = compressList(data);
        setSortedData(compressed);
      }
    }
  }, [
    blockedCategories,
    compressList,
    data,
    labels,
    maxItems,
    order,
    searchValue,
    showAll
  ]);

  useEffect(() => {
    referencedPrevAnimValues.current = prevAnimValues;
  }, [prevAnimValues]);

  useEffect(() => {
    if (animation) {
      animateValues({
        start: referencedPrevAnimValues.current || [],
        end: sortedData,
        duration: 500,
        drawFrame: (val) => setAnimValues(val),
        requestRef
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      return () => cancelAnimationFrame(requestRef.current);
    } else {
      setAnimValues(sortedData);
    }
  }, [animation, sortedData]);

  // Separated to simplify the widget layout but inside the main component to avoid passing all dependencies
  const CategoryItem = (props) => {
    const { data, onCategoryClick } = props;
    const value = formatter(data.value || 0);
    const [isOverflowed, setIsOverflowed] = useState(false);
    const textElementRef = useRef();

    const compareSize = () => {
      const compare =
        textElementRef?.current?.scrollWidth > textElementRef?.current?.clientWidth;
      setIsOverflowed(compare);
    };

    useEffect(() => {
      compareSize();
      window.addEventListener('resize', compareSize);
      return () => {
        window.removeEventListener('resize', compareSize);
      };
    }, []);

    return (
      <Grid
        container
        direction='row'
        spacing={1}
        onClick={filterable ? onCategoryClick : () => {}}
        className={`
          ${classes.element}
          ${filterable ? classes.selectable : ''}
          ${
            !showAll &&
            selectedCategories.length > 0 &&
            selectedCategories.indexOf(data.name) === -1
              ? classes.unselected
              : ''
          }
          ${data.name === REST_CATEGORY ? classes.rest : ''}
        `}
      >
        {filterable && showAll && (
          <Grid item>
            <Checkbox checked={tempBlockedCategories.indexOf(data.name) !== -1} />
          </Grid>
        )}
        <Grid container item xs>
          <Grid
            container
            item
            direction='row'
            justifyContent='space-between'
            wrap='nowrap'
          >
            <Tooltip
              title={getCategoryLabel(data.name)}
              disableHoverListener={!isOverflowed}
            >
              <Typography
                variant='body2'
                className={classes.label}
                noWrap
                ref={textElementRef}
              >
                {getCategoryLabel(data.name)}
              </Typography>
            </Tooltip>
            {typeof value === 'object' && value !== null ? (
              <span>
                {value.prefix}
                {value.value}
                {value.suffix}
              </span>
            ) : (
              <span>{value}</span>
            )}
          </Grid>
          <Grid item className={classes.progressbar}>
            <div style={{ width: getProgressbarLength(data.value) }}></div>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const CategoryItemSkeleton = () => (
    <>
      <Grid
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        className={classes.optionsSelectedBar}
      >
        <Typography variant='caption'>
          <Skeleton variant='text' width={100} />
        </Typography>
      </Grid>
      <Grid container item className={classes.categoriesWrapper}>
        {[...Array(4)].map((_, i) => (
          <Grid key={i} container direction='row' spacing={1} className={classes.element}>
            <Grid container item xs zeroMinWidth>
              <Grid container item direction='row' justifyContent='space-between'>
                <Typography variant='body2' noWrap>
                  <Skeleton variant='text' width={100} />
                </Typography>
                <Typography variant='body2'>
                  <Skeleton variant='text' width={70} />
                </Typography>
              </Grid>
              <Skeleton variant='text' className={classes.skeletonProgressbar} />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </>
  );

  return (
    <div className={classes.root}>
      {data?.length > 0 ? (
        <>
          {filterable && sortedData.length > 0 && (
            <Grid
              container
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              className={classes.optionsSelectedBar}
            >
              <Typography variant='caption'>
                {selectedCategories.length ? selectedCategories.length : 'All'} selected
              </Typography>
              {showAll ? (
                <Link className={classes.linkAsButton} onClick={handleApplyClicked}>
                  Apply
                </Link>
              ) : blockedCategories.length > 0 ? (
                <Link className={classes.linkAsButton} onClick={handleUnblockClicked}>
                  Unlock
                </Link>
              ) : (
                selectedCategories.length > 0 && (
                  <Grid container direction='row' justifyContent='flex-end' item xs>
                    <Link className={classes.linkAsButton} onClick={handleBlockClicked}>
                      Lock
                    </Link>
                    <Divider orientation='vertical' flexItem />
                    <Link className={classes.linkAsButton} onClick={handleClearClicked}>
                      Clear
                    </Link>
                  </Grid>
                )
              )}
            </Grid>
          )}
          {data.length > maxItems && showAll && (
            <Grid
              container
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              className={classes.optionsSelectedBar}
            >
              <TextField
                size='small'
                placeholder='Search'
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                className={classes.searchInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          )}
          <Grid container item className={classes.categoriesWrapper}>
            {animValues.length ? (
              animValues.map((d, i) => (
                <CategoryItem
                  key={i}
                  data={d}
                  onCategoryClick={() =>
                    showAll
                      ? handleCategoryBlocked(d.name)
                      : handleCategorySelected(d.name)
                  }
                />
              ))
            ) : (
              <>
                <Typography variant='body2'>No results</Typography>
                <Typography variant='caption'>
                  Your search "{searchValue}" didn't match with any value.
                </Typography>
              </>
            )}
          </Grid>
          {data.length > maxItems && searchable ? (
            showAll ? (
              <Button size='small' color='primary' onClick={handleCancelClicked}>
                Cancel
              </Button>
            ) : (
              <Button
                size='small'
                color='primary'
                startIcon={<SearchIcon />}
                onClick={handleShowAllCategoriesClicked}
              >
                Search in {getCategoriesCount()} elements
              </Button>
            )
          ) : null}
        </>
      ) : (
        <CategoryItemSkeleton />
      )}
    </div>
  );
}

/**
 * Enum for CategoryWidgetUI order types. 'RANKING' orders the data by value and 'FIXED' keeps the order present in the original data
 * @enum {string}
 */
CategoryWidgetUI.ORDER_TYPES = {
  RANKING: 'ranking',
  FIXED: 'fixed'
};

CategoryWidgetUI.defaultProps = {
  data: null,
  formatter: (v) => v,
  labels: {},
  maxItems: 5,
  order: CategoryWidgetUI.ORDER_TYPES.RANKING,
  selectedCategories: [],
  animation: true,
  filterable: true,
  searchable: true
};

CategoryWidgetUI.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
        .isRequired,
      value: PropTypes.number
    })
  ),
  formatter: PropTypes.func,
  labels: PropTypes.object,
  maxItems: PropTypes.number,
  selectedCategories: PropTypes.array,
  onSelectedCategoriesChange: PropTypes.func,
  order: PropTypes.oneOf(Object.values(CategoryWidgetUI.ORDER_TYPES)),
  animation: PropTypes.bool,
  filterable: PropTypes.bool,
  searchable: PropTypes.bool
};

export default CategoryWidgetUI;
