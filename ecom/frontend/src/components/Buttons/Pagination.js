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
    <div className="my-pagination">
      <button id="loadmoar" onClick={() => loadmoar(bookPerPage)}>
        Load ...
      </button>
      {children}
    </div>
  );
};

export default PaginationShorthand;
