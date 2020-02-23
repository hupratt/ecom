import React from "react";
import { Grid, Item } from "semantic-ui-react";
import { s3_base_url } from "../../constants";

const BookGrid = ({ paginatedData, handleClickOnBook }) => {
  return (
    <Grid divided>
      <div className="row">
        {paginatedData.map(item => {
          return (
            <Item className="four wide column" key={item.id}>
              <Item.Image
                as="a"
                onClick={() => handleClickOnBook(item.id)}
                src={s3_base_url + item.isbn + ".jpg"}
              />
              <Item.Content className="book-list-meta">
                <Item.Meta>
                  <span>{item.genre_nom}</span>
                </Item.Meta>
                <Item.Header
                  className="title"
                  as="a"
                  onClick={() => handleClickOnBook}
                >
                  {item.titre}
                </Item.Header>

                <Item.Extra className="price">{item.prix} €</Item.Extra>
              </Item.Content>
            </Item>
          );
        })}
      </div>
    </Grid>
  );
};

export default BookGrid;
