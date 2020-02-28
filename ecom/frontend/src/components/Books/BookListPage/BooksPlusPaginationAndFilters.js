import React from "react";
import LanguageFilter from "../../Filters/LanguageFilter";
import AuthorFilter from "../../Filters/AuthorFilter";
import CategoryFilter from "../../Filters/CategoryFilter";
import BookGrid from "./BookGrid";

const BooksPlusPaginationAndFilters = ({
  bookPerPage,
  dataToShow,
  onPageChange,
  currentPage,
  onSelectRadio,
  paginatedData,
  language,
  handleClickOnBook,
  loadmoar
}) => {
  return (
    <React.Fragment>
      <div className="container container-forms">
        <LanguageFilter onSelectRadio={onSelectRadio} language={language} />
        <AuthorFilter />
        <CategoryFilter />
        <input className="js-range-slider" id="price_range" name="pricerange" />

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

export default BooksPlusPaginationAndFilters;
