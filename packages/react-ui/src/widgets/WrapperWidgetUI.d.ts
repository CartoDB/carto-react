import { BoxProps, TooltipProps } from '@mui/material';
import { ReactNode } from 'react';

export type WrapperWidgetAction = {
  id: string;

  icon: ReactNode;

  action: () => void;

  /// Aria label of action
  label?: string;

  // Optional tooltip
  tooltip?: { text: string; placement?: TooltipProps['placement'] };
};

export type WrapperWidgetOption = {
  id: string;

  // Displayed label of action
  name: string;
  selected?: boolean;
  action: () => void;
};

export type WrapperWidgetUIProps = {
  title: string;

  expandable?: boolean;
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;

  isLoading?: boolean;
  disabled?: boolean;

  actions?: WrapperWidgetAction[];
  options?: WrapperWidgetOption[];

  /** Override defaulr margin (CSS margin value). */
  margin?: number | string;

  /** Optional footer added inside content box after widget itself.  */
  footer?: ReactNode;

  /** Extra props to Box that wraps content ontent of widget (widget itself and footer))  */
  contentProps?: BoxProps;

  children?: ReactNode;
};

declare const WrapperWidgetUI: (props: WrapperWidgetUIProps) => JSX.Element;
export default WrapperWidgetUI;
