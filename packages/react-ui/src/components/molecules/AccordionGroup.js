import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ExpandMoreOutlined } from '@mui/icons-material';

const AccordionContainer = styled('div', {
  shouldForwardProp: (prop) => prop !== 'variant'
})(({ variant, theme }) => ({
  width: '100%',
  border: '1px solid transparent',
  borderRadius: theme.spacing(0.5),

  ...(variant === 'outlined' && {
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.divider
  })
}));

const AccordionGroup = ({ variant, items, ...otherProps }) => {
  return (
    <AccordionContainer {...otherProps} variant={variant}>
      {items.map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreOutlined />}
            aria-controls={`${index}-content`}
            id={`${index}-header`}
          >
            {item.summary}
          </AccordionSummary>
          <AccordionDetails>{item.content}</AccordionDetails>
        </Accordion>
      ))}
    </AccordionContainer>
  );
};

AccordionGroup.defaultProps = {
  variant: 'standard'
};
AccordionGroup.propTypes = {
  variant: PropTypes.oneOf(['standard' | 'outlined']),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      summary: PropTypes.string.isRequired,
      content: PropTypes.element.isRequired
    })
  ).isRequired
};

export default AccordionGroup;
