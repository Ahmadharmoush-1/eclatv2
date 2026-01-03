import { useState, useMemo, useCallback } from 'react';

interface UsePaginationOptions<T> {
  items: T[];
  itemsPerPage?: number;
}

interface UsePaginationResult<T> {
  currentItems: T[];
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  loadMore: () => void;
  reset: () => void;
  isFirstPage: boolean;
  isLastPage: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export function usePagination<T>({
  items,
  itemsPerPage = 8,
}: UsePaginationOptions<T>): UsePaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = useMemo(() => {
    return items.slice(0, currentPage * itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const hasMore = currentPage < totalPages;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= totalPages;

  const loadMore = useCallback(() => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [hasMore]);

  const reset = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  const nextPage = useCallback(() => {
    if (!isLastPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [isLastPage]);

  const prevPage = useCallback(() => {
    if (!isFirstPage) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [isFirstPage]);

  return {
    currentItems,
    currentPage,
    totalPages,
    hasMore,
    loadMore,
    reset,
    isFirstPage,
    isLastPage,
    goToPage,
    nextPage,
    prevPage,
  };
}
