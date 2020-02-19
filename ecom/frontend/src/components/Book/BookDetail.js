import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import {
  Button,
  Card,
  Container,
  Dimmer,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  Label,
  Loader,
  Message,
  Segment,
  Select,
  Divider
} from "semantic-ui-react";
import { bookDetailURL, addToCartURL } from "../../constants";
import { fetchCart } from "../../actions/cart";
import { s3_base_url } from "../../constants";
class BookDetail extends React.Component {
  state = {
    loading: false,
    error: null,
    formVisible: false,
    data: [],
    formData: {}
  };

  componentDidMount() {
    this.handleFetchItem();
  }

  handleFetchItem = () => {
    const {
      match: { params }
    } = this.props;
    this.setState({ loading: true });
    axios
      .get(bookDetailURL(params.bookID))
      .then(res => {
        this.setState({ data: res.data, loading: false });
      })
      .catch(err => {
        this.setState({ error: err, loading: false });
      });
  };

  handleAddToCart = (id, isAuthenticated) => {
    this.setState({ loading: true });
    if (localStorage.getItem("token") !== null && isAuthenticated) {
      this.props.refreshCart();
      axios
        .post(addToCartURL, { id })
        .then(res => {
          this.props.refreshCart();
          this.setState({ loading: false });
        })
        .catch(err => {
          this.setState({ error: err, loading: false });
        });
    } else {
      this.setState({
        error: "Please register in order to purchase the book",
        loading: false
      });
    }
  };

  handleChange = (e, { name, value }) => {
    const { formData } = this.state;
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    this.setState({ formData: updatedFormData });
  };

  render() {
    const { data, error, loading } = this.state;
    const { isAuthenticated } = this.props;
    const item = data;
    return (
      <Container>
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
            <Image src="/images/wireframe/short-paragraph.png" />
          </Segment>
        )}
        <Grid divided>
          <Grid.Row>
            <Grid.Column>
              <div className="row">
                <Item.Image
                  className="col picture"
                  src={s3_base_url + item.isbn + ".jpg"}
                />
                <Card
                  fluid
                  className="col"
                  header={item.titre}
                  meta={
                    <React.Fragment>
                      <ul>Author: {item.auteur_nom}</ul>
                      <ul>Genre: {item.genre_nom}</ul>
                      <ul>{item.isbn}</ul>
                      <ul>{item.prix} €</ul>
                      <ul>{item.note} /5</ul>
                      <ul>Publication: {item.date_publication}</ul>
                      <ul>Stock: {item.quantite}</ul>
                      <ul>Language: {item.langue_nom}</ul>
                    </React.Fragment>
                  }
                  description={item.description}
                  extra={
                    <React.Fragment>
                      {item.genre_nom}
                      {item.prix}

                      <Button
                        fluid
                        color="yellow"
                        floated="right"
                        icon
                        labelPosition="right"
                        onClick={() =>
                          this.handleAddToCart(item.id, isAuthenticated)
                        }
                      >
                        Add to cart
                        <Icon name="cart plus" />
                      </Button>
                    </React.Fragment>
                  }
                />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    refreshCart: () => dispatch(fetchCart())
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BookDetail)
);
