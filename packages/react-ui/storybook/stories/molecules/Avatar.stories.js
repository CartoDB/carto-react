import React from 'react';
import { Grid, useTheme } from '@mui/material';
import { Star } from '@mui/icons-material';
import { getCartoColorStylePropsForItem, Avatar } from '@carto/react-ui';
import {
  BoxContent,
  DocContainer,
  DocLink,
  DocHighlight,
  TitleContent
} from '../../utils/storyStyles';
import Typography from '../../../src/components/atoms/Typography';

const options = {
  title: 'Molecules/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['large', 'medium', 'small', 'xsmall']
      }
    },
    variant: {
      control: {
        type: 'select',
        options: ['circular', 'rounded', 'square']
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1925%3A30532&t=Y3JoU7theewbWKOW-0'
    },
    status: {
      type: 'validated'
    }
  }
};
export default options;

const Template = ({ ...args }) => {
  return <Avatar {...args} />;
};

const ShapeTemplate = ({ ...args }) => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <BoxContent>
          <TitleContent variant='body2'>{'Circular'}</TitleContent>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} />
            </Grid>
          </Grid>
        </BoxContent>
      </Grid>

      <Grid item>
        <BoxContent>
          <TitleContent variant='body2'>{'Square'}</TitleContent>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} variant='square' />
            </Grid>
          </Grid>
        </BoxContent>
      </Grid>

      <Grid item>
        <BoxContent>
          <TitleContent variant='body2'>{'Rounded'}</TitleContent>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} variant='rounded' />
            </Grid>
          </Grid>
        </BoxContent>
      </Grid>
    </Grid>
  );
};

const ContentTemplate = ({ ...args }) => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <BoxContent>
          <TitleContent variant='body2'>{'Default'}</TitleContent>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} />
            </Grid>
          </Grid>
        </BoxContent>
      </Grid>

      <Grid item>
        <BoxContent>
          <TitleContent variant='body2'>{'Image'}</TitleContent>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} src='/avatar.jpeg' />
            </Grid>
          </Grid>
        </BoxContent>
      </Grid>
      <Grid item>
        <BoxContent>
          <TitleContent variant='body2'>{'Initial'}</TitleContent>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args}>M</Avatar>
            </Grid>
          </Grid>
        </BoxContent>
      </Grid>
      <Grid item>
        <BoxContent>
          <TitleContent variant='body2'>{'Icon'}</TitleContent>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args}>
                <Star />
              </Avatar>
            </Grid>
          </Grid>
        </BoxContent>
      </Grid>
    </Grid>
  );
};

const ShapeSizeTemplate = ({ ...args }) => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <BoxContent>
          <TitleContent variant='body2'>{'Large'}</TitleContent>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} size='large' />
            </Grid>
            <Grid item>
              <Avatar {...args} variant='square' size='large' />
            </Grid>
            <Grid item>
              <Avatar {...args} variant='rounded' size='large' />
            </Grid>
          </Grid>
        </BoxContent>
      </Grid>

      <Grid item>
        <BoxContent>
          <TitleContent variant='body2'>{'Medium'}</TitleContent>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} />
            </Grid>
            <Grid item>
              <Avatar {...args} variant='square' />
            </Grid>
            <Grid item>
              <Avatar {...args} variant='rounded' />
            </Grid>
          </Grid>
        </BoxContent>
      </Grid>

      <Grid item>
        <BoxContent>
          <TitleContent variant='body2'>{'Small'}</TitleContent>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} size='small' />
            </Grid>
            <Grid item>
              <Avatar {...args} variant='square' size='small' />
            </Grid>
            <Grid item>
              <Avatar {...args} variant='rounded' size='small' />
            </Grid>
          </Grid>
        </BoxContent>
      </Grid>

      <Grid item>
        <BoxContent>
          <TitleContent variant='body2'>{'Extra Small'}</TitleContent>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} size='xsmall' />
            </Grid>
            <Grid item>
              <Avatar {...args} variant='square' size='xsmall' />
            </Grid>
            <Grid item>
              <Avatar {...args} variant='rounded' size='xsmall' />
            </Grid>
          </Grid>
        </BoxContent>
      </Grid>
    </Grid>
  );
};

const ContentSizeTemplate = ({ ...args }) => {
  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <BoxContent>
          <TitleContent variant='body2'>{'Large'}</TitleContent>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} size='large' />
            </Grid>
            <Grid item>
              <Avatar {...args} src='/avatar.jpeg' size='large' />
            </Grid>
            <Grid item>
              <Avatar {...args} size='large'>
                M
              </Avatar>
            </Grid>
            <Grid item>
              <Avatar {...args} size='large'>
                <Star />
              </Avatar>
            </Grid>
          </Grid>
        </BoxContent>
      </Grid>

      <Grid item>
        <BoxContent>
          <TitleContent variant='body2'>{'Medium'}</TitleContent>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} />
            </Grid>
            <Grid item>
              <Avatar {...args} src='/avatar.jpeg' />
            </Grid>
            <Grid item>
              <Avatar {...args}>M</Avatar>
            </Grid>
            <Grid item>
              <Avatar {...args}>
                <Star />
              </Avatar>
            </Grid>
          </Grid>
        </BoxContent>
      </Grid>

      <Grid item>
        <BoxContent>
          <TitleContent variant='body2'>{'Small'}</TitleContent>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} size='small' />
            </Grid>
            <Grid item>
              <Avatar {...args} src='/avatar.jpeg' size='small' />
            </Grid>
            <Grid item>
              <Avatar {...args} size='small'>
                M
              </Avatar>
            </Grid>
            <Grid item>
              <Avatar {...args} size='small'>
                <Star />
              </Avatar>
            </Grid>
          </Grid>
        </BoxContent>
      </Grid>

      <Grid item>
        <BoxContent>
          <TitleContent variant='body2'>{'Extra Small'}</TitleContent>
          <Grid container item spacing={6}>
            <Grid item>
              <Avatar {...args} size='xsmall' />
            </Grid>
            <Grid item>
              <Avatar {...args} src='/avatar.jpeg' size='xsmall' />
            </Grid>
            <Grid item>
              <Avatar {...args} size='xsmall'>
                M
              </Avatar>
            </Grid>
            <Grid item>
              <Avatar {...args} size='xsmall'>
                <Star />
              </Avatar>
            </Grid>
          </Grid>
        </BoxContent>
      </Grid>
    </Grid>
  );
};

const ColorBackgroundTemplate = ({ ...args }) => {
  const theme = useTheme();

  return (
    <>
      <DocContainer severity='warning'>
        We have a color function to automatically get the color for each item, it is
        <DocHighlight component='span'>getCartoColorStylePropsForItem</DocHighlight>. It
        uses <DocHighlight component='span'>qualitativeBold</DocHighlight> CARTO colors.
        <Typography mt={2}>Check the code to se an example of how to use it.</Typography>
      </DocContainer>
      <Grid container direction='column' spacing={3}>
        <Grid item>
          <BoxContent>
            <TitleContent variant='body2'>{'Carto qualitative bold'}</TitleContent>
            <Grid container item spacing={6}>
              {[...Array(15)].map((x, index) => (
                <Grid item key={index}>
                  <Avatar
                    {...args}
                    style={{
                      ...getCartoColorStylePropsForItem(theme, index)
                    }}
                  >{`${index + 1}`}</Avatar>
                </Grid>
              ))}
            </Grid>
          </BoxContent>
        </Grid>
      </Grid>
    </>
  );
};

const DocTemplate = () => {
  return (
    <DocContainer severity='warning'>
      We have our own
      <DocLink href='https://github.com/CartoDB/carto-react/blob/master/packages/react-ui/src/components/molecules/Avatar.js'>
        Avatar
      </DocLink>
      component that uses <i>Mui Avatar</i> and extends it with a new styling prop,
      <DocHighlight component='span'>size</DocHighlight>.
      <Typography mt={2}>
        This component normalize <i>size</i> and allow us to use only the 4 sizes defined
        by the design system:
        <DocHighlight component='span'>large, medium, small and xsmall</DocHighlight>
      </Typography>
      <Typography mt={2}>
        Import it from
        <DocHighlight component='span'>
          react-ui/src/components/molecules/Avatar
        </DocHighlight>
      </Typography>
      <Typography mt={2}>
        For external use:
        <DocHighlight component='span'>
          {'import { Avatar } from "@carto/react-ui";'}
        </DocHighlight>
        .
      </Typography>
    </DocContainer>
  );
};

const disabledVariantArgType = {
  variant: { table: { disable: true } }
};
const disabledSizeArgType = {
  size: { table: { disable: true } }
};

export const Playground = Template.bind({});

export const Guide = DocTemplate.bind({});

export const Shape = ShapeTemplate.bind({});
Shape.argTypes = disabledVariantArgType;

export const Content = ContentTemplate.bind({});

export const ShapeSizes = ShapeSizeTemplate.bind({});
ShapeSizes.argTypes = { ...disabledVariantArgType, ...disabledSizeArgType };

export const ContentSize = ContentSizeTemplate.bind({});
ContentSize.argTypes = disabledSizeArgType;

export const ColorBackground = ColorBackgroundTemplate.bind({});
