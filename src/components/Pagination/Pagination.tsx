import React from "react";
import "./Pagination.scss";

import { chevronDoubleLeft } from "../../assets/chevron-double-left";
import { chevronLeft } from "../../assets/chevron-left";
import { chevronRight } from "../../assets/chevron-right";
import { chevronDoubleRight } from "../../assets/chevron-double-right";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  offInfinityPagination: boolean;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToPage: (page: number) => void;
  goToNextThreePages: () => void;
  goToPrevThreePages: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  offInfinityPagination,
  goToNextPage,
  goToPrevPage,
  goToPage,
  goToNextThreePages,
  goToPrevThreePages,
}) => {
  const prevPage =
    currentPage > 1
      ? currentPage - 1
      : offInfinityPagination
      ? null
      : totalPages;
  const nextPage =
    currentPage < totalPages
      ? currentPage + 1
      : offInfinityPagination
      ? null
      : 1;

  return (
    <div className="pagination">
      <button
        onClick={goToPrevThreePages}
        disabled={offInfinityPagination && currentPage <= 3}
      >
        {chevronDoubleLeft()}
      </button>

      <button
        onClick={goToPrevPage}
        disabled={offInfinityPagination && currentPage === 1}
      >
        {chevronLeft()}
      </button>

      {prevPage && (
        <button onClick={() => goToPage(prevPage)}>{prevPage}</button>
      )}

      <button className="active">{currentPage}</button>

      {nextPage && (
        <button onClick={() => goToPage(nextPage)}>{nextPage}</button>
      )}

      <button
        onClick={goToNextPage}
        disabled={offInfinityPagination && currentPage === totalPages}
      >
        {chevronRight()}
      </button>

      <button
        onClick={goToNextThreePages}
        disabled={offInfinityPagination && currentPage >= totalPages - 2}
      >
        {chevronDoubleRight()}
      </button>
    </div>
  );
};

export default Pagination;
