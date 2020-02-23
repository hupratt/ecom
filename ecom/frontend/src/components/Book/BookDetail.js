import React from "react";
import { Button, Card, Grid, Icon, Item } from "semantic-ui-react";
import { s3_base_url } from "../../constants";

const BookDetail = ({ handleAddToCart, book, isAuthenticated }) => {
  return (
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
                    onClick={() => handleAddToCart(book.id, isAuthenticated)}
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
  );
};

export default BookDetail;
