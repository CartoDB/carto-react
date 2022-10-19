import React from 'react';
import { Box, Grid, InputAdornment, Slider, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import LayerOptionWrapper from './legend/LayerOptionWrapper';

const useOpacityControlStyles = makeStyles(({ spacing }) => ({
  content: {
    height: 'auto',
    flex: 1
  },
  slider: {
    marginTop: spacing(1)
  },
  input: {
    width: spacing(8),
    '& input': {
      '&[type=number]': {
        appearance: 'textfield'
      },
      '&::-webkit-outer-spin-button': {
        appearance: 'none',
        margin: 0
      },
      '&::-webkit-inner-spin-button': {
        appearance: 'none',
        margin: 0
      }
    }
  },
  noMargin: {
    margin: 0
  }
}));

export default function OpacityControl({ opacity, onChangeOpacity }) {
  const classes = useOpacityControlStyles();
  const handleTextFieldChange = (e) => {
    const newOpacity = parseInt(e.target.value || '0');
    onChangeOpacity(Math.max(0, Math.min(100, newOpacity)) / 100);
  };

  return (
    <LayerOptionWrapper label='Opacity'>
      <Box className={classes.content}>
        <Grid container spacing={2} direction='row' alignItems='center'>
          <Grid item xs>
            <Slider
              value={Math.round(opacity * 100)}
              min={0}
              max={100}
              step={1}
              onChange={(_, value) => onChangeOpacity(value / 100)}
              aria-labelledby='input-slider'
              className={classes.slider}
            />
          </Grid>
          <Grid item>
            <TextField
              className={classes.input}
              value={Math.round(opacity * 100)}
              margin='dense'
              onChange={handleTextFieldChange}
              InputProps={{
                step: 1,
                min: 0,
                max: 100,
                type: 'number',
                inputProps: { 'data-testid': 'opacity-slider' },
                'aria-labelledby': 'opacity-slider',
                endAdornment: (
                  <InputAdornment
                    classes={{ positionEnd: classes.noMargin }}
                    position='end'
                  >
                    %
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </LayerOptionWrapper>
  );
}
