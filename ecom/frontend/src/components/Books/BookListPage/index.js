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
    language: "All",
    checkedItems: new Map()
  };
  componentDidMount() {
    if (queryString.parse(this.props.location.search).language !== undefined) {
      this.setState({
        language: queryString.parse(this.props.location.search).language
      });
    }
    this.props.fetchBooks(this.props.offset, this.state.language);
    this.props.refreshCart();
    document.addEventListener("scroll", this.trackScrolling);
  }

  componentWillUnmount = () => {
    document.removeEventListener("scroll", this.trackScrolling);
  };

  handleClickOnBook = id => {
    this.props.history.push(`/books/${id}`);
  };

  onSelectRadio = event => {
    console.log(`language ${event.currentTarget.value} selected`);
    this.props.history.push(`/?language=${event.currentTarget.value}`);
    this.setState({ language: event.currentTarget.value });
  };

  handleCheckboxChange = event =>
    this.setState({ checked: event.target.checked });

  serialize = items => {
    for (let entry in items) {
      console.log(entry);
    }
    // return Object.entries(items)
    //   .map(([key, val]) => `${key}=${val}`)
    //   .join("&");
  };
  onSelectAuthor = (e, data) => {
    const item = e.target.textContent;
    const isChecked = data.checked;
    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(item, isChecked)
    }));
    // console.log(this.state.checkedItems);
    // for (let entry in this.state.checkedItems) {
    //   console.log(entry);
    // } // var query = [];
    this.state.checkedItems.forEach((isChecked, checkbox) => {
      console.log(checkbox, isChecked);
    });
    // this.props.history.push(`/?author=${query}`);
  };

  // onSelectAuthor = event => {
  //   const condition = this.state.author.includes(event.target.textContent);
  //   if (condition === false) {
  //     this.setState({
  //       author: [...this.state.author, event.target.textContent]
  //     });
  //     this.props.history.push(`/?author=${this.state.author}`);
  //   } else {
  //     this.setState({
  //       author: this.state.author.splice(
  //         this.state.author.indexOf(event.target.textContent)
  //       )
  //     });
  //     this.props.history.push(`/?author=${this.state.author}`);
  //   }
  // };

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
      this.props.loadMoar(
        this.props.offset + 12,
        this.props.bookPerPage + 12,
        this.props.loading
      );
    }
  };

  render() {
    const { data, bookPerPage, _length } = this.props;
    const { language, checkedItems } = this.state;

    const dataToShow =
      language !== "All"
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
          length={_length}
          onSelectRadio={this.onSelectRadio}
          onSelectAuthor={this.onSelectAuthor}
          paginatedData={paginatedData}
          language={language}
          handleClickOnBook={this.handleClickOnBook}
          checkedItems={checkedItems}
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
