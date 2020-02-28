import React from "react";

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

export default RadioButton;
