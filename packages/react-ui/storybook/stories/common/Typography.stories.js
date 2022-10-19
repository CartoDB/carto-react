import React from 'react';
import Typography from '@material-ui/core/Typography';

const options = {
  title: 'CARTO Theme/Typography',
  component: Typography,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'subtitle1',
          'subtitle2',
          'body1',
          'body2',
          'button',
          'caption',
          'overline',
          'body1Italic',
          'body1Strong',
          'body1StrongItalic',
          'body2Italic',
          'body2Strong',
          'body2StrongItalic',
          'captionItalic',
          'captionStrong',
          'captionStrongItalic',
          'overlineDelicate',
          'code1',
          'code1Strong',
          'code2',
          'code2Strong',
          'code3',
          'code3Strong'
        ]
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/lVrTKiHj5zFUmCjjHF6Rc4/CARTO-Foundations?node-id=8776%3A64695'
    },
    viewMode: 'docs'
  }
};
export default options;

const Template = (args) => <Typography {...args}>{args.text}</Typography>;

export const H1 = Template.bind({});
H1.args = { variant: 'h1', text: 'H1 Headline' };

export const H2 = Template.bind({});
H2.args = { variant: 'h2', text: 'H2 Headline' };

export const H3 = Template.bind({});
H3.args = { variant: 'h3', text: 'H3 Headline' };

export const H4 = Template.bind({});
H4.args = { variant: 'h4', text: 'H4 Headline' };

export const H5 = Template.bind({});
H5.args = { variant: 'h5', text: 'H5 Headline' };

export const H6 = Template.bind({});
H6.args = { variant: 'h6', text: 'H6 Headline' };

export const Subtitle1 = Template.bind({});
Subtitle1.args = { variant: 'subtitle1', text: 'Subtitle 1' };

export const Subtitle2 = Template.bind({});
Subtitle2.args = { variant: 'subtitle2', text: 'Subtitle 2' };

export const Body1 = Template.bind({});
Body1.args = { variant: 'body1', text: 'Body 1' };

export const Body2 = Template.bind({});
Body2.args = { variant: 'body2', text: 'Body 2' };

export const Button = Template.bind({});
Button.args = { variant: 'button', text: 'Button' };

export const Caption = Template.bind({});
Caption.args = { variant: 'caption', text: 'Caption' };

export const Overline = Template.bind({});
Overline.args = { variant: 'overline', text: 'Overline' };

// Custom variants
// TODO: Do not export them until we do this task https://app.shortcut.com/cartoteam/story/265549/
const Body1Italic = Template.bind({});
Body1Italic.args = { variant: 'body1Italic', text: 'Body 1 Italic' };

const Body1Strong = Template.bind({});
Body1Strong.args = { variant: 'boy1Strong', text: 'Body 1 Strong' };

const Body1StrongItalic = Template.bind({});
Body1StrongItalic.args = { variant: 'body1StrongItalic', text: 'Body 1 Strong Italic' };

const Body2Italic = Template.bind({});
Body2Italic.args = { variant: 'body2Italic', text: 'Body 2 Italic' };

const Body2Strong = Template.bind({});
Body2Strong.args = { variant: 'body2Strong', text: 'Body 2 Strong' };

const Body2StrongItalic = Template.bind({});
Body2StrongItalic.args = { variant: 'body2StrongItalic', text: 'Body 2 Strong Italic' };

const CaptionItalic = Template.bind({});
CaptionItalic.args = { variant: 'captionItalic', text: 'Caption Italic' };

const CaptionStrong = Template.bind({});
CaptionStrong.args = { variant: 'captionStrong', text: 'Caption Strong' };

const CaptionStrongItalic = Template.bind({});
CaptionStrongItalic.args = {
  variant: 'captionStrongItalic',
  text: 'Caption Strong Italic'
};

const OverlineDelicate = Template.bind({});
OverlineDelicate.args = {
  variant: 'overlineDelicate',
  text: 'Overline Delicate'
};

const Code1 = Template.bind({});
Code1.args = {
  variant: 'code1',
  text: 'Code 1'
};

const Code1Strong = Template.bind({});
Code1Strong.args = {
  variant: 'code1Strong',
  text: 'Code 1 Strong'
};

const Code2 = Template.bind({});
Code2.args = {
  variant: 'code2',
  text: 'Code 2'
};

const Code2Strong = Template.bind({});
Code2Strong.args = {
  variant: 'code2Strong',
  text: 'Code 2 Strong'
};

const Code3 = Template.bind({});
Code3.args = {
  variant: 'code3',
  text: 'Code 3'
};

const Code3Strong = Template.bind({});
Code3Strong.args = {
  variant: 'code3Strong',
  text: 'Code 3 Strong'
};
