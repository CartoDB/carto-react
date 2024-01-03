export type LabelWithIndicatorProps = {
  label: React.ReactNode;
  type?: 'optional' | 'required';
  icon?: React.ReactNode;
};

declare const LabelWithIndicator: (props: LabelWithIndicatorProps) => JSX.Element;
export default LabelWithIndicator;
