export type AccordionGroupProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'standard' | 'outlined';
  items: [
    {
      summary: string;
      content: React.ReactNode;
      disabled?: boolean;
      defaultExpanded?: boolean;
      onChange?: (event: React.SyntheticEvent, expanded: boolean) => void;
    }
  ];
};

declare const AccordionGroup: (props: AccordionGroupProps) => JSX.Element;
export default AccordionGroup;
