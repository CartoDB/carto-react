import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import MultipleSelectField from '../../../src/components/molecules/MultipleSelectField';
import { DocContainer, DocHighlight } from '../../utils/storyStyles';
import Typography from '../../../src/components/atoms/Typography';

const options = {
  title: 'Molecules/Multiple Select Field',
  component: MultipleSelectField,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['outlined', 'filled', 'standard']
      }
    },
    showFilters: {
      defaultValue: true,
      control: {
        type: 'boolean'
      }
    },
    showCounter: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    selectAllDisabled: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium']
      }
    },
    tooltipPlacement: {
      control: {
        type: 'select',
        options: ['top', 'right', 'bottom', 'left']
      }
    },
    required: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    disabled: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    error: {
      defaultValue: false,
      control: {
        type: 'boolean'
      }
    },
    label: {
      control: {
        type: 'text'
      }
    },
    placeholder: {
      control: {
        type: 'text'
      }
    }
  },
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/nmaoLeo69xBJCHm9nc6lEV/CARTO-Components-1.0?node-id=1534%3A29965'
    },
    status: {
      type: 'readyToReview'
    }
  }
};
export default options;

const PlaygroundTemplate = ({ ...rest }) => {
  const [selectedLayerNames, setLayerNames] = useState([]);

  const menuItems = [
    {
      label: 'table_openstreetmap',
      value: 'table_openstreetmap'
    },
    {
      label: 'Twenty',
      value: 'Twenty'
    },
    {
      label: 'Thirty',
      value: 'Thirty'
    },
    {
      label: 'Forty',
      value: 'Forty'
    },
    {
      label: 'Fifty',
      value: 'Fifty'
    }
  ];

  return (
    <IntlProvider locale='en'>
      <MultipleSelectField
        {...rest}
        options={menuItems}
        selectedOptions={selectedLayerNames}
        onChange={setLayerNames}
      />
    </IntlProvider>
  );
};

const DocTemplate = () => {
  return (
    <DocContainer severity='warning'>
      This component adds the <i>multiple selection</i> logic on top of SelectField
      component.
      <Typography mt={2}>
        So, instead of <i>{'<Select multiple />'}</i>, you should use this one:
        <DocHighlight component='span'>
          react-ui/src/components/molecules/MultipleSelectField
        </DocHighlight>
      </Typography>
      <Typography mt={2}>
        For external use:
        <DocHighlight component='span'>
          {'import { MultipleSelectField } from "@carto/react-ui";'}
        </DocHighlight>
        .
      </Typography>
    </DocContainer>
  );
};

const DisabledWithTooltipTemplate = ({ ...rest }) => {
  const [selectedLayerNames, setLayerNames] = useState([]);

  const menuItems = [
    {
      label: 'table_openstreetmapt',
      value: 'table_openstreetmapt'
    },
    {
      label: 'Twenty',
      value: 'Twenty'
    },
    {
      label: 'Thirty',
      value: 'Thirty',
      disabled: true,
      tooltip: 'This item is disabled'
    },
    {
      label: 'Forty',
      value: 'Forty'
    },
    {
      label: 'Fifty',
      value: 'Fifty'
    },
    {
      label: 'Sixty',
      value: 'Sixty',
      disabled: true,
      tooltip: 'This item is disabled'
    },
    {
      label: 'Seventy',
      value: 'Seventy'
    },
    {
      label: 'Eighty',
      value: 'Eighty'
    }
  ];

  return (
    <IntlProvider locale='en'>
      <MultipleSelectField
        {...rest}
        options={menuItems}
        selectedOptions={selectedLayerNames}
        onChange={setLayerNames}
      />
    </IntlProvider>
  );
};
const commonArgs = {
  label: 'Label text',
  placeholder: 'Placeholder text',
  helperText: 'Helper text.'
};

export const Playground = PlaygroundTemplate.bind({});
Playground.args = { ...commonArgs };

export const Guide = DocTemplate.bind({});

export const Counter = PlaygroundTemplate.bind({});
Counter.args = { ...commonArgs, showCounter: true };

export const selectAllDisabled = PlaygroundTemplate.bind({});
selectAllDisabled.args = { ...commonArgs, selectAllDisabled: true };

export const WithoutFilters = PlaygroundTemplate.bind({});
WithoutFilters.args = { ...commonArgs, showFilters: false };

export const ItemDisabledWithTooltip = DisabledWithTooltipTemplate.bind({});
ItemDisabledWithTooltip.args = { ...commonArgs };

export const TooltipPlacement = DisabledWithTooltipTemplate.bind({});
TooltipPlacement.args = { ...commonArgs, tooltipPlacement: 'bottom' };
