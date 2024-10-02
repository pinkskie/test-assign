import { useState } from "react";

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  isCyclic: boolean;
}

export const usePagination = ({
  totalItems,
  itemsPerPage,
  isCyclic,
}: UsePaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const goToNextPage = () => {
    setCurrentPage((prevPage) =>
      isCyclic && prevPage === totalPages
        ? 1
        : Math.min(prevPage + 1, totalPages)
    );
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) =>
      isCyclic && prevPage === 1 ? totalPages : Math.max(prevPage - 1, 1)
    );
  };

  const goToNextThreePages = () => {
    setCurrentPage((prevPage) =>
      isCyclic
        ? ((prevPage + 3 - 1) % totalPages) + 1
        : Math.min(prevPage + 3, totalPages)
    );
  };

  const goToPrevThreePages = () => {
    setCurrentPage((prevPage) =>
      isCyclic
        ? ((prevPage - 3 + totalPages - 1) % totalPages) + 1
        : Math.max(prevPage - 3, 1)
    );
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    totalPages,
    setCurrentPage,
    goToNextPage,
    goToPrevPage,
    goToPage,
    goToNextThreePages,
    goToPrevThreePages,
  };
};
