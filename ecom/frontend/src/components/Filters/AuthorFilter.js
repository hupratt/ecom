import React from "react";
import { Form, Checkbox } from "semantic-ui-react";

const AuthorFilter = ({ onSelectAuthor, authorsQueryString }) => {
  return (
    <Form className="author-checkbox">
      <div className="filter-title">Author</div>
      <ul>
        <Checkbox
          label="Fernando Pessoa"
          onChange={onSelectAuthor}
          checked={authorsQueryString.includes("Fernando Pessoa")}
        />
        <Checkbox label="José Saramago" onChange={onSelectAuthor} />
        <Checkbox
          label="Eça de Queirós"
          onChange={onSelectAuthor}
          checked={authorsQueryString.includes("Eça de Queirós")}
        />
        <Checkbox label="Gonçalo M. Tavares" onChange={onSelectAuthor} />
        <Checkbox label="Sophia de Mello Breyner" onChange={onSelectAuthor} />
        <Checkbox label="Mia Couto" onChange={onSelectAuthor} />
        <Checkbox label="Miguel Torga" onChange={onSelectAuthor} />
      </ul>
    </Form>
  );
};

export default AuthorFilter;
