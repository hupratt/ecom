import React from "react";
import { Form, Checkbox } from "semantic-ui-react";

const AuthorFilter = () => {
  return (
    <Form className="author-checkbox">
      <div className="filter-title">Author</div>
      <ul>
        <Checkbox label="Author 1" checked />
        <Checkbox label="Author 2" />
        <Checkbox label="Author 3" />
      </ul>
    </Form>
  );
};

export default AuthorFilter;
