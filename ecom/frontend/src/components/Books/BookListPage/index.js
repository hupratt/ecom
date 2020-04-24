import React from "react";
import { connect } from "react-redux";
import { loadmoar } from "../../../actions/books";
import BooksPlusPaginationAndFilters from "./BooksPlusPaginationAndFilters";
import { withLoading, withError } from "../../../hoc/hoc";
import PropTypes from "prop-types";
import { bookListURL, endpoint } from "../../../constants";
import { Link, withRouter } from "react-router-dom";
import { fetchCart } from "../../../actions/cart";
import { Trans } from "react-i18next";
import { fetchBooks } from "../../../actions/books";
import queryString from "query-string";
import { userIsStaff } from "../../../actions/auth";

const propTypes = {
  data: PropTypes.array.isRequired,
  error: PropTypes.object,
  loading: PropTypes.bool,
  bookPerPage: PropTypes.number.isRequired,
};
class BookList extends React.Component {
  state = { user_staff: null, user_staff: null };
  componentDidMount() {
    window.scrollTo(0, 0);
    document.addEventListener("scroll", this.trackScrolling);
    const q = queryString.parse(this.props.location.search);
    if (Object.keys(q).length == 0 && this.props.dataLength == 0) {
      this.props.fetchBooks(bookListURL());
    } else if (
      (this.props.language.length > 0) |
      (this.props.authors.size > 0) |
      (this.props.category.length > 0) |
      (JSON.stringify(this.props.sliderValues) !==
        JSON.stringify(Array(0, 100))) |
      (this.props.searchTerm.length > 0)
    ) {
      this.mapStateToUrl();
    }
    if (this.props.isAuthenticated == true && this.props.shoppingCart == null) {
      this.props.refreshCart();
    }
    if (this.props.isAuthenticated == true && this.props.user_staff == null) {
      this.props.userIsStaff();
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
      sliderValues,
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
  handleClickOnBook = (id) => {
    this.props.history.push(`/books/${id}`);
  };

  isBottom = (el) => {
    if (el)
      return (
        el.getBoundingClientRect().bottom <=
        window.innerHeight + el.getBoundingClientRect().bottom / 10
      );
  };

  trackScrolling = () => {
    const wrappedElement = document.getElementById("loadmoar");
    const {
      _length,
      loading,
      loadMoar,
      offset,
      language,
      authors,
      bookPerPage,
    } = this.props;
    if (
      this.isBottom(wrappedElement) &&
      loading == false &&
      offset + 12 < _length
    ) {
      loadMoar(
        bookListURL(
          offset + 12,
          language,
          Array.from(authors.entries()).join(",")
        ),
        bookPerPage + 12,
        offset + 12
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
      onSliderChange,
      error,
      errorCart,
      isAuthenticated,
      user_name,
      user_staff,
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
                    <i className="fa fa-home" /> <Trans i18nKey="Home" />
                  </Link>
                  <span>
                    <Trans i18nKey="Detail" />
                  </span>
                  {user_staff && user_name && (
                    <React.Fragment>
                      <p>
                        Olá {user_name},
                        <button
                          onClick={() => this.props.history.push(`/book/add`)}
                        >
                          + Add a book
                        </button>
                      </p>
                    </React.Fragment>
                  )}
                  {isAuthenticated == false ? (
                    <button onClick={() => this.props.history.push(`/login`)}>
                      Log in
                    </button>
                  ) : (
                    <React.Fragment />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Breadcrumb Section Begin */}

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
          error={error}
          errorCart={errorCart}
        />

        {this.props.children}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMoar: (url_endpoint, bookPerPage, offset) =>
      dispatch(loadmoar(url_endpoint, bookPerPage, offset)),
    fetchBooks: (url_endpoint) => dispatch(fetchBooks(url_endpoint)),
    userIsStaff: () => dispatch(userIsStaff()),
    refreshCart: () => dispatch(fetchCart()),
  };
};

const BookPageWithLoading = withLoading(BooksPlusPaginationAndFilters);
const BookPageWithLoadingAndErrorHandling = withError(BookPageWithLoading);

const mapStateToProps = (state) => {
  return {
    data: state.books.data,
    loading: state.books.loading,
    offset: state.books.offset,
    bookPerPage: state.books.bookPerPage,
    _length: state.books._length,
    searchTerm: state.navigation.searchTerm,
    error: state.book.error,
    errorCart: state.cart.error,
    dataLength: state.books.data.length,
    isAuthenticated: state.auth.token !== null,
    user_name: state.auth.user_name,
    user_staff: state.auth.user_staff,
    shoppingCart: state.cart.shoppingCart,
  };
};

BookList.propTypes = propTypes;

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BookList)
);
