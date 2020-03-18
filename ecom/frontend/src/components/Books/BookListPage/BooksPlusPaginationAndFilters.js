import React from "react";
import LanguageFilter from "../../Filters/LanguageFilter";
import AuthorFilter from "../../Filters/AuthorFilter";
import CategoryFilter from "../../Filters/CategoryFilter";
import BookGrid from "./BookGrid";
import PropTypes from "prop-types";

const propTypes = {
  bookPerPage: PropTypes.number.isRequired,
  onSelectRadio: PropTypes.func.isRequired,
  paginatedData: PropTypes.array.isRequired,
  language: PropTypes.string.isRequired,
  handleClickOnBook: PropTypes.func.isRequired
};

const BooksPlusPaginationAndFilters = ({
  bookPerPage,
  length,
  onSelectRadio,
  onSelectAuthor,
  paginatedData,
  language,
  handleClickOnBook
}) => {
  return (
    <React.Fragment>
      <div className="container container-forms">
        <LanguageFilter onSelectRadio={onSelectRadio} language={language} />
        <AuthorFilter onSelectAuthor={onSelectAuthor} />
        <CategoryFilter />
        <input className="js-range-slider" id="price_range" name="pricerange" />

        <p>
          Displaying {bookPerPage} of {length} books
        </p>
      </div>
      <BookGrid
        paginatedData={paginatedData}
        handleClickOnBook={handleClickOnBook}
      />
    </React.Fragment>
  );
};

BooksPlusPaginationAndFilters.propTypes = propTypes;

export default BooksPlusPaginationAndFilters;
