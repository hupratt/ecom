import React, { Component } from "react";
import { Message } from "semantic-ui-react";

class Toast extends Component {
  state = { visible: true };

  handleDismiss = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.visible && (
          <Message
            error={this.props.error}
            onDismiss={this.handleDismiss}
            header={this.props.header}
            content={this.props.content}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Toast;
