import React from "react";
import { connect } from "react-redux";
import {
  Container,
  Dimmer,
  Loader,
  Message,
  Segment,
  Grid,
  Item
} from "semantic-ui-react";
import PaginationShorthand from "../Layout/Pagination";
import { fetchBooks, onPageChange, onSelectRadio } from "../../actions/books";
import LanguageFilter from "./LanguageFilter";
import BookGrid from "./BookGrid";

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
        {loading && (
          <Segment>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          </Segment>
        )}
        <LanguageFilter onSelectRadio={onSelectRadio} language={language} />
        <BookGrid paginatedData={paginatedData} />

        {this.props.children}
        <PaginationShorthand
          bookPerPage={bookPerPage}
          books={dataToShow.length}
          paginate={onPageChange}
          currentPage={currentPage}
        >
          <p>
            Displaying {bookPerPage} of {dataToShow.length} books
          </p>
        </PaginationShorthand>
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
