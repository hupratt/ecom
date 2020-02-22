import React from "react";
import PaginationShorthand from "../Layout/Pagination";
import { onSelectRadio } from "../../actions/books";
import LanguageFilter from "./LanguageFilter";
import AuthorFilter from "./AuthorFilter";
import BookGrid from "./Books";

const BookPage = ({
  bookPerPage,
  dataToShow,
  onPageChange,
  currentPage,
  onSelectRadio,
  paginatedData,
  language,
  handleClickOnBook
}) => {
  return (
    <React.Fragment>
      <div className="container container-forms">
        <LanguageFilter onSelectRadio={onSelectRadio} language={language} />
        <AuthorFilter />
        <PaginationShorthand
          bookPerPage={bookPerPage}
          books={dataToShow.length}
          paginate={onPageChange}
          currentPage={currentPage}
        ></PaginationShorthand>
        <p>
          Displaying {bookPerPage} of {dataToShow.length} books
        </p>
      </div>
      <BookGrid
        paginatedData={paginatedData}
        handleClickOnBook={handleClickOnBook}
      />
    </React.Fragment>
  );
};

export default BookPage;
