import React from "react";
import { Message } from "semantic-ui-react";
import { send } from "emailjs-com";
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: "",
      email: "lapetiteportugaise.bxl@gmail.com",
      success: undefined,
      error: undefined,
      showForm: false
    };
  }

  handleChange = event => {
    this.setState({ feedback: event.target.value });
  };

  handleSubmit = event => {
    const templateId = "template_9gmUuqgs";

    this.sendFeedback(templateId, {
      message_html: this.state.feedback,
      email: this.state.email,
      isbn: this.props.isbn
    });
  };

  showEmailForm = () => {
    this.setState({ showForm: true });
  };

  sendFeedback = (templateId, variables) => {
    const userId = "user_mQ8MeAwQ0zwwc5ftEn2LO";
    if (variables.message_html.length > 0) {
      send("default_service", templateId, variables, userId)
        .then(res => {
          this.setState({ success: `Email successfully sent!` });
        })
        .catch(err => {
          this.setState({
            error: `The email could not be sent: ${err.text}`
          });
        });
    } else {
      this.setState({
        error: "No message"
      });
    }
  };
  render() {
    const { success, error, showForm, feedback } = this.state;
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
              Email Us
            </a>
          </div>
        ) : (
          <form className="mailing">
            <div>
              <textarea
                id="mailing"
                name="mailing"
                onChange={this.handleChange}
                placeholder="Would you like to buy this book?"
                required
                value={feedback}
                style={{ width: "100%", height: "150px" }}
              />
            </div>

            <div className="email">
              <a className="primary-btn" href="#" onClick={this.handleSubmit}>
                Submit
              </a>
            </div>
          </form>
        )}
      </React.Fragment>
    );
  }
}
