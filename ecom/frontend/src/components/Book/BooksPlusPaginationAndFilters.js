import React from "react";
import PaginationShorthand from "../Layout/Pagination";
import { onSelectRadio } from "../../actions/books";
import LanguageFilter from "./LanguageFilter";
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
      <LanguageFilter onSelectRadio={onSelectRadio} language={language} />
      <BookGrid
        paginatedData={paginatedData}
        handleClickOnBook={handleClickOnBook}
      />

      <PaginationShorthand
        bookPerPage={bookPerPage}
        books={dataToShow.length}
        paginate={onPageChange}
        currentPage={currentPage}
      >
        <p>
          Displaying {bookPerPage} of {dataToShow.length} books
        </p>
      </PaginationShorthand>
    </React.Fragment>
  );
};

export default BookPage;
