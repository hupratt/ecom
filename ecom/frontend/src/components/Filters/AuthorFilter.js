import React from "react";
import { Form, Checkbox } from "semantic-ui-react";

const AuthorFilter = ({ onSelectAuthor, authors }) => {
  return (
    <React.Fragment>
      {authors && (
        <Form className="author-checkbox">
          <div className="filter-title">Author</div>
          <ul>
            <Checkbox
              label="Fernando Pessoa"
              onChange={onSelectAuthor}
              checked={authors.get("Fernando Pessoa")}
            />
            <Checkbox
              label="José Saramago"
              onChange={onSelectAuthor}
              checked={authors.get("José Saramago")}
            />
            <Checkbox
              label="Eça de Queirós"
              onChange={onSelectAuthor}
              checked={authors.get("Eça de Queirós")}
            />
            <Checkbox
              label="Gonçalo M. Tavares"
              onChange={onSelectAuthor}
              checked={authors.get("Gonçalo M. Tavares")}
            />
            <Checkbox
              label="Sophia de Mello Breyner"
              onChange={onSelectAuthor}
              checked={authors.get("Sophia de Mello Breyner")}
            />
          </ul>
        </Form>
      )}
    </React.Fragment>
  );
};

export default AuthorFilter;
