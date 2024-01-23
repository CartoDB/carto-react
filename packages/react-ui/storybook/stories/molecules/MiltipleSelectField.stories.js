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

  const layerNames = selectedLayerNames || [];

  const menuItems = [
    {
      label: 'table_openstreetmap_pointsofinterest',
      value: 'table_openstreetmap_pointsofinterest'
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
        selectedOptions={layerNames}
        onChange={setLayerNames}
        value={layerNames}
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

  const layerNames = selectedLayerNames || [];

  const menuItems = [
    {
      label: 'table_openstreetmap_pointsofinterest',
      value: '10Long'
    },
    {
      label: 'Twenty',
      value: '20'
    },
    {
      label: 'Thirty',
      value: '30',

      disabled: true,
      tooltip: 'This item is disabled'
    },
    {
      label: 'Forty',
      value: '40'
    },
    {
      label: 'Fifty',
      value: '50'
    }
  ];

  return (
    <IntlProvider locale='en'>
      <MultipleSelectField
        {...rest}
        options={menuItems}
        selectedOptions={layerNames}
        onChange={setLayerNames}
        value={layerNames}
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
