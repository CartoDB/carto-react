import React from 'react';
import { Box, Grid, InputAdornment, Slider, TextField, styled } from '@mui/material';
import LayerOptionWrapper from './legend/LayerOptionWrapper';

const Content = styled(Box)(() => ({
  height: 'auto',
  flex: 1
}));

const Input = styled(TextField)(({ theme }) => ({
  width: theme.spacing(8),
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
}));

const InputUnit = styled(InputAdornment)(({ theme }) => ({
  '& 	.MuiInputAdornment-positionEnd': {
    margin: 0
  }
}));

export default function OpacityControl({ opacity, onChangeOpacity }) {
  const handleTextFieldChange = (e) => {
    const newOpacity = parseInt(e.target.value || '0');
    onChangeOpacity(Math.max(0, Math.min(100, newOpacity)) / 100);
  };

  return (
    <LayerOptionWrapper label='Opacity'>
      <Content>
        <Grid container spacing={2} direction='row' alignItems='center'>
          <Grid item xs>
            <Slider
              value={Math.round(opacity * 100)}
              min={0}
              max={100}
              step={1}
              xs
              mt={1}
              onChange={(_, value) => onChangeOpacity(value / 100)}
              aria-labelledby='input-slider'
            />
          </Grid>
          <Grid item>
            <Input
              value={Math.round(opacity * 100)}
              size='small'
              onChange={handleTextFieldChange}
              InputProps={{
                step: 1,
                min: 0,
                max: 100,
                type: 'number',
                inputProps: { 'data-testid': 'opacity-slider' },
                'aria-labelledby': 'opacity-slider',
                endAdornment: <InputUnit position='end'> %</InputUnit>
              }}
            />
          </Grid>
        </Grid>
      </Content>
    </LayerOptionWrapper>
  );
}
