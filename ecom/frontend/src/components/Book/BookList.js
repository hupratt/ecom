import React, { Fragment } from "react";
import { connect } from "react-redux";
import {
  Container,
  Dimmer,
  Image,
  Loader,
  Message,
  Segment,
  Grid,
  Item,
  Form
} from "semantic-ui-react";
import { bookListURL, s3_base_url } from "../../constants";
import PaginationShorthand from "../Layout/Pagination";
import RadioButton from "../Layout/RadioButton";
import { fetchBooks } from "../../actions/books";
import { fetchCart } from "../../actions/cart";
import { localhost } from "../../constants";

class BookList extends React.Component {
  componentDidMount() {
    this.props.fetchBooks();
  }
  render() {
    const {
      data,
      error,
      loading,
      currentPage,
      bookPerPage,
      language
    } = this.props;
    const dataToShow =
      language !== "No filter"
        ? data.filter(item => language.includes(item.langue_nom))
        : data;

    const indexOfLastBook = currentPage * bookPerPage;
    const indexOfFirstBook = indexOfLastBook - bookPerPage;
    const paginatedData = dataToShow.slice(indexOfFirstBook, indexOfLastBook);
    console.log(localhost);
    console.log(process.env.REACT_LOCALHOST);
    console.log(process.env);
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
        <Form className="radio">
          <div className="h4">Language</div>
          <ul>
            <RadioButton
              handleChange={this.onSelectRadio}
              language={language}
              value="PT"
              id="1"
            />
            <RadioButton
              handleChange={this.onSelectRadio}
              language={language}
              value="FR"
              id="2"
            />
            <RadioButton
              handleChange={this.onSelectRadio}
              language={language}
              value="EN"
              id="3"
            />
            <RadioButton
              handleChange={this.onSelectRadio}
              language={language}
              value="No filter"
              id="4"
            />
          </ul>
        </Form>
        <Grid divided>
          <div className="row">
            {paginatedData.map(item => {
              return (
                <Item className="four wide column" key={item.id}>
                  <Item.Image
                    as="a"
                    onClick={() => this.props.history.push(`/books/${item.id}`)}
                    src={s3_base_url + item.isbn + ".jpg"}
                  />
                  <Item.Content>
                    <Item.Meta>
                      <span className="cinema">{item.genre_nom}</span>
                    </Item.Meta>
                    <Item.Header
                      as="a"
                      onClick={() =>
                        this.props.history.push(`/books/${item.id}`)
                      }
                    >
                      {item.titre}
                    </Item.Header>

                    <Item.Extra>{item.prix} €</Item.Extra>
                  </Item.Content>
                </Item>
              );
            })}
          </div>
        </Grid>

        {this.props.children}
        <PaginationShorthand
          bookPerPage={bookPerPage}
          books={dataToShow.length}
          paginate={this.onPageChange}
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
    refreshCart: () => dispatch(fetchCart()),
    fetchBooks: () => dispatch(fetchBooks())
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
    language: state.books.language
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookList);
