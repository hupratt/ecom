import React from "react";
import { Form, Input, TextArea, Button, Select } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

const genderOptions = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
];

const FormExampleFieldControlId = ({
  handleSubmit,
  handleTextAreaChange,
  message_html,
  placeholder,
  handleChangeEmail,
  handleChangeName,
}) => {
  const { t } = useTranslation();
  return (
    <Form id="form-email">
      <Form.Group widths="equal">
        <Form.Field
          id="form-input-control-first-name"
          control={Input}
          label={t("Name")}
          placeholder={t("Name")}
          onChange={handleChangeName}
        />
        <Form.Field
          id="form-input-control-error-email"
          control={Input}
          label={t("Email")}
          placeholder="your@email.com"
          onChange={handleChangeEmail}
          required
        />
      </Form.Group>

      <Form.Field
        id="form-textarea-control-textarea"
        control={TextArea}
        label={t("Message")}
        placeholder={placeholder}
        id="mailing"
        name="mailing"
        onChange={handleTextAreaChange}
        required
        value={message_html}
      />
      <div className="email">
        <a className="primary-btn" href="#" onClick={handleSubmit}>
          {t("Submit")}
        </a>
      </div>
    </Form>
  );
};

export default FormExampleFieldControlId;
