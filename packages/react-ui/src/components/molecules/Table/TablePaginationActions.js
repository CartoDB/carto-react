import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Tooltip, styled } from '@mui/material';
import {
  KeyboardArrowLeftOutlined,
  KeyboardArrowRightOutlined
} from '@mui/icons-material';

const Root = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
  marginLeft: theme.spacing(1)
}));

const Button = styled('div')(({ theme }) => ({
  '& .MuiIconButton-root:not(.Mui-disabled)': {
    color: theme.palette.text.secondary
  }
}));

const TablePaginationActions = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  lastPageTooltip
}) => {
  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };
  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const isLastPage = page === Math.ceil(count / rowsPerPage) - 1;
  const isFirstPage = page === 0;

  const noMorePagesText = 'No more pages';

  return (
    <Root>
      {/* Note: don't remove the inner <Button /> wrapper, it's needed for the tooltip to work on disabled elements:
        https://mui.com/material-ui/react-tooltip/#disabled-elements */}
      <Tooltip title={isFirstPage ? noMorePagesText : 'Previous page'}>
        <Button>
          <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            aria-label='previous page'
          >
            <KeyboardArrowLeftOutlined />
          </IconButton>
        </Button>
      </Tooltip>
      <Tooltip title={isLastPage ? lastPageTooltip || noMorePagesText : 'Next page'}>
        <Button>
          <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label='next page'
          >
            <KeyboardArrowRightOutlined />
          </IconButton>
        </Button>
      </Tooltip>
    </Root>
  );
};

TablePaginationActions.defaultProps = {
  rowsPerPage: 10
};
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  lastPageTooltip: PropTypes.string
};

export default TablePaginationActions;
