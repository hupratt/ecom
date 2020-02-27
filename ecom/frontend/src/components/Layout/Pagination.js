import React from "react";

const PaginationShorthand = ({
  bookPerPage,
  books,
  paginate,
  currentPage,
  children
}) => {
  const pageNumbers = [];
  for (let i = currentPage - 1; i <= currentPage + 5; i++) {
    if (i <= Math.ceil(books / bookPerPage) && i > 0) {
      pageNumbers.push(i);
    }
  }

  return (
    <ul className="pagination">
      {pageNumbers.map(number => (
        <li key={number} className="page-item">
          <a
            onClick={() => paginate(number)}
            className={number == currentPage ? "page-link active" : "page-link"}
          >
            {number}
          </a>
        </li>
      ))}
      <button id="loadmoar" onClick={() => paginate(currentPage + 1)}>
        Load ...
      </button>
      {children}
    </ul>
  );
};

export default PaginationShorthand;
