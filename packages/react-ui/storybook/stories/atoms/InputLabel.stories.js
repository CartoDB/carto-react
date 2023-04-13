import React from 'react';
import {
  Box,
  CircularProgress,
  FormControl,
  InputBase,
  InputLabel,
  OutlinedInput,
  Paper,
  SvgIcon,
  styled
} from '@mui/material';
import LabelWithIndicator from '../../../src/components/atoms/LabelWithIndicator';
import Typography from '../../../src/components/atoms/Typography';

const StyledPaper = styled(Paper)(({ theme: { spacing } }) => ({
  height: spacing(4.5),
  width: spacing(30),
  paddingLeft: spacing(1.5),
  borderRadius: spacing(0.5),
  display: 'flex',
  alignItems: 'center'
}));

const IconWrapper = styled('div')(({ theme: { palette, typography } }) => ({
  display: 'flex',

  '& svg': {
    fill: palette.text.secondary
  }
}));

const InputSearch = styled(InputBase)(({ theme: { typography, spacing } }) => ({
  //...typography.body2,
  width: `calc(100% - ${spacing(5)})`,
  marginLeft: spacing(1)
}));

const SearchIcon = (args) => (
  <SvgIcon {...args} color='textSecondary'>
    <path
      d='M11,4 C14.8659932,4 18,7.13400675 18,11 C18,12.7003211 17.3937669,14.2590489 16.3856562,15.4718279 L19.4748737,18.5606602 L18.0606602,19.9748737 L14.8998887,16.8138615 C13.7854137,17.5629194 12.4437497,18 11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 Z M11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 Z'
      fill='inherit'
    ></path>
  </SvgIcon>
);

const options = {
  title: 'Atoms/Input Label',
  component: InputLabel,
  argTypes: {
    disabled: {
      control: {
        type: 'boolean'
      }
    },
    error: {
      control: {
        type: 'boolean'
      }
    },
    label: {
      control: {
        type: 'text'
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/C4R-Components?node-id=1534-33807&t=dVNCJzz6IduwAMHg-0'
    },
    status: {
      type: 'validated'
    }
  }
};
export default options;

const Template = ({ label, ...args }) => {
  return <InputLabel {...args}>{label}</InputLabel>;
};

const CompositionTemplate = ({ label, ...args }) => {
  return (
    <>
      <Box mb={15}>
        <Typography variant='subtitle1' mb={4}>
          {'Geocoder widget UI'}
        </Typography>
        <StyledPaper elevation={2}>
          <IconWrapper>
            {false ? <CircularProgress size={18} /> : <SearchIcon />}
          </IconWrapper>

          <InputSearch
            type='search'
            tabIndex={-1}
            size='small'
            placeholder='Search address'
            inputProps={{ 'aria-label': 'GeocoderSearch' }}
          />
        </StyledPaper>
      </Box>
      <FormControl {...args} size='small'>
        <InputLabel>{label}</InputLabel>
        <OutlinedInput placeholder='Input text' />
      </FormControl>
    </>
  );
};

const RequiredTemplate = ({ label, ...args }) => {
  return (
    <>
      <Typography variant='body2' mb={4}>
        {'Use <LabelWithIndicator /> component inside the Label'}
      </Typography>

      <Typography variant='body1' mb={2}>
        {'Required'}
      </Typography>

      <FormControl {...args} size='small'>
        <InputLabel>
          <LabelWithIndicator label={label} type='required' />
        </InputLabel>
        <OutlinedInput placeholder='Input text' />
      </FormControl>

      <Typography variant='body1' mt={4} mb={2}>
        {'Optional'}
      </Typography>

      <FormControl {...args} size='small'>
        <InputLabel>
          <LabelWithIndicator label={label} />
        </InputLabel>
        <OutlinedInput placeholder='Input text' />
      </FormControl>
    </>
  );
};

const commonArgs = {
  label: 'Label text'
};

export const Playground = Template.bind({});
Playground.args = { ...commonArgs };

export const Composition = CompositionTemplate.bind({});
Composition.args = { ...commonArgs };

export const Required = RequiredTemplate.bind({});
Required.args = { ...commonArgs };
