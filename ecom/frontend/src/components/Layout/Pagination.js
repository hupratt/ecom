import React from "react";

const PaginationShorthand = ({
  bookPerPage,
  books,
  paginate,
  currentPage,
  children,
  loadmoar
}) => {
  return (
    <ul className="pagination">
      <button id="loadmoar" onClick={() => loadmoar(bookPerPage)}>
        Load ...
      </button>
      {children}
    </ul>
  );
};

export default PaginationShorthand;
