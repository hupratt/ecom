// StripeForm.js
import React from "react";
import { injectStripe } from "react-stripe-elements";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "react-stripe-elements";

import { Button } from "semantic-ui-react";

class StripeForm extends React.Component {
  render() {
    return (
      <form>
        <CardNumberElement style={{ base: { fontSize: "18px" } }} />
        <CardExpiryElement style={{ base: { fontSize: "18px" } }} />
        <CardCvcElement style={{ base: { fontSize: "18px" } }} />

        <Button
          loading={this.props.loading}
          disabled={this.props.loading}
          primary
          onClick={this.props.submit}
          style={{ marginTop: "10px" }}
        >
          Submit
        </Button>
      </form>
    );
  }
}

export default injectStripe(StripeForm);
