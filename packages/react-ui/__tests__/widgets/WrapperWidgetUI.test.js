import React from 'react';
import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react';
import WrapperWidgetUI from '../../src/widgets/WrapperWidgetUI';
import FormulaWidgetUI from '../../src/widgets/FormulaWidgetUI';

describe('WrapperWidgetUI', () => {
  const TITLE = 'test';

  test('should has a title', () => {
    render(<WrapperWidgetUI title={TITLE} />);
    expect(screen.getByText(/test/)).toBeInTheDocument();
  });

  describe('events', () => {
    const FORMULA_DATA = '1234';
    const WrappedWithFormulaWidget = ({ numberOfChilds = 1 }) => (
      <WrapperWidgetUI title={TITLE}>
        {[...Array(numberOfChilds)].map((_, idx) => (
          <FormulaWidgetUI key={idx} data={FORMULA_DATA} />
        ))}
      </WrapperWidgetUI>
    );

    describe('open state', () => {
      test('should be open by default', () => {
        render(<WrappedWithFormulaWidget />);
        expect(screen.getByText(FORMULA_DATA)).toBeInTheDocument();
      });

      test('should close', async () => {
        render(<WrappedWithFormulaWidget />);
        fireEvent.click(screen.getByText(TITLE));
        // Because animation timeout (prop) is set to 'auto' in WrapperWidgetUI => Collapse component
        // According to Material-UI, 'auto' timeout is equal to 300ms https://github.com/mui-org/material-ui/blob/5aba9087c28736579153e99c09d4895951ca0c33/packages/material-ui/src/styles/transitions.js#L22
        await waitForElementToBeRemoved(() => screen.queryByText(FORMULA_DATA));
      });

      test('should open', async () => {
        render(<WrappedWithFormulaWidget />);

        fireEvent.click(screen.getByText(TITLE));
        fireEvent.click(screen.getByText(TITLE));

        expect(await screen.findByText(FORMULA_DATA)).toBeInTheDocument();
      });
    });

    describe('with options', () => {
      const NUMBER_OF_OPTIONS = 3;
      const OPTIONS = [...Array(NUMBER_OF_OPTIONS)].map((_, idx) => ({
        id: idx + 1,
        name: `option ${idx + 1}`,
        action: null
      }));

      test('multiple', () => {
        render(
          <WrappedWithFormulaWidget
            options={OPTIONS}
            numberOfChilds={NUMBER_OF_OPTIONS}
          />
        );

        expect(screen.getAllByText(FORMULA_DATA).length).toBe(3);
      });
    });
  });
});
