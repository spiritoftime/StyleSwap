import { useEffect, useState } from "react";
type PaginationProps = {
  numPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
const Pagination: React.FC<PaginationProps> = ({ numPages, currentPage, setCurrentPage }) => {
  const pagesToShow = 5;
  const [paginationArray, setPaginationArray] = useState<number[]>([]);
  useEffect(() => {
    const newPaginationArray = Array.from(
      { length: pagesToShow },
      (_, index) => currentPage - Math.floor(pagesToShow / 2) + index
    );
    setPaginationArray(newPaginationArray);
  }, [currentPage, numPages, pagesToShow]);
  // console.log(paginationArray, "paginationArray");

  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          page {currentPage + 1}
        </span>{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          of {numPages} pages
        </span>
      </span>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          {currentPage > 0 && (
            <li onClick={() => setCurrentPage((prev: number) => prev - 1)}>
              <a
                href="#"
                className="flex items-center justify-center h-8 px-3 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
          )}
          {paginationArray.map((pageNumber, index) => {
            console.log(pageNumber, "number", numPages, "numpages");
            if (pageNumber >= 0 && pageNumber < numPages) {
              // console.log("wtf");
              return (
                <li
                  onClick={() => {
                    if (currentPage !== pageNumber) setCurrentPage(pageNumber);
                  }}
                  key={index}
                >
                  <a
                    href="#"
                    aria-current={
                      pageNumber === currentPage ? "page" : undefined
                    }
                    className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {pageNumber + 1}
                  </a>
                </li>
              );
            } else {
              return null;
            }
          })}
          {currentPage + pagesToShow + 1 < numPages && (
            <li>
              <span className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500">
                ...
              </span>
            </li>
          )}
          {currentPage < numPages - 1 && (
            <li>
              <a
                onClick={() => setCurrentPage((prev: number) => prev + 1)}
                href="#"
                className="flex items-center justify-center h-8 px-3 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
