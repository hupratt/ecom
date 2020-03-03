import React from "react";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import { fetchBooks, onSelectRadio, loadmoar } from "../../../actions/books";
import BooksPlusPaginationAndFilters from "./BooksPlusPaginationAndFilters";
import { withLoading, withError } from "../../../hoc/hoc";
import { fetchCart } from "../../../actions/cart";

const rafAsync = () => {
  return new Promise(resolve => {
    requestAnimationFrame(resolve);
  });
};

const checkElement = selector => {
  if (document.querySelector(selector) === null) {
    return rafAsync().then(() => checkElement(selector));
  } else {
    return Promise.resolve(document.querySelectorAll(selector));
  }
};

class BookList extends React.Component {
  componentDidMount() {
    if (this.props.shoppingCart) {
      this.props.refreshCart();
    }
    this.props.fetchBooks(this.props.dataIsCached, this.props.offset);
    document.addEventListener("scroll", this.trackScrolling);
  }

  componentWillUnmount = () => {
    document.removeEventListener("scroll", this.trackScrolling);
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
    if (this.isBottom(wrappedElement)) {
      this.props.loadMoar(this.props.offset + 12, this.props.bookPerPage + 12);
    }
  };

  render() {
    const {
      data,
      error,
      loading,
      bookPerPage,
      language,
      onSelectRadio
    } = this.props;
    const dataToShow =
      language !== "No filter"
        ? data.filter(item => language.includes(item.langue_nom))
        : data;
    let paginatedData = [];
    if (dataToShow.length != 0) {
      paginatedData = dataToShow;
    }

    return (
      <Container className="booklist">
        <BookPageWithLoadingAndErrorHandling
          bookPerPage={bookPerPage}
          dataToShow={dataToShow}
          onSelectRadio={onSelectRadio}
          paginatedData={paginatedData}
          language={language}
          loading={loading}
          error={error}
          handleClickOnBook={this.handleClickOnBook}
        />

        {this.props.children}
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSelectRadio: event => dispatch(onSelectRadio(event)),
    loadMoar: (offset, bookPerPage) => dispatch(loadmoar(offset, bookPerPage)),
    fetchBooks: (dataIsCached, bookPerPage) =>
      dispatch(fetchBooks(dataIsCached, bookPerPage)),
    refreshCart: () => dispatch(fetchCart())
  };
};

const BookPageWithLoading = withLoading(BooksPlusPaginationAndFilters);
const BookPageWithLoadingAndErrorHandling = withError(BookPageWithLoading);

const mapStateToProps = state => {
  return {
    loading: state.books.loading,
    error: state.books.error,
    data: state.books.data,
    offset: state.books.offset,
    setPage: state.books.setPage,
    bookPerPage: state.books.bookPerPage,
    language: state.books.language,
    isAuthenticated: state.auth.token !== null,
    dataIsCached: state.books.data.length != 0,
    shoppingCart: state.cart.shoppingCart
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
