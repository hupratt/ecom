import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Button,
  Card,
  Container,
  Dimmer,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  Loader,
  Message,
  Segment,
  Select,
  Divider
} from "semantic-ui-react";
import { bookDetailURL, addToCartURL } from "../../constants";
import { fetchCart } from "../../actions/cart";
import { s3_base_url } from "../../constants";
import { fetchBook } from "../../actions/book";

class BookDetail extends React.Component {
  componentDidMount() {
    let id = this.props.match.params.bookID;
    this.props.fetchBook(id);
  }

  render() {
    const { data, error, loading, isAuthenticated } = this.props;

    const item = data;
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
                  src={s3_base_url + item.isbn + ".jpg"}
                />
                <Card
                  fluid
                  className="col"
                  header={item.titre}
                  meta={
                    <React.Fragment>
                      <ul>Author: {item.auteur_nom}</ul>
                      <ul>Genre: {item.genre_nom}</ul>
                      <ul>{item.isbn}</ul>
                      <ul>{item.prix} €</ul>
                      <ul>{item.note} /5</ul>
                      <ul>Publication: {item.date_publication}</ul>
                      <ul>Stock: {item.quantite}</ul>
                      <ul>Language: {item.langue_nom}</ul>
                    </React.Fragment>
                  }
                  description={item.description}
                  extra={
                    <React.Fragment>
                      {item.genre_nom}
                      {item.prix}

                      <Button
                        fluid
                        color="yellow"
                        floated="right"
                        icon
                        labelPosition="right"
                        onClick={() =>
                          this.handleAddToCart(item.id, isAuthenticated)
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
    data: state.book.data
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BookDetail)
);
