import React, { Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
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

class BookList extends React.Component {
  state = {
    loading: false,
    error: null,
    data: [],
    currentPage: 1,
    setPage: 1,
    bookPerPage: 12,
    language: "No filter"
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(bookListURL)
      .then(res => {
        this.setState({ data: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  }

  onSelectRadio = event => {
    this.setState({
      language: event.currentTarget.value
    });
  };
  // change page
  onPageChange = pageNumber => {
    this.setState({ currentPage: pageNumber });
  };
  render() {
    const {
      data,
      error,
      loading,
      currentPage,
      bookPerPage,
      language
    } = this.state;
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

            <Image src="/images/wireframe/short-paragraph.png" />
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

export default BookList;
