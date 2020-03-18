import React from "react";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import { fetchBooks, loadmoar } from "../../../actions/books";
import BooksPlusPaginationAndFilters from "./BooksPlusPaginationAndFilters";
import { withLoading, withError } from "../../../hoc/hoc";
import { fetchCart } from "../../../actions/cart";
import PropTypes from "prop-types";
import queryString from "query-string";

const propTypes = {
  data: PropTypes.array.isRequired,
  error: PropTypes.object,
  loading: PropTypes.bool,
  bookPerPage: PropTypes.number.isRequired
};
class BookList extends React.Component {
  state = {
    language: "",
    checkedItems: new Map()
  };
  componentDidMount() {
    const lang_param = queryString.parse(this.props.location.search).language;
    if (lang_param !== undefined) {
      this.setState(
        {
          language: lang_param
        },
        () => {
          this.props.fetchBooks(this.props.offset, lang_param);
          this.props.refreshCart();
          document.addEventListener("scroll", this.trackScrolling);
        }
      );
    } else {
      this.props.fetchBooks(this.props.offset, this.state.language);
      this.props.refreshCart();
      document.addEventListener("scroll", this.trackScrolling);
    }
  }

  componentWillUnmount = () => {
    document.removeEventListener("scroll", this.trackScrolling);
  };

  handleClickOnBook = id => {
    this.props.history.push(`/books/${id}`);
  };

  onSelectRadio = event => {
    this.setState({ language: event.currentTarget.value }, () => {
      this.props.history.push(`/?language=${this.state.language}`);
      this.props.fetchBooks(this.props.offset, this.state.language);
    });
  };

  onSelectAuthor = (e, data) => {
    const item = e.target.textContent;
    const isChecked = data.checked;
    this.setState(
      prevState => ({
        checkedItems: prevState.checkedItems.set(item, isChecked)
      }),
      () =>
        this.props.history.push(
          `/?author=${Array.from(this.state.checkedItems.entries()).join("&")}`
        )
    );
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
        this.props.offset + 12,
        this.props.bookPerPage + 12,
        this.state.language
      );
    }
  };

  render() {
    const { data, bookPerPage, _length } = this.props;
    const { language } = this.state;

    return (
      <Container className="booklist">
        <BookPageWithLoadingAndErrorHandling
          bookPerPage={bookPerPage}
          length={_length}
          onSelectRadio={this.onSelectRadio}
          onSelectAuthor={this.onSelectAuthor}
          paginatedData={data}
          language={language}
          handleClickOnBook={this.handleClickOnBook}
        />

        {this.props.children}
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadMoar: (offset, bookPerPage, loading) =>
      dispatch(loadmoar(offset, bookPerPage, loading)),
    fetchBooks: (dataIsCached, bookPerPage) =>
      dispatch(fetchBooks(dataIsCached, bookPerPage)),
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
    dataIsCached: state.books.data.length != 0,
    _length: state.books._length
  };
};

BookList.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
