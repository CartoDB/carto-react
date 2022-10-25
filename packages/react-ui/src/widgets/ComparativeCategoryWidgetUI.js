import {
  Box,
  Button,
  Checkbox,
  darken,
  Divider,
  InputAdornment,
  lighten,
  Link,
  makeStyles,
  SvgIcon,
  TextField,
  Tooltip,
  Typography,
  useTheme,
  withStyles
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import AnimatedNumber, {
  animationOptionsPropTypes
} from '../custom-components/AnimatedNumber';

/**
 * Enum for ComparativeCategoryWidgetUI order types. 'RANKING' orders the data by value and 'FIXED' keep the order present in the original data
 * @enum {string}
 */
export const ORDER_TYPES = {
  RANKING: 'RANKING',
  FIXED: 'FIXED'
};

const IDENTITY_FN = (v) => v;
const EMPTY_ARRAY = [];

/** transpose incoming data to group items by column, apply colors and labels
 * @param {{ name: string; value: number }[][]} data
 * @param {string[]} colors
 * @param {string[]} labels
 * @param {string[]} selectedCategories
 * @param {ORDER_TYPES} order
 *
 * @returns {{ label: string; key: string; data: { color: string; value: number }[] }[]}
 */
function transposeData(data, colors, labels, selectedCategories, order) {
  const reference = data[0] || [];
  const transposed = reference.map((item, itemIndex) => {
    const isDisabled =
      selectedCategories.length > 0 && selectedCategories.indexOf(item.name) === -1;

    const label = labels[itemIndex] || item.name;
    const indexData = data.map((group, groupIndex) => ({
      color: isDisabled ? lighten(colors[groupIndex], 0.8) : colors[groupIndex],
      value: group[itemIndex].value
    }));

    return {
      label,
      key: item.name,
      data: indexData
    };
  });

  // only sort the list if order type is 'RANKING'
  // if order type is 'FIXED' keep the sort order from data
  if (order === ORDER_TYPES.RANKING) {
    transposed.sort((a, b) => {
      const aMax = Math.max(...a.data.map((d) => d.value));
      const bMax = Math.max(...b.data.map((d) => d.value));
      return bMax - aMax;
    });
  }

  return transposed;
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(2, 0),
    ...theme.typography.body2
  },
  categoriesList: {
    overflow: 'auto',
    maxHeight: theme.spacing(40),
    paddingRight: theme.spacing(1),
    margin: theme.spacing(0.5, 0)
  },
  label: {},
  positive: {},
  negative: {},
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
      transition: `background-color ${theme.transitions.easing.sharp} ${theme.transitions.duration.shortest}ms,
                   width ${theme.transitions.easing.sharp} ${theme.transitions.duration.complex}ms`
    }
  },
  toolbar: {
    marginBottom: theme.spacing(2),
    paddingRight: theme.spacing(1),

    '& .MuiTypography-caption': {
      color: theme.palette.text.secondary
    },

    '& .MuiButton-label': {
      ...theme.typography.caption
    },

    '& a': {
      cursor: 'pointer'
    }
  },
  searchInput: {
    marginTop: theme.spacing(-0.5)
  },
  categoryGroup: {
    '& $progressbar div': {
      backgroundColor: 'var(--color)'
    }
  },
  categoryGroupHover: {
    cursor: 'pointer',
    '&:hover $progressbar div': {
      backgroundColor: 'var(--hover-color)'
    },
    '& $progressbar div': {
      backgroundColor: 'var(--color)'
    }
  },
  bullet: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: theme.spacing(1)
  }
}));

const OTHERS_KEY = 'others';

function SearchIcon() {
  return (
    <SvgIcon>
      <path
        d='M11,4 C14.8659932,4 18,7.13400675 18,11 C18,12.7003211 17.3937669,14.2590489 16.3856562,15.4718279 L19.4748737,18.5606602 L18.0606602,19.9748737 L14.8998887,16.8138615 C13.7854137,17.5629194 12.4437497,18 11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 Z M11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 Z'
        id='Color'
        fill='inherit'
      ></path>
    </SvgIcon>
  );
}

/** Renders a <ComparativeCategoryWidgetUI /> widget
 * @param {Object} props
 * @param {string[]} props.names
 * @param {{ name: string; value: number }[][]} props.data
 * @param {string[]} [props.labels]
 * @param {string[]} [props.colors]
 * @param {number} [props.maxItems]
 * @param {ORDER_TYPES} [props.order]
 * @param {boolean} [props.animation]
 * @param {Object} [props.animationOptions]
 * @param {boolean} [props.searchable]
 * @param {boolean} [props.searchable]
 * @param {boolean} [props.filterable]
 * @param {string[]} [props.selectedCategories]
 * @param {(categories: string[]) => any} [props.onSelectedCategoriesChange]
 * @param {(v: any) => any} [props.formatter]
 */
function ComparativeCategoryWidgetUI({
  names = EMPTY_ARRAY,
  data = EMPTY_ARRAY,
  labels = EMPTY_ARRAY,
  colors,
  maxItems = 5,
  order = ORDER_TYPES.FIXED,
  animation = true,
  animationOptions,
  searchable = true,
  filterable = true,
  selectedCategories = EMPTY_ARRAY,
  onSelectedCategoriesChange = IDENTITY_FN,
  formatter = IDENTITY_FN
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [searchActive, setSearchActive] = useState(false);
  const [blockingActive, setBlockingActive] = useState(false);
  const [tempSelection, setTempSelection] = useState(selectedCategories);
  const [searchValue, setSearchValue] = useState('');

  // process incoming data to group items by column, apply colors and labels
  const processedData = useMemo(() => {
    const _colors = colors || [
      theme.palette.secondary.main,
      theme.palette.primary.main,
      theme.palette.info.main
    ];
    return transposeData(data, _colors, labels, selectedCategories, order);
  }, [data, colors, labels, theme, selectedCategories, order]);

  const maxValue = useMemo(() => {
    return Math.max(...data.map((group) => group.map((g) => g.value)).flat());
  }, [data]);

  // cut the list created in processedData according to maxItems prop and create the 'Others' category with the rest
  const compressedData = useMemo(() => {
    if (maxItems >= processedData.length) {
      return processedData;
    }

    const visibleItems = processedData.slice(0, maxItems);
    const otherItems = processedData.slice(maxItems);

    const otherSum = [];
    for (const item of otherItems) {
      item.data.forEach((d, i) => {
        otherSum[i] = otherSum[i] || 0;
        otherSum[i] += d.value;
      });
    }

    const combinedOther = {
      key: OTHERS_KEY,
      label: searchable ? 'Others' : `Others (${processedData.length - maxItems})`,
      data: otherSum.map((sum) => ({
        value: sum,
        color: theme.palette.divider
      }))
    };

    return [...visibleItems, combinedOther];
  }, [processedData, searchable, maxItems, theme.palette.divider]);

  // filter the list created in processedData using selected categories
  const blockedData = useMemo(() => {
    return processedData.filter((c) => selectedCategories.indexOf(c.key) !== -1);
  }, [processedData, selectedCategories]);

  const filteredData = useMemo(() => {
    if (!searchValue) {
      return processedData;
    }

    return processedData.filter((el) => {
      const key = (el.key || '').toLowerCase();
      const label = (el.label || '').toLowerCase();

      const keyMatches = key && key.indexOf(searchValue.toLowerCase()) !== -1;
      const labelMatches = label && label.indexOf(searchValue.toLowerCase()) !== -1;

      return keyMatches || labelMatches;
    });
  }, [processedData, searchValue]);

  const otherCount = processedData.length - compressedData.length + 1;
  const showSearchToggle = searchable && !searchActive && maxItems < processedData.length;

  if (processedData.length === 0) {
    return <MultipleCategoryUISkeleton />;
  }

  const list = searchActive
    ? filteredData
    : blockingActive
    ? blockedData
    : compressedData;

  function applyTempSelection() {
    setBlockingActive(true);
    onSelectedCategoriesChange([...tempSelection]);
    disableSearchMode();
  }

  function disableBlocking() {
    setBlockingActive(false);
  }

  function clearSelection() {
    onSelectedCategoriesChange([]);
  }

  function enableBlocking() {
    setBlockingActive(true);
  }

  function enableSearchMode() {
    setSearchActive(true);
    setTempSelection([...selectedCategories]);
  }

  function disableSearchMode() {
    setSearchActive(false);
    setTempSelection([]);
  }

  function selectCategory(category) {
    const isSelected = selectedCategories.indexOf(category) !== -1;
    const set = new Set(selectedCategories);
    if (isSelected) {
      set.delete(category);
    } else {
      set.add(category);
    }

    let newCategories = Array.from(set);
    if (newCategories.length === processedData.length) {
      newCategories = [];
    }

    onSelectedCategoriesChange(newCategories);
  }

  function selectTempCategory(category) {
    const isSelected = tempSelection.indexOf(category) !== -1;
    const set = new Set(tempSelection);
    if (isSelected) {
      set.delete(category);
    } else {
      set.add(category);
    }

    let newCategories = Array.from(set);
    if (newCategories.length === processedData.length) {
      newCategories = [];
    }

    setTempSelection(newCategories);
  }

  const clickHandler = filterable
    ? searchActive
      ? selectTempCategory
      : selectCategory
    : undefined;

  return (
    <div className={classes.wrapper}>
      {filterable ? (
        <Box
          display='flex'
          alignItems='center'
          justifyContent='space-between'
          className={classes.toolbar}
        >
          <Typography variant='caption'>
            {selectedCategories.length ? selectedCategories.length : 'All'}
            {' selected'}
          </Typography>
          <Typography variant='caption'>
            {searchActive ? (
              <Link onClick={applyTempSelection}>Apply</Link>
            ) : blockingActive ? (
              <Link onClick={disableBlocking}>Unlock</Link>
            ) : selectedCategories.length ? (
              <Box display='flex' justifyContent='flex-end' gridGap={theme.spacing(1)}>
                <Link onClick={enableBlocking}>Lock</Link>
                <Divider orientation='vertical' flexItem />
                <Link onClick={clearSelection}>Clear</Link>
              </Box>
            ) : null}
          </Typography>
        </Box>
      ) : null}
      {searchActive ? (
        <Box className={classes.toolbar}>
          <TextField
            size='small'
            placeholder='Search'
            onChange={(ev) => setSearchValue(ev.currentTarget.value)}
            onFocus={(ev) => ev.currentTarget.scrollIntoView()}
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Box>
      ) : null}
      <Box display='flex' flexDirection='column' className={classes.categoriesList}>
        {list.length === 0 ? (
          <>
            <Typography variant='body2'>No results</Typography>
            <Typography variant='caption'>
              Your search "{searchValue}" didn't match with any value.
            </Typography>
          </>
        ) : null}
        {list.map((d) => (
          <CategoryItem
            key={d.key}
            item={d}
            animation={animation}
            animationOptions={animationOptions}
            maxValue={maxValue}
            showCheckbox={filterable && searchActive}
            checkboxChecked={tempSelection.indexOf(d.key) !== -1}
            className={filterable ? classes.categoryGroupHover : classes.categoryGroup}
            formatter={formatter}
            onClick={clickHandler}
            names={names}
          />
        ))}
      </Box>
      {showSearchToggle ? (
        <Button
          size='small'
          color='primary'
          startIcon={<SearchIcon />}
          onClick={enableSearchMode}
        >
          Search in {otherCount} elements
        </Button>
      ) : null}
      {searchActive ? (
        <Button size='small' color='primary' onClick={disableSearchMode}>
          Cancel
        </Button>
      ) : null}
      <Box py={2} display='flex' alignItems='center' gridGap={theme.spacing(1.5)}>
        {names.map((name, i) => (
          <Box
            key={names[i]}
            display='flex'
            alignItems='center'
            gridGap={theme.spacing(0.75)}
          >
            <div
              className={classes.bullet}
              style={{
                backgroundColor: colors?.[i] || theme.palette.background.default
              }}
            ></div>
            <Typography variant='overline'>{name}</Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
}

ComparativeCategoryWidgetUI.displayName = 'ComparativeCategoryWidgetUI';
ComparativeCategoryWidgetUI.defaultProps = {
  names: EMPTY_ARRAY,
  data: EMPTY_ARRAY,
  labels: EMPTY_ARRAY,
  colors: EMPTY_ARRAY,
  maxItems: 5,
  order: ORDER_TYPES.FIXED,
  animation: true,
  animationOptions: {},
  searchable: true,
  filterable: true,
  selectedCategories: [],
  onSelectedCategoriesChange: IDENTITY_FN,
  formatter: IDENTITY_FN
};
ComparativeCategoryWidgetUI.propTypes = {
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired
      })
    )
  ).isRequired,
  labels: PropTypes.arrayOf(PropTypes.string),
  colors: PropTypes.arrayOf(PropTypes.string),
  maxItems: PropTypes.number,
  order: PropTypes.oneOf([ORDER_TYPES.FIXED, ORDER_TYPES.RANKING]),
  animation: PropTypes.bool,
  animationOptions: animationOptionsPropTypes,
  searchable: PropTypes.bool,
  filterable: PropTypes.bool,
  selectedCategories: PropTypes.arrayOf(PropTypes.string),
  onSelectedCategoriesChange: PropTypes.func,
  formatter: PropTypes.func
};

export default ComparativeCategoryWidgetUI;

const transposedCategoryItemPropTypes = PropTypes.shape({
  key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired
    })
  ).isRequired
}).isRequired;

function MultipleCategoryUISkeleton() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        className={classes.toolbar}
      >
        <Typography variant='caption'>
          <Skeleton variant='text' width={100} />
        </Typography>
      </Box>
      <Box display='flex' flexDirection='column' className={classes.categoriesList}>
        {[...Array(4)].map((_, i) => (
          <Box key={i} py={0.5}>
            <Box display='flex' justifyContent='space-between' flexWrap='nowrap'>
              <Typography variant='body2' noWrap>
                <Skeleton variant='text' width={100} />
              </Typography>
              <Typography variant='body2'>
                <Skeleton variant='text' width={70} />
              </Typography>
            </Box>
            {[...Array(3)].map((_, i) => (
              <div key={i} className={classes.progressbar}></div>
            ))}
          </Box>
        ))}
      </Box>
    </div>
  );
}

function MultipleCategoryTooltip({ item, names, formatter = IDENTITY_FN }) {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <div>
      <Typography color='inherit' variant='caption' noWrap>
        {item.label}
      </Typography>
      <Box pt={1}>
        {item.data.map((d, i) => (
          <Box
            key={names[i]}
            display='flex'
            alignItems='center'
            gridGap={theme.spacing(0.75)}
          >
            <div
              className={classes.bullet}
              style={{
                backgroundColor:
                  item.key === OTHERS_KEY ? theme.palette.background.default : d.color
              }}
            ></div>
            <Typography color='inherit' variant='caption'>
              {names[i]}
            </Typography>
            <Box flexGrow={1}></Box>
            <Typography color='inherit' variant='caption'>
              {formatter(d.value)}
            </Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
}

MultipleCategoryTooltip.displayName = 'MultipleCategoryTooltip';
MultipleCategoryTooltip.defaultProps = {
  names: EMPTY_ARRAY,
  formatter: IDENTITY_FN
};
MultipleCategoryTooltip.propTypes = {
  item: transposedCategoryItemPropTypes,
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  formatter: PropTypes.func
};

const StyledTooltip = withStyles((theme) => ({
  tooltip: {
    color: theme.palette.common.white,
    maxWidth: 260
  }
}))(Tooltip);

function CategoryItem({
  item,
  animation,
  animationOptions,
  maxValue,
  showCheckbox,
  checkboxChecked,
  className,
  formatter,
  onClick = IDENTITY_FN,
  names
}) {
  const classes = useStyles();
  const theme = useTheme();
  const compareValue = useMemo(() => {
    const reference = item.data[0].value;
    const max = Math.max(...item.data.map((d) => d.value));
    return reference - max;
  }, [item]);

  const valueColor =
    Math.sign(compareValue) === -1
      ? theme.palette.error.main
      : theme.palette.success.main;

  const numberColor = item.key === OTHERS_KEY ? theme.palette.text.disabled : valueColor;

  function getProgressbarLength(value) {
    return `${Math.min(100, ((value || 0) / maxValue) * 100)}%`;
  }

  const tooltipContent = (
    <MultipleCategoryTooltip item={item} names={names} formatter={formatter} />
  );

  return (
    <StyledTooltip placement='top-start' title={tooltipContent}>
      <Box
        display='flex'
        alignItems='center'
        flexWrap='nowrap'
        gridGap={theme.spacing(1)}
        onClick={() => onClick(item.key)}
        className={className}
      >
        {showCheckbox ? <Checkbox checked={checkboxChecked} /> : null}
        <Box py={0.5} flexGrow='1'>
          <Box display='flex' justifyContent='space-between' flexWrap='nowrap'>
            <Tooltip title={item.label}>
              <Typography className={classes.label} variant='body2' noWrap>
                {item.label}
              </Typography>
            </Tooltip>
            <Typography style={{ color: numberColor }} variant='body2'>
              <AnimatedNumber
                value={compareValue || 0}
                enabled={animation}
                options={animationOptions}
                formatter={formatter}
              />
            </Typography>
          </Box>
          {item.data.map((d, i) => (
            <div key={`${item.key}_${i}`} className={classes.progressbar}>
              <div
                style={
                  /* @ts-ignore */ {
                    '--hover-color': darken(d.color, 0.2),
                    '--color': d.color,
                    width: getProgressbarLength(d.value)
                  }
                }
              ></div>
            </div>
          ))}
        </Box>
      </Box>
    </StyledTooltip>
  );
}

CategoryItem.displayName = 'CategoryItem';
CategoryItem.defaultProps = {
  animation: true,
  animationOptions: {},
  className: '',
  formatter: IDENTITY_FN,
  onClick: IDENTITY_FN
};
CategoryItem.propTypes = {
  item: transposedCategoryItemPropTypes,
  animation: PropTypes.bool,
  animationOptions: animationOptionsPropTypes,
  maxValue: PropTypes.number.isRequired,
  showCheckbox: PropTypes.bool.isRequired,
  checkboxChecked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  formatter: PropTypes.func,
  onClick: PropTypes.func,
  names: PropTypes.arrayOf(PropTypes.string).isRequired
};
