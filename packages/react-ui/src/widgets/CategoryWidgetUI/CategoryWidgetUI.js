import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  Grid,
  InputAdornment,
  Divider,
  TextField,
  Tooltip,
  Box
} from '@mui/material';

import { useIntl } from 'react-intl';

import { animateValues } from '../utils/animations';
import Typography from '../../components/atoms/Typography';
import CategorySkeleton from './CategorySkeleton';
import {
  CategoriesWrapper,
  CategoryItemGroup,
  CategoryLabel,
  LinkAsButton,
  OptionsSelectedBar,
  ProgressBar,
  CategoriesRoot,
  CategoryLabelWrapper,
  HiddenButton
} from './CategoryWidgetUI.styled';
import SearchIcon from '../../assets/icons/SearchIcon';
import useImperativeIntl from '../../hooks/useImperativeIntl';
import { ORDER_TYPES } from '../utils/chartConstants';
import useSkeleton from '../useSkeleton';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const REST_CATEGORY = '__rest__';
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
    searchable,
    isLoading
  } = props;
  const [sortedData, setSortedData] = useState([]);
  const [maxValue, setMaxValue] = useState(1);
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [blockedCategories, setBlockedCategories] = useState([]);
  const [tempBlockedCategories, setTempBlockedCategories] = useState(false);
  const [animValues, setAnimValues] = useState([]);
  const requestRef = useRef();
  const searchRef = useRef();
  const prevAnimValues = usePrevious(animValues);
  const referencedPrevAnimValues = useRef();
  const { showSkeleton } = useSkeleton(isLoading);

  const intl = useIntl();
  const intlConfig = useImperativeIntl(intl);

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
  const handleClearPress = (e) => {
    if (e.key === 'Enter') {
      handleClearClicked();
    }
  };

  const handleUnblockClicked = () => {
    props.onSelectedCategoriesChange([]);
    setBlockedCategories([]);
  };
  const handleUnblockPress = (e) => {
    if (e.key === 'Enter') {
      handleUnblockClicked();
    }
  };

  const handleBlockClicked = () => {
    setBlockedCategories(sortBlockedSameAsData(selectedCategories));
  };
  const handleBlockPress = (e) => {
    if (e.key === 'Enter') {
      handleBlockClicked();
    }
  };

  const handleApplyClicked = () => {
    const blockedCategoriesOrdered = sortBlockedSameAsData(tempBlockedCategories);

    props.onSelectedCategoriesChange([...blockedCategoriesOrdered]);
    setBlockedCategories([...blockedCategoriesOrdered]);
    setTempBlockedCategories([]);
    setShowAll(false);
    setSearchValue('');
  };
  const handleApplyPress = (e) => {
    if (e.key === 'Enter') {
      handleApplyClicked();
    }
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
      if (order === ORDER_TYPES.RANKING) {
        const sorted = [...data].sort((a, b) => b.value - a.value);
        const compressed = compressList(sorted);
        compressed.length ? setMaxValue(compressed[0].value) : setMaxValue(1);
        setSortedData(compressed);

        // Fixed order
      } else if (order === ORDER_TYPES.FIXED) {
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

  useEffect(() => {
    if (showAll && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showAll, searchRef]);

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

    const onCategoryPress = (e) => {
      if (e.key === 'Enter') {
        onCategoryClick();
      }
    };

    const unselected =
      !showAll &&
      selectedCategories.length > 0 &&
      selectedCategories.indexOf(data.name) === -1;

    return (
      <CategoryItemGroup
        container
        direction='row'
        spacing={1}
        onClick={filterable ? onCategoryClick : () => {}}
        onKeyDown={filterable ? onCategoryPress : () => {}}
        selectable={filterable}
        unselected={unselected}
        name={data.name === REST_CATEGORY ? REST_CATEGORY : ''}
        tabIndex={filterable ? 0 : -1}
      >
        {filterable && showAll && (
          <Grid item mr={1}>
            <Checkbox
              checked={tempBlockedCategories.indexOf(data.name) !== -1}
              tabIndex={-1}
            />
          </Grid>
        )}
        <CategoryLabelWrapper container item xs isSelectable={showAll}>
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
              <CategoryLabel variant='body2' noWrap ref={textElementRef}>
                {getCategoryLabel(data.name)}
              </CategoryLabel>
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
          <ProgressBar className='progressbar' item>
            <div style={{ width: getProgressbarLength(data.value) }}></div>
          </ProgressBar>
        </CategoryLabelWrapper>
      </CategoryItemGroup>
    );
  };

  if (data?.length === 0 || showSkeleton) return <CategorySkeleton />;

  return (
    <CategoriesRoot>
      {filterable && sortedData.length > 0 && (
        <OptionsSelectedBar container>
          <Typography variant='caption'>
            {selectedCategories.length > 0
              ? intlConfig.formatMessage(
                  { id: 'c4r.widgets.category.selectedItems' },
                  { items: selectedCategories.length }
                )
              : intlConfig.formatMessage({ id: 'c4r.widgets.category.all' })}
          </Typography>
          {showAll ? (
            <LinkAsButton
              onClick={handleApplyClicked}
              onKeyDown={handleApplyPress}
              underline='hover'
              tabIndex={0}
              data-testid='primaryApplyButton'
            >
              {intlConfig.formatMessage({ id: 'c4r.widgets.category.apply' })}
            </LinkAsButton>
          ) : blockedCategories.length > 0 ? (
            <LinkAsButton
              onClick={handleUnblockClicked}
              onKeyDown={handleUnblockPress}
              underline='hover'
              tabIndex={0}
            >
              {intlConfig.formatMessage({ id: 'c4r.widgets.category.unlock' })}
            </LinkAsButton>
          ) : (
            selectedCategories.length > 0 && (
              <Grid container direction='row' justifyContent='flex-end' item xs>
                <LinkAsButton
                  onClick={handleBlockClicked}
                  onKeyDown={handleBlockPress}
                  underline='hover'
                  tabIndex={0}
                >
                  {intlConfig.formatMessage({ id: 'c4r.widgets.category.lock' })}
                </LinkAsButton>
                <Divider orientation='vertical' flexItem />
                <LinkAsButton
                  onClick={handleClearClicked}
                  onKeyDown={handleClearPress}
                  underline='hover'
                  tabIndex={0}
                >
                  {intlConfig.formatMessage({ id: 'c4r.widgets.category.clear' })}
                </LinkAsButton>
              </Grid>
            )
          )}
        </OptionsSelectedBar>
      )}
      {data.length > maxItems && showAll && (
        <OptionsSelectedBar container>
          <TextField
            size='small'
            mt={-0.5}
            placeholder={intlConfig.formatMessage({
              id: 'c4r.widgets.category.search'
            })}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            inputProps={{
              tabIndex: 0,
              ref: searchRef
            }}
          />
          <HiddenButton size='small' color='primary' onClick={handleCancelClicked}>
            {intlConfig.formatMessage({ id: 'c4r.widgets.category.cancel' })}
          </HiddenButton>
        </OptionsSelectedBar>
      )}
      <CategoriesWrapper container item>
        {animValues.length ? (
          animValues.map((d, i) => (
            <CategoryItem
              key={i}
              data={d}
              onCategoryClick={() =>
                showAll ? handleCategoryBlocked(d.name) : handleCategorySelected(d.name)
              }
            />
          ))
        ) : (
          <Box>
            <Typography variant='body2'>
              {intlConfig.formatMessage({ id: 'c4r.widgets.category.noResults' })}
            </Typography>
            <Typography component='p' variant='caption' mb={2}>
              {intlConfig.formatMessage(
                { id: 'c4r.widgets.category.noResultsMessage' },
                { searchValue }
              )}
            </Typography>
          </Box>
        )}
      </CategoriesWrapper>
      {showAll && (
        <HiddenButton onClick={handleApplyClicked} onKeyDown={handleApplyPress}>
          {intlConfig.formatMessage({ id: 'c4r.widgets.category.apply' })}
        </HiddenButton>
      )}
      {data.length > maxItems && searchable ? (
        showAll ? (
          <Box mt={1.5}>
            <Button
              size='small'
              color='primary'
              onClick={handleCancelClicked}
              data-testid='primaryCancelButton'
            >
              {intlConfig.formatMessage({ id: 'c4r.widgets.category.cancel' })}
            </Button>
          </Box>
        ) : (
          <Box mt={1.5}>
            <Button
              size='small'
              color='primary'
              startIcon={<SearchIcon />}
              onClick={handleShowAllCategoriesClicked}
            >
              {intlConfig.formatMessage(
                { id: 'c4r.widgets.category.searchInfo' },
                { elements: getCategoriesCount() }
              )}
            </Button>
          </Box>
        )
      ) : null}
    </CategoriesRoot>
  );
}

CategoryWidgetUI.defaultProps = {
  data: null,
  formatter: (v) => v,
  labels: {},
  maxItems: 5,
  order: ORDER_TYPES.RANKING,
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
  order: PropTypes.oneOf(Object.values(ORDER_TYPES)),
  animation: PropTypes.bool,
  filterable: PropTypes.bool,
  searchable: PropTypes.bool,
  isLoading: PropTypes.bool,
  intl: PropTypes.object
};

export default CategoryWidgetUI;
