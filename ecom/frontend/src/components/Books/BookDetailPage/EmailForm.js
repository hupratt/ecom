import React from "react";
import { Message } from "semantic-ui-react";
import { send } from "emailjs-com";
import { Trans } from "react-i18next";
import FormExampleFieldControlId from "./SemanticForm";
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message_html: "",
      // email: "lapetiteportugaise.bxl@gmail.com",
      email: "cortohprattdo@gmail.com",
      success: null,
      error: null,
      showForm: false,
      email_client: "",
      name_client: "",
    };
  }

  handleChangeTextArea = (event) => {
    this.setState({ message_html: event.target.value });
  };
  handleChangeEmail = (event) => {
    this.setState({ email_client: event.target.value });
  };
  handleChangeName = (event) => {
    this.setState({ name_client: event.target.value });
  };

  handleSubmit = (event) => {
    const templateId = "template_9gmUuqgs";
    const { message_html, email_client, name_client, email } = this.state;
    const { isbn } = this.props;
    this.sendFeedback(templateId, {
      message_html,
      email_client,
      name_client,
      email,
      isbn,
    });
  };

  showEmailForm = () => {
    this.setState({ showForm: true });
  };

  sendFeedback = (templateId, variables) => {
    const userId = "user_mQ8MeAwQ0zwwc5ftEn2LO";
    if (
      variables.message_html.length > 0 ||
      variables.email_client.length > 0
    ) {
      send("default_service", templateId, variables, userId)
        .then((res) => {
          this.setState({ success: `Email successfully sent!` });
        })
        .catch((err) => {
          this.setState({
            error: `The email could not be sent: ${err.text}`,
          });
        });
    } else {
      this.setState({
        error: "No message",
      });
    }
  };
  render() {
    const { success, error, showForm, message_html } = this.state;
    const { placeholder } = this.props;

    return (
      <React.Fragment>
        {success && (
          <Message
            positive
            header={success}
            content="Thank you for your message. We will reply as soon as possible"
          />
        )}
        {error && (
          <Message
            error
            header="There was an error"
            content={JSON.stringify(`${error}. Our teams are looking into it`)}
          />
        )}

        {showForm == false ? (
          <div className="email">
            <a
              href="#"
              className="primary-btn"
              onClick={() => this.showEmailForm()}
            >
              <Trans i18nKey="Email Us" />
            </a>
          </div>
        ) : (
          <FormExampleFieldControlId
            handleSubmit={this.handleSubmit}
            handleTextAreaChange={this.handleChangeTextArea}
            handleChangeEmail={this.handleChangeEmail}
            handleChangeName={this.handleChangeName}
            message_html={message_html}
            placeholder={placeholder}
          />
        )}
      </React.Fragment>
    );
  }
}
