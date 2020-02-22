import React from "react";
import { Grid, Item } from "semantic-ui-react";
import { s3_base_url } from "../../constants";

const BookGrid = ({ paginatedData }) => {
  return (
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
                  onClick={() => this.props.history.push(`/books/${item.id}`)}
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
  );
};

export default BookGrid;
