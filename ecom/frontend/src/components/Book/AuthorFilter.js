import React from "react";
import { Form, Checkbox } from "semantic-ui-react";

const AuthorFilter = () => {
  return (
    <Form className="author-checkbox">
      <div className="h4">Author</div>
      <ul>
        <Checkbox label="Make my profile visible" checked />
        <Checkbox label="Make my profile visible" />
        <Checkbox label="Make my profile visible" />
      </ul>
    </Form>
  );
};

export default AuthorFilter;
