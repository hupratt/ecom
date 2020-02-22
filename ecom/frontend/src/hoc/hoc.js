import React from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

export const Hoc = props => props.children;

export const withLoading = WrappedComponent => {
  class HOC extends React.Component {
    render() {
      const { loading } = this.props;
      console.log(this.props);
      console.log(loading);
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
