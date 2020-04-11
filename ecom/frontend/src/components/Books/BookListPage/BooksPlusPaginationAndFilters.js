import React from "react";
import LanguageFilter from "../../Filters/LanguageFilter";
import AuthorFilter from "../../Filters/AuthorFilter";
import CategoryFilter from "../../Filters/CategoryFilter";
import BookGrid from "./BookGrid";
import PropTypes from "prop-types";
import MySlider from "../../Buttons/Slider";
import { Container } from "semantic-ui-react";

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
  handleClickOnBook,
  handleSetActiveCategory,
  authors,
  onSliderChange,
  sliderValues
}) => {
  return (
    <Container className="booklist">
      <React.Fragment>
        <div className="container container-forms">
          <LanguageFilter onSelectRadio={onSelectRadio} language={language} />
          <AuthorFilter onSelectAuthor={onSelectAuthor} authors={authors} />
          <CategoryFilter handleSetActiveCategory={handleSetActiveCategory} />
          <MySlider
            onSliderChange={onSliderChange}
            sliderValues={sliderValues}
          />
          <p>
            Displaying {paginatedData.length} of {length} books
          </p>
        </div>
        <BookGrid
          paginatedData={paginatedData}
          handleClickOnBook={handleClickOnBook}
          paginatedDataLength={paginatedData.length}
          length={length}
        />
      </React.Fragment>
    </Container>
  );
};

BooksPlusPaginationAndFilters.propTypes = propTypes;

export default BooksPlusPaginationAndFilters;
