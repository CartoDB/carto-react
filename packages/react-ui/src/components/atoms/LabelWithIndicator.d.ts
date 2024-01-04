export type LabelWithIndicatorProps = {
  label: React.ReactNode;
  type?: 'optional' | 'required';
  icon?: React.ReactNode;
  inheritSize?: boolean;
};

declare const LabelWithIndicator: (props: LabelWithIndicatorProps) => JSX.Element;
export default LabelWithIndicator;
