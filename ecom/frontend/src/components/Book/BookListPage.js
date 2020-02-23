import React from "react";
import { connect } from "react-redux";
import { Container } from "semantic-ui-react";
import { fetchBooks, onPageChange, onSelectRadio } from "../../actions/books";
import BookPage from "./BooksPlusPaginationAndFilters";
import { withLoading, withError } from "../../hoc/hoc";

class BookList extends React.Component {
  componentDidMount() {
    this.props.fetchBooks(this.props.dataIsCached);
  }
  handleClickOnBook = id => {
    this.props.history.push(`/books/${id}`);
  };
  render() {
    const {
      data,
      error,
      loading,
      currentPage,
      bookPerPage,
      language,
      onSelectRadio,
      onPageChange
    } = this.props;
    const dataToShow =
      language !== "No filter"
        ? data.filter(item => language.includes(item.langue_nom))
        : data;

    const indexOfLastBook = currentPage * bookPerPage;
    const indexOfFirstBook = indexOfLastBook - bookPerPage;
    const paginatedData = dataToShow.slice(indexOfFirstBook, indexOfLastBook);

    return (
      <Container className="booklist">
        <BookPageWithLoadingAndErrorHandling
          bookPerPage={bookPerPage}
          dataToShow={dataToShow}
          onPageChange={onPageChange}
          currentPage={currentPage}
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
    onPageChange: pageNumber => dispatch(onPageChange(pageNumber)),
    fetchBooks: dataIsCached => dispatch(fetchBooks(dataIsCached))
  };
};

const BookPageWithLoading = withLoading(BookPage);
const BookPageWithLoadingAndErrorHandling = withError(BookPageWithLoading);

const mapStateToProps = state => {
  return {
    loading: state.books.loading,
    error: state.books.error,
    data: state.books.data,
    currentPage: state.books.currentPage,
    setPage: state.books.setPage,
    bookPerPage: state.books.bookPerPage,
    language: state.books.language,
    isAuthenticated: state.auth.token !== null,
    dataIsCached: state.books.data.length != 0
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);