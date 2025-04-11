import React from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        First
      </button>

      {currentPage > 1 && (
        <button
          onClick={handlePrevious}
          className="pagination-button"
        >
          {currentPage - 1}
        </button>
      )}

      <button className="pagination-button pagination-button-current">
        {currentPage}
      </button>

      {currentPage < totalPages && (
        <button
          onClick={handleNext}
          className="pagination-button"
        >
          {currentPage + 1}
        </button>
      )}

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;