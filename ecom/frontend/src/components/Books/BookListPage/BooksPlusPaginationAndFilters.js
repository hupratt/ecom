import React from "react";
import LanguageFilter from "../../Filters/LanguageFilter";
import AuthorFilter from "../../Filters/AuthorFilter";
import CategoryFilter from "../../Filters/CategoryFilter";
import BookGrid from "./BookGrid";
import PropTypes from "prop-types";
import MySlider from "../../Buttons/Slider";
import { Container } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

const propTypes = {
  bookPerPage: PropTypes.number.isRequired,
  onSelectRadio: PropTypes.func.isRequired,
  paginatedData: PropTypes.array.isRequired,
  language: PropTypes.string.isRequired,
  handleClickOnBook: PropTypes.func.isRequired,
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
  sliderValues,
}) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <div className="container-wrapper">
        <div className="container container-cta">
          <h1>European School books</h1>
          <h3>
            Available <a>here</a>
          </h3>
        </div>
      </div>
      <Container className="booklist">
        <div className="container container-forms">
          <LanguageFilter onSelectRadio={onSelectRadio} language={language} />
          <AuthorFilter onSelectAuthor={onSelectAuthor} authors={authors} />
          <CategoryFilter handleSetActiveCategory={handleSetActiveCategory} />
          <MySlider
            onSliderChange={onSliderChange}
            sliderValues={sliderValues}
          />
          <p>
            {t("Displaying x of y", {
              fraction: paginatedData.length,
              total: length,
            })}
          </p>
        </div>
        <BookGrid
          paginatedData={paginatedData}
          handleClickOnBook={handleClickOnBook}
          paginatedDataLength={paginatedData.length}
          length={length}
        />
      </Container>
    </React.Fragment>
  );
};

BooksPlusPaginationAndFilters.propTypes = propTypes;

export default BooksPlusPaginationAndFilters;
