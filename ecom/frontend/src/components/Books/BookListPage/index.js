import React from "react";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import { fetchBooks, loadmoar } from "../../../actions/books";
import BooksPlusPaginationAndFilters from "./BooksPlusPaginationAndFilters";
import { withLoading, withError } from "../../../hoc/hoc";
import { fetchCart } from "../../../actions/cart";
import PropTypes from "prop-types";
import queryString from "query-string";
import { bookListURL } from "../../../constants";

const propTypes = {
  data: PropTypes.array.isRequired,
  error: PropTypes.object,
  loading: PropTypes.bool,
  bookPerPage: PropTypes.number.isRequired
};
class BookList extends React.Component {
  state = {
    language: "",
    checkedItems: new Map(),
    authorsQueryString: ""
  };
  componentDidMount() {
    const lang_param = queryString.parse(this.props.location.search).language;
    const authors_param = queryString.parse(this.props.location.search).authors;
    if (lang_param !== undefined) {
      this.setState(
        {
          language: lang_param
        },
        () => {
          this.props.fetchBooks(bookListURL(this.props.offset, lang_param));
          this.props.refreshCart();
          document.addEventListener("scroll", this.trackScrolling);
        }
      );
    } else {
      this.props.fetchBooks(
        bookListURL(this.props.offset, this.state.language)
      );
      this.props.refreshCart();
      document.addEventListener("scroll", this.trackScrolling);
    }
    if (authors_param !== undefined) {
      let map = new Map();
      map.set(authors_param.split(",")[0], authors_param.split(",")[1]);
      this.setState(
        {
          authorsQueryString: queryString.parse(this.props.location.search)
            .authors,
          checkedItems: map
        },
        () => {
          const url_endpoint = bookListURL(
            this.props.offset,
            this.state.language,
            Array.from(this.state.checkedItems.entries()).join(",")
          );
          this.props.fetchBooks(url_endpoint);
        }
      );
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
      this.props.history.push(
        `/?language=${this.state.language}&authors=${Array.from(
          this.state.checkedItems.entries()
        ).join(",")}`
      );
      this.props.fetchBooks(
        bookListURL(this.props.offset, this.state.language)
      );
    });
  };

  onSelectAuthor = (e, data) => {
    const item = e.target.textContent;
    const isChecked = data.checked;
    this.setState(
      prevState => ({
        checkedItems: prevState.checkedItems.set(item, isChecked)
      }),
      () => {
        this.props.history.push(
          `/?language=${this.state.language}&authors=${Array.from(
            this.state.checkedItems.entries()
          ).join(",")}`
        );
        const url_endpoint = bookListURL(
          this.props.offset,
          this.state.language,
          Array.from(this.state.checkedItems.entries()).join(",")
        );
        this.props.fetchBooks(url_endpoint);
      }
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
        bookListURL(
          this.props.offset + 12,
          this.state.language,
          Array.from(this.state.checkedItems.entries()).join(",")
        ),
        this.props.bookPerPage + 12,
        this.props.offset + 12
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
          handleSetActiveCategory={this.handleSetActiveCategory}
          authorsQueryString={this.state.authorsQueryString}
        />

        {this.props.children}
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadMoar: (url_endpoint, bookPerPage, offset) =>
      dispatch(loadmoar(url_endpoint, bookPerPage, offset)),
    fetchBooks: url_endpoint => dispatch(fetchBooks(url_endpoint)),
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
