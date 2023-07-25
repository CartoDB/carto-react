import { Box, Grid, Tooltip } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import React, { useRef } from 'react';
import Typography from '../../../src/components/atoms/Typography';
import { DocContainer } from '../../utils/storyStyles';

const options = {
  title: 'Foundations/Palette',
  component: Box,
  argTypes: {
    colorVariant: {
      control: {
        type: 'select',
        options: [
          'primary',
          'secondary',
          'info',
          'success',
          'warning',
          'error',
          'default'
        ]
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lVrTKiHj5zFUmCjjHF6Rc4/CARTO-Foundations?node-id=8775%3A71615'
    },
    status: {
      type: 'validated'
    }
  }
};
export default options;

const Container = styled(Grid)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: theme.spacing(1)
}));

const TextColor = styled(Typography)(({ theme }) => ({
  display: 'block',
  maxWidth: theme.spacing(18)
}));

function decamelCase(s) {
  return s.replaceAll(/([a-z])([A-Z])/g, (x, p1, p2) => `${p1} ${p2}`);
}

function capitalize(s) {
  return s
    ? String(s).substring(0, 1).toUpperCase() + decamelCase(String(s).substring(1))
    : '';
}

function figmaColorName(v, n) {
  return ['Light', capitalize(v), capitalize(n)].filter(Boolean).join('/');
}

function jsColorSelector(v, n) {
  return `theme.palette.${v}${
    typeof n === 'number' || String(n).match(/^[0-9]/)
      ? `[${n}]`
      : typeof n === 'string'
      ? `.${n}`
      : ''
  }`;
}

const Bullet = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color'
})(({ theme, color: background }) => ({
  height: 48,
  width: '100%',
  border: `1px solid ${theme.palette.grey[100]}`,
  borderRadius: theme.spacing(0.5),
  background
}));

const ColorBox = ({ colorVariant, colorName }) => {
  const theme = useTheme();
  const color = theme.palette[colorVariant];
  const colorValue = colorName ? color[colorName] : color;
  const textRef = useRef();

  return (
    <Box mb={3}>
      <Box mt={0.5}>
        <Typography variant='subtitle1'>{colorName}</Typography>
        <Tooltip title={colorValue} enterDelay={600}>
          <TextColor variant='caption' noWrap ref={textRef}>
            {colorValue}
          </TextColor>
        </Tooltip>
      </Box>
      <Bullet color={colorValue} />
      <Typography variant='caption'>
        {figmaColorName(colorVariant, colorName)}
        <pre style={{ margin: 0 }}>{jsColorSelector(colorVariant, colorName)}</pre>
      </Typography>
    </Box>
  );
};

const ColorTemplate = ({ colorVariant }) => {
  const theme = useTheme();
  const colorDef = theme.palette[colorVariant];

  return (
    <Container container>
      <ColorBox colorVariant={colorVariant} colorName={'main'} />
      <ColorBox colorVariant={colorVariant} colorName={'dark'} />
      <ColorBox colorVariant={colorVariant} colorName={'light'} />
      {colorDef.contrastText && (
        <ColorBox colorVariant={colorVariant} colorName={'contrastText'} />
      )}
      {colorDef.background && (
        <ColorBox colorVariant={colorVariant} colorName={'background'} />
      )}
      {colorDef.relatedDark && (
        <ColorBox colorVariant={colorVariant} colorName={'relatedDark'} />
      )}
      {colorDef.relatedLight && (
        <ColorBox colorVariant={colorVariant} colorName={'relatedLight'} />
      )}
      {colorDef.outlinedBorder && (
        <ColorBox colorVariant={colorVariant} colorName={'outlinedBorder'} />
      )}
    </Container>
  );
};

const TextTemplate = () => {
  return (
    <Container container>
      <ColorBox colorVariant={'text'} colorName={'primary'} />
      <ColorBox colorVariant={'text'} colorName={'secondary'} />
      <ColorBox colorVariant={'text'} colorName={'disabled'} />
      <ColorBox colorVariant={'text'} colorName={'hint'} />
    </Container>
  );
};

const CommonTemplate = () => {
  return (
    <Container container>
      <ColorBox colorVariant={'common'} colorName={'black'} />
      <ColorBox colorVariant={'common'} colorName={'white'} />
    </Container>
  );
};

const BackgroundTemplate = () => {
  return (
    <Container container>
      <ColorBox colorVariant={'background'} colorName={'paper'} />
      <ColorBox colorVariant={'background'} colorName={'default'} />
    </Container>
  );
};

const ActionTemplate = () => {
  return (
    <Container container>
      <ColorBox colorVariant={'action'} colorName={'active'} />
      <ColorBox colorVariant={'action'} colorName={'hover'} />
      <ColorBox colorVariant={'action'} colorName={'disabledBackground'} />
      <ColorBox colorVariant={'action'} colorName={'disabled'} />
      <ColorBox colorVariant={'action'} colorName={'selected'} />
      <ColorBox colorVariant={'action'} colorName={'focus'} />
    </Container>
  );
};

const GreyTemplate = () => {
  return (
    <Container container>
      <ColorBox colorVariant={'grey'} colorName={'900'} />
      <ColorBox colorVariant={'grey'} colorName={'800'} />
      <ColorBox colorVariant={'grey'} colorName={'700'} />
      <ColorBox colorVariant={'grey'} colorName={'600'} />
      <ColorBox colorVariant={'grey'} colorName={'500'} />
      <ColorBox colorVariant={'grey'} colorName={'400'} />
      <ColorBox colorVariant={'grey'} colorName={'300'} />
      <ColorBox colorVariant={'grey'} colorName={'200'} />
      <ColorBox colorVariant={'grey'} colorName={'100'} />
      <ColorBox colorVariant={'grey'} colorName={'50'} />
      <ColorBox colorVariant={'grey'} colorName={'A100'} />
      <ColorBox colorVariant={'grey'} colorName={'A200'} />
      <ColorBox colorVariant={'grey'} colorName={'A400'} />
      <ColorBox colorVariant={'grey'} colorName={'A700'} />
    </Container>
  );
};

const ShadesTemplate = () => {
  return (
    <>
      <DocContainer severity='info'>{'Common alpha colors'}</DocContainer>

      <Typography variant='h6'>{'Black'}</Typography>
      <Container container>
        <ColorBox colorVariant={'black'} colorName={90} />
        <ColorBox colorVariant={'black'} colorName={60} />
        <ColorBox colorVariant={'black'} colorName={40} />
        <ColorBox colorVariant={'black'} colorName={25} />
        <ColorBox colorVariant={'black'} colorName={12} />
        <ColorBox colorVariant={'black'} colorName={8} />
        <ColorBox colorVariant={'black'} colorName={4} />
      </Container>

      <Typography variant='h6'>{'White'}</Typography>
      <Container container>
        <ColorBox colorVariant={'white'} colorName={90} />
        <ColorBox colorVariant={'white'} colorName={60} />
        <ColorBox colorVariant={'white'} colorName={40} />
        <ColorBox colorVariant={'white'} colorName={25} />
        <ColorBox colorVariant={'white'} colorName={12} />
        <ColorBox colorVariant={'white'} colorName={8} />
        <ColorBox colorVariant={'white'} colorName={4} />
      </Container>
    </>
  );
};

const BrandTemplate = () => {
  return (
    <Container container>
      <ColorBox colorVariant={'brand'} colorName={'navyBlue'} />
      <ColorBox colorVariant={'brand'} colorName={'locationRed'} />
      <ColorBox colorVariant={'brand'} colorName={'predictionBlue'} />
      <ColorBox colorVariant={'brand'} colorName={'softBlue'} />
    </Container>
  );
};

const DividerTemplate = () => {
  return (
    <Container container>
      <ColorBox colorVariant={'divider'} />
    </Container>
  );
};

export const Playground = ColorTemplate.bind({});
Playground.args = { colorVariant: 'primary' };

export const Common = CommonTemplate.bind({});

export const Primary = ColorTemplate.bind({});
Primary.args = { colorVariant: 'primary' };

export const Secondary = ColorTemplate.bind({});
Secondary.args = { colorVariant: 'secondary' };

export const Error = ColorTemplate.bind({});
Error.args = { colorVariant: 'error' };

export const Warning = ColorTemplate.bind({});
Warning.args = { colorVariant: 'warning' };

export const Info = ColorTemplate.bind({});
Info.args = { colorVariant: 'info' };

export const Success = ColorTemplate.bind({});
Success.args = { colorVariant: 'success' };

export const Grey = GreyTemplate.bind({});

export const Text = TextTemplate.bind({});

export const Background = BackgroundTemplate.bind({});

export const Action = ActionTemplate.bind({});

export const Divider = DividerTemplate.bind({});

export const Default = ColorTemplate.bind({});
Default.args = { colorVariant: 'default' };

export const Brand = BrandTemplate.bind({});

export const Shades = ShadesTemplate.bind({});
