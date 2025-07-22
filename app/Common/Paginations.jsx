import React from "react";

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center items-center mt-4 space-x-4">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded text-white bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed`}
      >
        Previous
      </button>

      <span className="text-sm text-primary">
        Page <span className="font-semibold">{currentPage}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </span>

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded text-white bg-primary hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
