import React from "react";
import { Dimmer, Loader, Segment, Message } from "semantic-ui-react";

export const Hoc = props => props.children;

export const withLoading = WrappedComponent => {
  class HOC extends React.Component {
    render() {
      const { loading } = this.props;
      if (loading) {
        return (
          <Segment>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          </Segment>
        );
      }
      return <WrappedComponent {...this.props} />;
    }
  }
  return HOC;
};

export const withError = WrappedComponent => {
  class HOC extends React.Component {
    render() {
      const { error, errorCart } = this.props;
      if (error) {
        return (
          <React.Fragment>
            <Message
              error
              header="There was some errors with your submission"
              content={JSON.stringify(error)}
            />
            <WrappedComponent {...this.props} />
          </React.Fragment>
        );
      }
      if (errorCart) {
        return (
          <React.Fragment>
            <Message
              error
              header="There was some errors with your submission"
              content={JSON.stringify(errorCart)}
            />
            <WrappedComponent {...this.props} />
          </React.Fragment>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  }
  return HOC;
};
