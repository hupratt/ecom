import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Grid, Icon, Item } from "semantic-ui-react";
import { s3_base_url } from "../../../constants";

const propTypes = {
  handleAddToCart: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const BookDetail = ({ handleAddToCart, book, isAuthenticated }) => {
  return (
    <React.Fragment>
      {book && (
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
                          handleAddToCart(book.id, isAuthenticated)
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
      )}
    </React.Fragment>
  );
};

BookDetail.propTypes = propTypes;

export default BookDetail;
