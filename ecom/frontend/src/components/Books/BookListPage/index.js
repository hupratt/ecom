import React from "react";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import { loadmoar } from "../../../actions/books";
import BooksPlusPaginationAndFilters from "./BooksPlusPaginationAndFilters";
import { withLoading, withError } from "../../../hoc/hoc";
import PropTypes from "prop-types";
import { bookListURL } from "../../../constants";
import { Link, withRouter } from "react-router-dom";
import { fetchCart } from "../../../actions/cart";

const propTypes = {
  data: PropTypes.array.isRequired,
  error: PropTypes.object,
  loading: PropTypes.bool,
  bookPerPage: PropTypes.number.isRequired
};
class BookList extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    document.addEventListener("scroll", this.trackScrolling);
    if (
      (this.props.language.length > 0) |
      (this.props.authors.size > 0) |
      (this.props.category.length > 0) |
      (this.props.searchTerm.length > 0)
    ) {
      this.mapStateToUrl();
    }
  }
  componentWillUnmount = () => {
    document.removeEventListener("scroll", this.trackScrolling);
  };

  mapStateToUrl = () => {
    const {
      offset,
      history,
      searchTerm,
      language,
      category,
      authors,
      sliderValues
    } = this.props;
    const authors_array = Array.from(authors.entries()).join(",");

    const endpoint = bookListURL(
      offset,
      language,
      authors_array,
      category,
      sliderValues,
      searchTerm
    );
    history.push(endpoint.slice(endpoint.indexOf("?limit"), endpoint.length));
  };
  handleClickOnBook = id => {
    this.props.history.push(`/books/${id}`);
  };

  isBottom = el => {
    if (el)
      return (
        el.getBoundingClientRect().bottom <=
        window.innerHeight + el.getBoundingClientRect().bottom / 10
      );
  };

  trackScrolling = () => {
    const wrappedElement = document.getElementById("loadmoar");
    if (this.isBottom(wrappedElement) && this.props.loading == false) {
      this.props.loadMoar(
        bookListURL(
          this.props.offset + 12,
          this.props.language,
          Array.from(this.props.authors.entries()).join(",")
        ),
        this.props.bookPerPage + 12,
        this.props.offset + 12
      );
    }
  };

  render() {
    const {
      data,
      bookPerPage,
      _length,
      onSelectAuthor,
      language,
      authors,
      sliderValues,
      onSelectRadio,
      handleSetActiveCategory,
      onSliderChange
    } = this.props;

    return (
      <React.Fragment>
        {/* Breadcrumb Section Begin */}
        <div className="breacrumb-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="breadcrumb-text">
                  <Link to="/" onClick={() => window.location.reload()}>
                    <i className="fa fa-home" /> Home
                  </Link>
                  <span>Detail</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Breadcrumb Section Begin */}
        <Container className="booklist">
          <BookPageWithLoadingAndErrorHandling
            bookPerPage={bookPerPage}
            length={_length}
            onSelectRadio={onSelectRadio}
            onSelectAuthor={onSelectAuthor}
            paginatedData={data}
            language={language}
            handleClickOnBook={this.handleClickOnBook}
            handleSetActiveCategory={handleSetActiveCategory}
            authors={authors}
            onSliderChange={onSliderChange}
            sliderValues={sliderValues}
          />

          {this.props.children}
        </Container>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadMoar: (url_endpoint, bookPerPage, offset) =>
      dispatch(loadmoar(url_endpoint, bookPerPage, offset)),
    refreshCart: () => dispatch(fetchCart())
  };
};

const BookPageWithLoading = withLoading(BooksPlusPaginationAndFilters);
const BookPageWithLoadingAndErrorHandling = withError(BookPageWithLoading);

const mapStateToProps = state => {
  return {
    data: state.books.data,
    loading: state.books.loading,
    offset: state.books.offset,
    bookPerPage: state.books.bookPerPage,
    _length: state.books._length,
    searchTerm: state.navigation.searchTerm
  };
};

BookList.propTypes = propTypes;

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BookList)
);
