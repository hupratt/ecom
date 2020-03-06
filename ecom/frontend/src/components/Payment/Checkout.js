import React, { Component } from "react";
import {
  CardElement,
  injectStripe,
  Elements,
  StripeProvider
} from "react-stripe-elements";
import {
  Button,
  Container,
  Dimmer,
  Divider,
  Header,
  Item,
  Label,
  Loader,
  Message,
  Segment,
  Select
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { s3_base_url, checkoutURL } from "../../constants";
import { connect } from "react-redux";
import {
  handleFetchOrder,
  handleFetchBillingAddresses,
  handleFetchShippingAddresses,
} from "../../actions/books";

const OrderPreview = ({ data }) => {
  return (
    <React.Fragment>
      {data && (
        <React.Fragment>
          <Item.Group relaxed>
            {data.order_items.map((orderItem, i) => {
              return (
                <Item key={i}>
                  <Item.Image
                    size="tiny"
                    src={`${s3_base_url}${orderItem.livre.isbn}.jpg`}
                  />
                  <Item.Content verticalAlign="middle">
                    <Item.Header as="a">
                      {orderItem.quantity} x {orderItem.livre.titre}
                    </Item.Header>
                    <Item.Extra>
                      <Label>${orderItem.livre.prix}</Label>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              );
            })}
          </Item.Group>

          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Header>
                  Order Total: ${data.total}
                  {data.coupon && (
                    <Label color="green" style={{ marginLeft: "10px" }}>
                      Current coupon: {data.coupon.code} for $
                      {data.coupon.amount}
                    </Label>
                  )}
                </Item.Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

class CheckoutForm extends Component {
  componentDidMount() {
    this.props.handleFetchOrder(this.props.history);
    this.props.handleFetchBillingAddresses();
    this.props.handleFetchShippingAddresses();
  }

  render() {
    const {
      data,
      error,
      loading,
      success,
      billingAddresses,
      shippingAddresses,
      selectedBillingAddress,
      selectedShippingAddress
    } = this.props;

    handleSelectChange = (e, { name, value }) => {
      this.setState({ [name]: value });
    };

    submit = ev => {
      ev.preventDefault();
      this.setState({ loading: true });
      if (this.props.stripe) {
        this.props.stripe.createToken().then(result => {
          if (result.error) {
            this.setState({ error: result.error.message, loading: false });
          } else {
            this.setState({ error: null });
            const { selectedBillingAddress, selectedShippingAddress } = this.props;
            axios
              .post(checkoutURL, {
                stripeToken: result.token.id,
                selectedBillingAddress: selectedBillingAddress,
                selectedShippingAddress: selectedShippingAddress
              })
              .then(res => {
                this.setState({ loading: false, success: true });
              })
              .catch(err => {
                this.setState({ loading: false, error: err });
              });
          }
        });
      } else {
        this.setState({ loading: false, error: "Stripe is not loaded" });
      }
    };
    
    return (
      <div>
        {error && (
          <Message
            error
            header="There was some errors with your submission"
            content={JSON.stringify(error)}
          />
        )}
        {loading && (
          <Segment>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          </Segment>
        )}

        <OrderPreview data={data} />
        <Divider />

        <Header>Select a shipping address</Header>
        {shippingAddresses.length > 0 ? (
          <Select
            name="selectedShippingAddress"
            value={selectedShippingAddress}
            clearable
            options={shippingAddresses}
            selection
            onChange={this.handleSelectChange}
          />
        ) : (
          <p>
            You need to <Link to="/profile">add a shipping address</Link>
          </p>
        )}
        <Header>Select a billing address</Header>
        {billingAddresses.length > 0 ? (
          <Select
            name="selectedBillingAddress"
            value={selectedBillingAddress}
            clearable
            options={billingAddresses}
            selection
            onChange={this.handleSelectChange}
          />
        ) : (
          <p>
            Add a billing address <Link to="/profile">here</Link>
          </p>
        )}
        <Divider />

        {shippingAddresses.length < 1 ? (
          <p>You need to add addresses before you can complete your purchase</p>
        ) : (
          <React.Fragment>
            <Header>Would you like to complete the purchase?</Header>
            <CardElement />
            {success && (
              <Message positive>
                <Message.Header>Your payment was successful</Message.Header>
                <p>
                  Go to your <b>profile</b> to see the order delivery status.
                </p>
              </Message>
            )}
            <Button
              loading={loading}
              disabled={loading}
              primary
              onClick={this.submit}
              style={{ marginTop: "10px" }}
            >
              Submit
            </Button>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submit: (e) => dispatch(submit(e)),
    handleSelectChange = (e, { name, value }) => dispatch(handleSelectChange((e, { name, value }))),
    handleFetchOrder: history => dispatch(handleFetchOrder(history)),
    handleFetchBillingAddresses: () => dispatch(handleFetchBillingAddresses),
    handleFetchShippingAddresses: () => dispatch(handleFetchShippingAddresses)
  };
};

const mapStateToProps = state => {
  return {
    data: state.checkout.data,
    loading: state.checkout.loading,
    error: state.checkout.error,
    success: state.checkout.success,
    shippingAddresses: state.checkout.shippingAddresses,
    billingAddresses: state.checkout.billingAddresses,
    selectedBillingAddress: state.checkout.selectedBillingAddress,
    selectedShippingAddress: state.checkout.selectedShippingAddress
  };
};

const CheckoutFormWithRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutForm);

const InjectedForm = withRouter(injectStripe(CheckoutFormWithRedux));

const WrappedForm = () => (
  <Container text>
    <StripeProvider apiKey="pk_test_eRajPaamV4LUIhBv3oFmauqn">
      <div>
        <h1>Complete your order</h1>
        <Elements>
          <InjectedForm />
        </Elements>
      </div>
    </StripeProvider>
  </Container>
);

export default WrappedForm;
