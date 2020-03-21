import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Grid, Icon, Item } from "semantic-ui-react";
import { s3_base_url } from "../../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as faStar0,
  faHeart
} from "@fortawesome/free-regular-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  faHome,
  faSearchPlus,
  faStar
} from "@fortawesome/free-solid-svg-icons";

const propTypes = {
  handleAddToCart: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const BookDetail = ({ handleAddToCart, book, isAuthenticated }) => {
  return (
    <div>
      {/* Product Shop Section Begin */}
      <React.Fragment>
        {book && (
          <section className="product-shop spad page-details">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="product-pic-zoom">
                        <img
                          className="product-big-img"
                          src={s3_base_url + book.isbn + ".jpg"}
                          alt=""
                        />
                        <div className="zoom-icon">
                          <FontAwesomeIcon icon={faSearchPlus} />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="product-details">
                        <div className="pd-title">
                          <span>{book.auteur_nom}</span>
                          <h3>{book.titre}</h3>
                          <a href="#" className="heart-icon">
                            <FontAwesomeIcon icon={faHeart} />
                          </a>
                        </div>
                        <div className="pd-rating">
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar0} />
                          <span>{book.note} </span>
                        </div>
                        <div className="pd-desc">
                          <p>{book.description}</p>
                          <h4>
                            {book.prix} €<span>629.99 €</span>
                          </h4>
                        </div>
                        <div className="pd-color">
                          <h6>Color</h6>
                          <div className="pd-color-choose">
                            <div className="cc-item">
                              <input type="radio" id="cc-black" />
                              <label htmlFor="cc-black" />
                            </div>
                            <div className="cc-item">
                              <input type="radio" id="cc-yellow" />
                              <label
                                htmlFor="cc-yellow"
                                className="cc-yellow"
                              />
                            </div>
                            <div className="cc-item">
                              <input type="radio" id="cc-violet" />
                              <label
                                htmlFor="cc-violet"
                                className="cc-violet"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="pd-size-choose">
                          <div className="sc-item">
                            <input type="radio" id="sm-size" />
                            <label htmlFor="sm-size">s</label>
                          </div>
                          <div className="sc-item">
                            <input type="radio" id="md-size" />
                            <label htmlFor="md-size">m</label>
                          </div>
                          <div className="sc-item">
                            <input type="radio" id="lg-size" />
                            <label htmlFor="lg-size">l</label>
                          </div>
                          <div className="sc-item">
                            <input type="radio" id="xl-size" />
                            <label htmlFor="xl-size">xs</label>
                          </div>
                        </div>
                        <div className="quantity">
                          <div className="pro-qty">
                            <input type="text" defaultValue={1} />
                          </div>
                          <a
                            href="#"
                            className="primary-btn pd-cart"
                            onClick={() =>
                              handleAddToCart(book.id, isAuthenticated)
                            }
                          >
                            Add To Cart
                          </a>
                        </div>
                        <ul className="pd-tags">
                          <li>
                            <span>CATEGORY</span>: {book.genre_nom}
                          </li>
                          <li>
                            <span>LANGUAGES</span>: {book.langue_nom}
                          </li>
                          <li>
                            <span>QUANTITY</span>: {book.quantite}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="product-tab">
                    <div className="tab-item">
                      <ul className="nav" role="tablist">
                        <li>
                          <a
                            className="active"
                            data-toggle="tab"
                            href="#tab-1"
                            role="tab"
                          >
                            DESCRIPTION
                          </a>
                        </li>
                        <li>
                          <a data-toggle="tab" href="#tab-2" role="tab">
                            SPECIFICATIONS
                          </a>
                        </li>
                        <li>
                          <a data-toggle="tab" href="#tab-3" role="tab">
                            Customer Reviews (02)
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="tab-item-content">
                      <div className="tab-content">
                        <div
                          className="tab-pane fade-in active"
                          id="tab-1"
                          role="tabpanel"
                        >
                          <div className="product-content">
                            <div className="row">
                              <div className="col-lg-7">
                                <h5>Introduction</h5>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipisicing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore magna aliqua.
                                  Ut enim ad minim veniam, quis nostrud
                                  exercitation ullamco laboris nisi ut aliquip
                                  ex ea commodo consequat. Duis aute irure dolor
                                  in{" "}
                                </p>
                                <h5>Features</h5>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipisicing elit, sed do eiusmod tempor
                                  incididunt ut labore et dolore magna aliqua.
                                  Ut enim ad minim veniam, quis nostrud
                                  exercitation ullamco laboris nisi ut aliquip
                                  ex ea commodo consequat. Duis aute irure dolor
                                  in{" "}
                                </p>
                              </div>
                              <div className="col-lg-5">
                                <img
                                  src="img/product-single/tab-desc.jpg"
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="tab-2"
                          role="tabpanel"
                        >
                          <div className="specification-table">
                            <table>
                              <tbody>
                                <tr>
                                  <td className="p-catagory">
                                    Customer Rating
                                  </td>
                                  <td>
                                    <div className="pd-rating">
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star" />
                                      <i className="fa fa-star-o" />
                                      <span>(5)</span>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-catagory">Price</td>
                                  <td>
                                    <div className="p-price">$495.00</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-catagory">Add To Cart</td>
                                  <td>
                                    <div className="cart-add">
                                      + add to cart
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-catagory">Availability</td>
                                  <td>
                                    <div className="p-stock">22 in stock</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-catagory">Weight</td>
                                  <td>
                                    <div className="p-weight">1,3kg</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-catagory">Size</td>
                                  <td>
                                    <div className="p-size">Xxl</div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-catagory">Color</td>
                                  <td>
                                    <span className="cs-color" />
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-catagory">Sku</td>
                                  <td>
                                    <div className="p-code">00012</div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div
                          className="tab-pane fade"
                          id="tab-3"
                          role="tabpanel"
                        >
                          <div className="customer-review-option">
                            <h4>2 Comments</h4>
                            <div className="comment-option">
                              <div className="co-item">
                                <div className="avatar-pic">
                                  <img
                                    src="img/product-single/avatar-1.png"
                                    alt=""
                                  />
                                </div>
                                <div className="avatar-text">
                                  <div className="at-rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-o" />
                                  </div>
                                  <h5>
                                    Brandon Kelley <span>27 Aug 2019</span>
                                  </h5>
                                  <div className="at-reply">Nice !</div>
                                </div>
                              </div>
                              <div className="co-item">
                                <div className="avatar-pic">
                                  <img
                                    src="img/product-single/avatar-2.png"
                                    alt=""
                                  />
                                </div>
                                <div className="avatar-text">
                                  <div className="at-rating">
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star" />
                                    <i className="fa fa-star-o" />
                                  </div>
                                  <h5>
                                    Roy Banks <span>27 Aug 2019</span>
                                  </h5>
                                  <div className="at-reply">Nice !</div>
                                </div>
                              </div>
                            </div>
                            <div className="personal-rating">
                              <h6>Your Ratind</h6>
                              <div className="rating">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star-o" />
                              </div>
                            </div>
                            <div className="leave-comment">
                              <h4>Leave A Comment</h4>
                              <form action="#" className="comment-form">
                                <div className="row">
                                  <div className="col-lg-6">
                                    <input type="text" placeholder="Name" />
                                  </div>
                                  <div className="col-lg-6">
                                    <input type="text" placeholder="Email" />
                                  </div>
                                  <div className="col-lg-12">
                                    <textarea
                                      placeholder="Messages"
                                      defaultValue={""}
                                    />
                                    <button type="submit" className="site-btn">
                                      Send message
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </React.Fragment>
    </div>

    // <React.Fragment>
    //   {book && (
    //     <Grid divided>
    //       <Grid.Row>
    //         <Grid.Column>
    //           <div className="row">
    //             <Item.Image
    //               className="col picture"
    //               src={s3_base_url + book.isbn + ".jpg"}
    //             />
    //             <Card
    //               fluid
    //               className="col"
    //               header={book.titre}
    //               meta={
    //                 <React.Fragment>
    //                   <ul>Author: {book.auteur_nom}</ul>
    //                   <ul>Genre: {book.genre_nom}</ul>
    //                   <ul>{book.isbn}</ul>
    //                   <ul>{book.prix} €</ul>
    //                   <ul>{book.note} /5</ul>
    //                   <ul>Publication: {book.date_publication}</ul>
    //                   <ul>Stock: {book.quantite}</ul>
    //                   <ul>Language: {book.langue_nom}</ul>
    //                 </React.Fragment>
    //               }
    //               description={book.description}
    //               extra={
    //                 <React.Fragment>
    //                   {book.genre_nom}
    //                   {book.prix}

    //                   <Button
    //                     fluid
    //                     color="yellow"
    //                     floated="right"
    //                     icon
    //                     labelPosition="right"
    //                     onClick={() =>
    //                       handleAddToCart(book.id, isAuthenticated)
    //                     }
    //                   >
    //                     Add to cart
    //                     <Icon name="cart plus" />
    //                   </Button>
    //                 </React.Fragment>
    //               }
    //             />
    //           </div>
    //         </Grid.Column>
    //       </Grid.Row>
    //     </Grid>
    //   )}
    // </React.Fragment>
  );
};

BookDetail.propTypes = propTypes;

export default BookDetail;
