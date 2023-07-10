import {
  Box,
  Button,
  Divider,
  InputAdornment,
  Link,
  SvgIcon,
  useTheme
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { animationOptionsPropTypes } from '../../../custom-components/AnimatedNumber';
import CategoryWidgetUI from '../../CategoryWidgetUI/CategoryWidgetUI';
import { transposeCategoryData } from './transposeCategoryData';
import CategorySkeleton from '../../CategoryWidgetUI/CategorySkeleton';
import Typography from '../../../components/atoms/Typography';
import {
  Bullet,
  BulletWrapper,
  BulletListWrapper,
  CategoriesList,
  SearchInput,
  Toolbar,
  Wrapper,
  CategoryItemStyled
} from './comparative.styled';
import useImperativeIntl from '../../../hooks/useImperativeIntl';

const IDENTITY_FN = (v) => v;
const EMPTY_ARRAY = [];
const ORDER_TYPES = CategoryWidgetUI.ORDER_TYPES;
export const OTHERS_KEY = 'others';

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

/** Renders a `<ComparativeCategoryWidgetUI />` widget
 *
 * <!--
 * @param {Object} props
 * @param {string[]} props.names
 * @param {{ name: string; value: number }[][]} props.data
 * @param {string[]} [props.labels]
 * @param {string[]} [props.colors]
 * @param {number} [props.maxItems]
 * @param {CategoryWidgetUI.ORDER_TYPES} [props.order]
 * @param {boolean} [props.animation]
 * @param {{ duration?: number; animateOnMount?: boolean; }} [props.animationOptions]
 * @param {boolean} [props.searchable]
 * @param {boolean} [props.searchable]
 * @param {boolean} [props.filterable]
 * @param {string[]} [props.selectedCategories]
 * @param {(categories: string[]) => any} [props.onSelectedCategoriesChange]
 * @param {(v: any) => any} [props.formatter]
 * @param {boolean} [props.tooltip]
 * @param {(v: any) => any} [props.tooltipFormatter]
 * @param {boolean} [props.isLoading]
 * @param {string} [props.locale]
 * -->
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
  formatter = IDENTITY_FN,
  tooltip = true,
  tooltipFormatter = IDENTITY_FN,
  isLoading = false,
  locale = 'en'
}) {
  const theme = useTheme();
  const [searchActive, setSearchActive] = useState(false);
  const [blockingActive, setBlockingActive] = useState(false);
  const [tempSelection, setTempSelection] = useState(selectedCategories);
  const [searchValue, setSearchValue] = useState('');

  const intl = useImperativeIntl(locale);

  // process incoming data to group items by column, apply colors and labels
  const processedData = useMemo(() => {
    const _colors = colors?.length
      ? colors
      : [
          theme.palette.secondary.main,
          theme.palette.primary.main,
          theme.palette.info.main
        ];
    return transposeCategoryData(data, _colors, labels, selectedCategories, order);
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

  if (processedData.length === 0 || isLoading) {
    return <CategorySkeleton />;
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
    <Wrapper>
      {filterable ? (
        <Toolbar center={true}>
          <Typography variant='caption'>
            {selectedCategories.length > 0
              ? intl.formatMessage(
                  { id: 'c4r.widgets.category.selectedItems' },
                  { items: selectedCategories.length }
                )
              : intl.formatMessage({ id: 'c4r.widgets.category.all' })}
          </Typography>
          <Typography variant='caption'>
            {searchActive ? (
              <Link onClick={applyTempSelection}>
                {intl.formatMessage({ id: 'c4r.widgets.category.apply' })}
              </Link>
            ) : blockingActive ? (
              <Link onClick={disableBlocking}>
                {intl.formatMessage({ id: 'c4r.widgets.category.unlock' })}
              </Link>
            ) : selectedCategories.length ? (
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: theme.spacing(1)
                }}
              >
                <Link onClick={enableBlocking}>
                  {intl.formatMessage({ id: 'c4r.widgets.category.lock' })}
                </Link>
                <Divider orientation='vertical' flexItem />
                <Link onClick={clearSelection}>
                  {intl.formatMessage({ id: 'c4r.widgets.category.clear' })}
                </Link>
              </Box>
            ) : null}
          </Typography>
        </Toolbar>
      ) : null}
      {searchActive ? (
        <Toolbar>
          <SearchInput
            size='small'
            placeholder={intl.formatMessage({ id: 'c4r.widgets.category.search' })}
            onChange={(ev) => setSearchValue(ev.currentTarget.value)}
            onFocus={(ev) => ev.currentTarget.scrollIntoView()}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Toolbar>
      ) : null}
      <CategoriesList>
        {list.length === 0 ? (
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
        ) : null}
        {list.map((d) => (
          <CategoryItemStyled
            key={d.key}
            item={d}
            animation={animation}
            animationOptions={animationOptions}
            maxValue={maxValue}
            showCheckbox={filterable && searchActive}
            checkboxChecked={tempSelection.indexOf(d.key) !== -1}
            filterable={filterable}
            formatter={formatter}
            tooltipFormatter={tooltipFormatter}
            tooltip={tooltip}
            onClick={clickHandler}
            names={names}
          />
        ))}
      </CategoriesList>
      {showSearchToggle ? (
        <Button
          size='small'
          color='primary'
          startIcon={<SearchIcon />}
          onClick={enableSearchMode}
        >
          {intl.formatMessage(
            { id: 'c4r.widgets.category.searchInfo' },
            { elements: otherCount }
          )}
        </Button>
      ) : null}
      {searchActive ? (
        <Button size='small' color='primary' onClick={disableSearchMode}>
          {intl.formatMessage({ id: 'c4r.widgets.category.cancel' })}
        </Button>
      ) : null}
      <BulletListWrapper>
        {names.map((name, i) => (
          <BulletWrapper key={names[i]}>
            <Bullet color={colors?.[i] || theme.palette.background.default} />
            <Typography variant='overline'>{name}</Typography>
          </BulletWrapper>
        ))}
      </BulletListWrapper>
    </Wrapper>
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
  tooltip: true,
  onSelectedCategoriesChange: IDENTITY_FN,
  formatter: IDENTITY_FN,
  tooltipFormatter: IDENTITY_FN
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
  tooltip: PropTypes.bool,
  onSelectedCategoriesChange: PropTypes.func,
  formatter: PropTypes.func,
  tooltipFormatter: PropTypes.func,
  isLoading: PropTypes.bool,
  locale: PropTypes.string
};

export default ComparativeCategoryWidgetUI;
