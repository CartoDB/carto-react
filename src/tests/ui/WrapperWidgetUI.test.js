import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { WrapperWidgetUI, FormulaWidgetUI } from 'src/ui';

describe('WrapperWidgetUI', () => {
  test('should has a title', () => {
    render(<WrapperWidgetUI title='test' />);
    expect(screen.getByText(/test/)).toBeInTheDocument();
  });

  describe('events', () => {
    const TITLE = 'test';
    const WrappedWithFormulaWidget = () => (
      <WrapperWidgetUI title={TITLE}>
        <FormulaWidgetUI data='1234' />
      </WrapperWidgetUI>
    );

    test('should be open by default', async () => {
      render(<WrappedWithFormulaWidget />);
      expect(await screen.findByText('1234')).toBeInTheDocument();
    });

    test('should close', async () => {
      render(<WrappedWithFormulaWidget />);
      fireEvent.click(screen.getByText(TITLE));
      expect(await screen.findByText('1234')).not.toBeVisible();
    });
  });
});
