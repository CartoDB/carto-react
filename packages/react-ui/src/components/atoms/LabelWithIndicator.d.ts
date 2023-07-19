export type LabelWithIndicatorProps = {
  label: React.ReactNode;
  type?: 'optional' | 'required';
};

declare const LabelWithIndicator: (props: LabelWithIndicatorProps) => JSX.Element;
export default LabelWithIndicator;
