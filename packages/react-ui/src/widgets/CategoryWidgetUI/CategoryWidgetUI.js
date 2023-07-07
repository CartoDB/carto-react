import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  Grid,
  InputAdornment,
  Divider,
  TextField,
  Tooltip
} from '@mui/material';

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
  CategoriesRoot
} from './CategoryWidgetUI.styled';
import SearchIcon from '../../assets/icons/SearchIcon';
import useImperativeIntl from '../../hooks/useImperativeIntl';

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
    isLoading,
    locale
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

  const intl = useImperativeIntl(locale);

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
        selectable={filterable}
        unselected={unselected}
        name={data.name === REST_CATEGORY ? REST_CATEGORY : ''}
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
        </Grid>
      </CategoryItemGroup>
    );
  };

  if (data?.length === 0 || isLoading) return <CategorySkeleton />;

  return (
    <CategoriesRoot>
      {filterable && sortedData.length > 0 && (
        <OptionsSelectedBar container>
          <Typography variant='caption'>
            {selectedCategories.length > 0
              ? intl.formatMessage(
                  { id: 'c4r.widgets.category.selectedItems' },
                  { items: selectedCategories.length }
                )
              : intl.formatMessage({ id: 'c4r.widgets.category.all' })}
          </Typography>
          {showAll ? (
            <LinkAsButton onClick={handleApplyClicked} underline='hover'>
              {intl.formatMessage({ id: 'c4r.widgets.category.apply' })}
            </LinkAsButton>
          ) : blockedCategories.length > 0 ? (
            <LinkAsButton onClick={handleUnblockClicked} underline='hover'>
              {intl.formatMessage({ id: 'c4r.widgets.category.unlock' })}
            </LinkAsButton>
          ) : (
            selectedCategories.length > 0 && (
              <Grid container direction='row' justifyContent='flex-end' item xs>
                <LinkAsButton onClick={handleBlockClicked} underline='hover'>
                  {intl.formatMessage({ id: 'c4r.widgets.category.lock' })}
                </LinkAsButton>
                <Divider orientation='vertical' flexItem />
                <LinkAsButton onClick={handleClearClicked} underline='hover'>
                  {intl.formatMessage({ id: 'c4r.widgets.category.clear' })}
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
            placeholder={intl.formatMessage({ id: 'c4r.widgets.category.search' })}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
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
          <>
            <Typography variant='body2'>
              {intl.formatMessage({ id: 'c4r.widgets.category.noResults' })}
            </Typography>
            <Typography variant='caption'>
              {intl.formatMessage(
                { id: 'c4r.widgets.category.noResultsMessage' },
                { searchValue }
              )}
            </Typography>
          </>
        )}
      </CategoriesWrapper>
      {data.length > maxItems && searchable ? (
        showAll ? (
          <Button size='small' color='primary' onClick={handleCancelClicked}>
            {intl.formatMessage({ id: 'c4r.widgets.category.cancel' })}
          </Button>
        ) : (
          <Button
            size='small'
            color='primary'
            startIcon={<SearchIcon />}
            onClick={handleShowAllCategoriesClicked}
          >
            {intl.formatMessage(
              { id: 'c4r.widgets.category.searchInfo' },
              { elements: getCategoriesCount() }
            )}
          </Button>
        )
      ) : null}
    </CategoriesRoot>
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
  searchable: PropTypes.bool,
  isLoading: PropTypes.bool,
  locale: PropTypes.object
};

export default CategoryWidgetUI;
