import React from "react";

const Pagination = ({ numPages, currentPage, setCurrentPage }) => {
  const pagesToShow = 5;
  const paginationArray = new Array(pagesToShow);

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-sm">
        {currentPage > 1 && (
          <li onClick={() => setCurrentPage((prev) => prev - 1)}>
            <a
              href="#"
              className="flex items-center justify-center h-8 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Previous
            </a>
          </li>
        )}
        {paginationArray.map((ele, index) => {
          const pageNumber = currentPage + index + 1;
          if (pageNumber > numPages) return null;
          return (
            <li key={index}>
              <a
                href="#"
                aria-current={pageNumber === currentPage ? "page" : undefined}
                className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {pageNumber}
              </a>
            </li>
          );
        })}
        {currentPage + pagesToShow + 1 < numPages && (
          <li>
            <span className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500">
              ...
            </span>
          </li>
        )}
        {currentPage < numPages && (
          <li>
            <a
              onClick={() => setCurrentPage((prev) => prev + 1)}
              href="#"
              className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Next
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;