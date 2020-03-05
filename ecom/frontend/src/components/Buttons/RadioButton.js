import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  handleChange: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
};
const RadioButton = ({ handleChange, language, value, id }) => {
  return (
    <li>
      <label>
        <input
          id={id}
          type="radio"
          value={value}
          checked={language === value}
          onChange={handleChange}
        />
        {value}
      </label>
    </li>
  );
};

RadioButton.propTypes = propTypes;

export default RadioButton;
