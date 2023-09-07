import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Box, styled, IconButton, useTheme } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import Typography from '../../../components/atoms/Typography';

const Legend = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(2, 0.5, 2, 0.5),
  width: '100%'
}));

const ItemsContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  overflowX: 'hidden',
  gap: theme.spacing(2)
}));

const Item = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(1),
  alignItems: 'center',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  cursor: 'pointer'
}));

const OverflowVeil = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  position: 'absolute',
  left: theme.spacing(-2),
  top: theme.spacing(1),
  bottom: theme.spacing(1),
  zIndex: 10,
  width: theme.spacing(2.5),
  background: `linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)`
}));

const ShowMoreButtons = styled(Box)(({ theme }) => ({
  position: 'absolute',
  padding: theme.spacing(0.5, 1),
  top: theme.spacing(0.5),
  right: 0,
  background: theme.palette.background.paper
}));

const Circle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color'
})(({ theme, color }) => {
  const size = theme.spacing(1);
  return {
    backgroundColor: color,
    borderRadius: '50%',
    width: size,
    height: size
  };
});

export default function TimeSeriesLegend({
  series,
  selectedCategories,
  onCategoryClick
}) {
  const theme = useTheme();
  const [overflowing, setOverflowing] = useState(false);
  const [offset, setOffset] = useState(0);
  const [maxWidth, setMaxWidth] = useState(undefined);
  const legendRef = useRef(null);
  const containerRef = useRef(null);
  const showMoreButtonsRef = useRef(null);

  const handleClickRight = () => {
    setOffset(offset + 1);
  };

  const handleClickLeft = () => {
    setOffset(Math.max(offset - 1));
  };

  const updateMaxWidth = useCallback(() => {
    const overflowing =
      containerRef.current &&
      containerRef.current.scrollWidth > containerRef.current.clientWidth;

    setOverflowing(overflowing);
    setMaxWidth(
      overflowing && containerRef.current
        ? legendRef.current.clientWidth - (showMoreButtonsRef.current?.clientWidth || 70)
        : legendRef.current?.clientWidth - 12 || 500
    );
  }, [legendRef, containerRef, showMoreButtonsRef]);

  useEffect(() => {
    updateMaxWidth();
  }, [
    containerRef,
    containerRef.current?.scrollWidth,
    containerRef.current?.clientWidth,
    updateMaxWidth,
    offset
  ]);

  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    let observer;
    if (legendRef.current) {
      observer = new ResizeObserver(() => {
        updateMaxWidth();
      });
      observer.observe(legendRef.current);
    }
    return () => {
      observer?.disconnect();
    };
  }, [legendRef, updateMaxWidth]);

  return (
    <Legend ref={legendRef}>
      <ItemsContainer ref={containerRef} style={{ maxWidth: `${maxWidth}px` }}>
        {series.map(({ category, color }, i) => {
          if (i < offset) return null;

          const selected =
            selectedCategories.length === 0 || selectedCategories.includes(category);
          return (
            <Item key={i} onClick={() => onCategoryClick(category)}>
              <Circle color={selected ? color : theme.palette.text.disabled} />
              <Typography
                variant='overline'
                color={selected ? undefined : 'text.disabled'}
              >
                {category}
              </Typography>
            </Item>
          );
        })}
      </ItemsContainer>
      {(overflowing || offset > 0) && (
        <ShowMoreButtons ref={showMoreButtonsRef}>
          <OverflowVeil />
          <IconButton size='small' disabled={offset === 0} onClick={handleClickLeft}>
            <ChevronLeft />
          </IconButton>
          <IconButton size='small' disabled={!overflowing} onClick={handleClickRight}>
            <ChevronRight />
          </IconButton>
        </ShowMoreButtons>
      )}
    </Legend>
  );
}
