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
import { Link } from "react-router-dom";

const propTypes = {
  data: PropTypes.array.isRequired,
  error: PropTypes.object,
  loading: PropTypes.bool,
  bookPerPage: PropTypes.number.isRequired
};
class BookList extends React.Component {
  state = {
    language: "",
    authors: new Map(),
    authorsQueryString: "",
    category: "",
    sliderValues: [10, 30]
  };
  componentDidMount() {
    const q = queryString.parse(this.props.location.search);
    this.mapLanguageUrlToState(q.language);
    this.mapAuthorUrlToState(q.authors);
    this.mapCategoryUrlToState(q.category);
  }

  mapLanguageUrlToState = lang_param => {
    if (lang_param !== undefined) {
      this.setState(
        {
          language: lang_param
        },
        () => {
          this.props.fetchBooks(
            bookListURL(this.props.offset, this.state.language)
          );
          this.props.refreshCart();
          document.addEventListener("scroll", this.trackScrolling);
        }
      );
    } else {
      const { offset, fetchBooks, refreshCart } = this.props;
      const { language } = this.state;

      fetchBooks(bookListURL(offset, language));
      refreshCart();
      document.addEventListener("scroll", this.trackScrolling);
    }
  };

  mapCategoryUrlToState = category_param => {
    if (category_param !== undefined) {
      this.setState(
        {
          category: category_param
        },
        () => {
          const { offset, fetchBooks } = this.props;
          const { language, category, authors } = this.state;
          const authors_array = Array.from(authors.entries()).join(",");

          fetchBooks(bookListURL(offset, language, authors_array, category));
        }
      );
    }
  };
  mapAuthorUrlToState = authors_param => {
    if (authors_param !== undefined) {
      let urlAuthorMap = new Map();
      let result = [];
      for (var i = 0; i < authors_param.split(",").length; i += 2) {
        result.push([
          authors_param.split(",")[i],
          authors_param.split(",")[i + 1]
        ]);
      }
      result.forEach(element => {
        urlAuthorMap.set(element[0], element[1] === "true");
      });
      this.setState(
        {
          authors: urlAuthorMap
        },
        () => {
          const { offset, fetchBooks } = this.props;
          const { language, authors } = this.state;
          const authors_array = Array.from(authors.entries()).join(",");
          const url_endpoint = bookListURL(offset, language, authors_array);

          fetchBooks(url_endpoint);
        }
      );
    }
  };

  componentWillUnmount = () => {
    document.removeEventListener("scroll", this.trackScrolling);
  };

  handleClickOnBook = id => {
    this.props.history.push(`/books/${id}`);
  };

  handleSetActiveCategory = event => {
    this.setState({ category: event.currentTarget.text }, () => {
      const { offset, fetchBooks, history } = this.props;
      const { language, category, authors } = this.state;
      const authors_array = Array.from(authors.entries()).join(",");
      const endpoint = bookListURL(offset, language, authors_array, category);
      history.push(endpoint.slice(endpoint.indexOf("?limit"), endpoint.length));
      fetchBooks(endpoint);
    });
  };

  onSelectRadio = event => {
    this.setState({ language: event.currentTarget.value }, () => {
      const { offset, fetchBooks, history } = this.props;
      const { language, category, authors } = this.state;
      const authors_array = Array.from(authors.entries()).join(",");
      const endpoint = bookListURL(offset, language, authors_array, category);
      history.push(endpoint.slice(endpoint.indexOf("?limit"), endpoint.length));
      fetchBooks(bookListURL(offset, language, authors_array, category));
    });
  };
  onSliderChange = sliderValues => {
    this.setState({ sliderValues: sliderValues }, () => {
      console.log("changed", this.state.sliderValues);
      const { offset, fetchBooks, history } = this.props;
      const { language, category, authors, sliderValues } = this.state;
      const authors_array = Array.from(authors.entries()).join(",");
      const endpoint = bookListURL(offset, language, authors_array, category);
      history.push(endpoint.slice(endpoint.indexOf("?limit"), endpoint.length));
      fetchBooks(
        bookListURL(offset, language, authors_array, category, sliderValues)
      );
    });
  };
  onSelectAuthor = (e, data) => {
    const item = e.target.textContent;
    const isChecked = data.checked;
    this.setState(
      prevState => ({
        authors: prevState.authors.set(item, isChecked)
      }),
      () => {
        const { offset, fetchBooks, history } = this.props;
        const { language, category, authors } = this.state;
        const authors_array = Array.from(authors.entries()).join(",");
        const url_endpoint = bookListURL(offset, language, authors_array);
        const endpoint = bookListURL(offset, language, authors_array, category);
        history.push(
          endpoint.slice(endpoint.indexOf("?limit"), endpoint.length)
        );
        fetchBooks(url_endpoint);
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
          Array.from(this.state.authors.entries()).join(",")
        ),
        this.props.bookPerPage + 12,
        this.props.offset + 12
      );
    }
  };

  render() {
    const { data, bookPerPage, _length } = this.props;
    const { language, authors, sliderValues } = this.state;
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
            onSelectRadio={this.onSelectRadio}
            onSelectAuthor={this.onSelectAuthor}
            paginatedData={data}
            language={language}
            handleClickOnBook={this.handleClickOnBook}
            handleSetActiveCategory={this.handleSetActiveCategory}
            authors={authors}
            onSliderChange={this.onSliderChange}
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
