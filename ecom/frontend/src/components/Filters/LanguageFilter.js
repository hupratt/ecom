import React from "react";
import { Form } from "semantic-ui-react";
import RadioButton from "../Buttons/RadioButton";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const propTypes = {
  language: PropTypes.string.isRequired,
  onSelectRadio: PropTypes.func.isRequired
};

const LanguageFilter = ({ language, onSelectRadio }) => {
  return (
    <Form className="radio">
      <div className="filter-title">Language</div>
      <ul>
        <RadioButton
          handleChange={onSelectRadio}
          language={language}
          label="Portuguese"
          value="PT"
          id="1"
        />
        <RadioButton
          handleChange={onSelectRadio}
          language={language}
          label="French"
          value="FR"
          id="2"
        />
        <RadioButton
          handleChange={onSelectRadio}
          language={language}
          label="English"
          value="EN"
          id="3"
        />
        <RadioButton
          handleChange={onSelectRadio}
          language={language}
          value=""
          label="All"
          id="4"
        />
      </ul>
    </Form>
  );
};

LanguageFilter.propTypes = propTypes;

export default LanguageFilter;
