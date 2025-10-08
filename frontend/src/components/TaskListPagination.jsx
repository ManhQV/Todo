import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

const TaskListPagination = ({
  handleNext,
  handlePrev,
  handlePageChange,
  page,
  totalPages,
}) => {
  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages < 4) {
      for (let i = 1; i <= totalPages; i++) {pages.push(i);}
    } else {
      if (page < 2) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (page >= totalPages - 1) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page, "...", totalPages);
      }
    }
    return pages;
  };

const pagesToShow = generatePageNumbers();

  const isPrevDisabled = page === 1;
  const isNextDisabled = page === totalPages;

  return (
    <div className="flex justify-center mt-4">
      <Pagination>
        <PaginationContent>
          {/* Trước */}
          <PaginationItem>
            <PaginationPrevious
              onClick={isPrevDisabled ? undefined : handlePrev}
              className={cn(
                "cursor-pointer",
                isPrevDisabled && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>

          {/* Các trang */}
   {pagesToShow.map((p, index) => (
  <PaginationItem key={index}>
    {p === "..." ? (
      <PaginationEllipsis />
    ) : (
      <PaginationLink
        isActive={p === page}
        onClick={() => {
          if (p !== page) handlePageChange(p);
        }}
        className="cursor-pointer"
      >
        {p}
      </PaginationLink>
    )}
  </PaginationItem>
))}


          {/* Sau */}
          <PaginationItem>
            <PaginationNext
              onClick={isNextDisabled ? undefined : handleNext}
              className={cn(
                "cursor-pointer",
                isNextDisabled && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TaskListPagination;
