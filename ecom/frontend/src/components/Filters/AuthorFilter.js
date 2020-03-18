import React from "react";
import { Form, Checkbox } from "semantic-ui-react";

const AuthorFilter = ({ onSelectAuthor }) => {
  return (
    <Form className="author-checkbox">
      <div className="filter-title">Author</div>
      <ul>
        <Checkbox label="Fernando Pessoa" onChange={onSelectAuthor} />
        <Checkbox label="José Saramago" onChange={onSelectAuthor} />
        <Checkbox label="Eça de Queirós" onChange={onSelectAuthor} />
        <Checkbox label="Gonçalo M. Tavares" onChange={onSelectAuthor} />
        <Checkbox label="Sophia de Mello Breyner" onChange={onSelectAuthor} />
        <Checkbox label="Mia Couto" onChange={onSelectAuthor} />
        <Checkbox label="Miguel Torga" onChange={onSelectAuthor} />
      </ul>
    </Form>
  );
};

export default AuthorFilter;
