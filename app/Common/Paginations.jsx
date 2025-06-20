import React from 'react';
import { Box, Button } from '@mui/material';



const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
      <Button
        variant="contained"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        sx={{ marginRight: 2 }}
      >
        Previous
      </Button>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <span>Page {currentPage} of {totalPages}</span>
      </Box>

      <Button
        variant="contained"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        sx={{ marginLeft: 2 }}
      >
        Next
      </Button>
    </Box>
  );
};

export default Pagination;
