import React from "react";
import { Form } from "semantic-ui-react";
import RadioButton from "../Layout/RadioButton";

const LanguageFilter = ({ language, onSelectRadio }) => {
  return (
    <Form className="radio">
      <div className="filter-title">Language</div>
      <ul>
        <RadioButton
          handleChange={onSelectRadio}
          language={language}
          value="PT"
          id="1"
        />
        <RadioButton
          handleChange={onSelectRadio}
          language={language}
          value="FR"
          id="2"
        />
        <RadioButton
          handleChange={onSelectRadio}
          language={language}
          value="EN"
          id="3"
        />
        <RadioButton
          handleChange={onSelectRadio}
          language={language}
          value="No filter"
          id="4"
        />
      </ul>
    </Form>
  );
};

export default LanguageFilter;
