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
          'buttonLarge',
          'buttonSmall',
          'captionItalic',
          'captionStrong',
          'captionStrongItalic',
          'overlineDelicate',
          'codeLarge',
          'codeLargeStrong',
          'codeMediun',
          'codeMediunStrong',
          'codeSmall',
          'codeSmallStrong',
          'codeSmallChip',
          'charts'
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
export const Body1Italic = Template.bind({});
Body1Italic.args = { variant: 'body1Italic', text: 'Body 1 Italic' };

export const Body1Strong = Template.bind({});
Body1Strong.args = { variant: 'boy1Strong', text: 'Body 1 Strong' };

export const Body1StrongItalic = Template.bind({});
Body1StrongItalic.args = { variant: 'body1StrongItalic', text: 'Body 1 Strong Italic' };

export const Body2Italic = Template.bind({});
Body2Italic.args = { variant: 'body2Italic', text: 'Body 2 Italic' };

export const Body2Strong = Template.bind({});
Body2Strong.args = { variant: 'body2Strong', text: 'Body 2 Strong' };

export const Body2StrongItalic = Template.bind({});
Body2StrongItalic.args = { variant: 'body2StrongItalic', text: 'Body 2 Strong Italic' };

export const ButtonLarge = Template.bind({});
ButtonLarge.args = { variant: 'buttonLarge', text: 'Button Large' };

export const ButtonSmall = Template.bind({});
ButtonSmall.args = { variant: 'buttonSmall', text: 'Button Small' };

export const CaptionItalic = Template.bind({});
CaptionItalic.args = { variant: 'captionItalic', text: 'Caption Italic' };

export const CaptionStrong = Template.bind({});
CaptionStrong.args = { variant: 'captionStrong', text: 'Caption Strong' };

export const CaptionStrongItalic = Template.bind({});
CaptionStrongItalic.args = {
  variant: 'captionStrongItalic',
  text: 'Caption Strong Italic'
};

export const CodeLarge = Template.bind({});
CodeLarge.args = {
  variant: 'codeLarge',
  text: 'Code Large'
};

export const CodeLargeStrong = Template.bind({});
CodeLargeStrong.args = {
  variant: 'codeLargeStrong',
  text: 'Code Large Strong'
};

export const CodeMedium = Template.bind({});
CodeMedium.args = {
  variant: 'codeMedium',
  text: 'Code Medium'
};

export const CodeMediumStrong = Template.bind({});
CodeMediumStrong.args = {
  variant: 'codeMediumStrong',
  text: 'Code Medium Strong'
};

export const CodeSmall = Template.bind({});
CodeSmall.args = {
  variant: 'codeSmall',
  text: 'Code Small'
};

export const CodeSmallStrong = Template.bind({});
CodeSmallStrong.args = {
  variant: 'codeSmallStrong',
  text: 'Code Small Strong'
};

export const CodeSmallChip = Template.bind({});
CodeSmallChip.args = {
  variant: 'codeSmallChip',
  text: 'Code Small Chip'
};

export const Charts = Template.bind({});
Charts.args = { variant: 'charts', text: 'Charts' };
