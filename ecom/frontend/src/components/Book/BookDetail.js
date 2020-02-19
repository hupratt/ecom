import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Button,
  Card,
  Container,
  Dimmer,
  Grid,
  Icon,
  Item,
  Loader,
  Message,
  Segment
} from "semantic-ui-react";
import { fetchCart } from "../../actions/cart";
import { s3_base_url } from "../../constants";
import { fetchBook } from "../../actions/book";

class BookDetail extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.bookID;
    this.props.fetchBook(id);
  }

  render() {
    const { book, error, loading, isAuthenticated } = this.props;

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
        <Grid divided>
          <Grid.Row>
            <Grid.Column>
              <div className="row">
                <Item.Image
                  className="col picture"
                  src={s3_base_url + book.isbn + ".jpg"}
                />
                <Card
                  fluid
                  className="col"
                  header={book.titre}
                  meta={
                    <React.Fragment>
                      <ul>Author: {book.auteur_nom}</ul>
                      <ul>Genre: {book.genre_nom}</ul>
                      <ul>{book.isbn}</ul>
                      <ul>{book.prix} €</ul>
                      <ul>{book.note} /5</ul>
                      <ul>Publication: {book.date_publication}</ul>
                      <ul>Stock: {book.quantite}</ul>
                      <ul>Language: {book.langue_nom}</ul>
                    </React.Fragment>
                  }
                  description={book.description}
                  extra={
                    <React.Fragment>
                      {book.genre_nom}
                      {book.prix}

                      <Button
                        fluid
                        color="yellow"
                        floated="right"
                        icon
                        labelPosition="right"
                        onClick={() =>
                          this.handleAddToCart(book.id, isAuthenticated)
                        }
                      >
                        Add to cart
                        <Icon name="cart plus" />
                      </Button>
                    </React.Fragment>
                  }
                />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    refreshCart: () => dispatch(fetchCart()),
    fetchBook: id => dispatch(fetchBook(id))
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.book.loading,
    error: state.book.error,
    book: state.book.data
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BookDetail)
);
