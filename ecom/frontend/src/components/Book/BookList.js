import React from "react";
import { connect } from "react-redux";
import { Container, Dimmer, Loader, Message, Segment } from "semantic-ui-react";
import { fetchBooks, onPageChange, onSelectRadio } from "../../actions/books";
import BookPage from "./BookPage";
import { withLoading } from "../../hoc/hoc";

class BookList extends React.Component {
  componentDidMount() {
    this.props.fetchBooks(this.props.dataIsCached);
  }
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
      <Container>
        {error && (
          <Message
            error
            header="There was some errors with your submission"
            content={JSON.stringify(error)}
          />
        )}

        <BookPageWithLoading
          bookPerPage={bookPerPage}
          dataToShow={dataToShow}
          onPageChange={onPageChange}
          currentPage={currentPage}
          onSelectRadio={onSelectRadio}
          paginatedData={paginatedData}
          language={language}
          loading={loading}
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

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.books.loading,
    error: state.books.error,
    data: state.books.data,
    currentPage: state.books.currentPage,
    setPage: state.books.setPage,
    bookPerPage: state.books.bookPerPage,
    language: state.books.language,
    dataIsCached: state.books.data.length != 0
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
