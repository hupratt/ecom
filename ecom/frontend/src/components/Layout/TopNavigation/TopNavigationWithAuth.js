import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUser } from "@fortawesome/free-regular-svg-icons";
import { faShoppingBag, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import CartDropDownNoItems from "./CartDropDownNoItems";
import CartDropDownWithItems from "./CartDropDownWithItems";
import { withItemsInTheCart } from "../../../hoc/hoc";
import { Dropdown, Menu } from "semantic-ui-react";

const propTypes = {
  cart: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

const TopNavigationWithAuth = ({ cart, loading, logout }) => {
  return (
    <div>
      {/* Header Section Begin */}
      <header className="header-section">
        <div className="container">
          <div className="inner-header">
            <div className="row">
              <div className="col-lg-2 col-md-2">
                <Link to="/">
                  <img
                    src="https://bookshop-images-f1492f08-f236-4a55-afb7-70ded209cb24.s3.eu-west-2.amazonaws.com/resources/logo-petite-portugaise-300.png"
                    alt="la petite portugaise's logo"
                  />
                </Link>
              </div>
              <div className="col-lg-7 col-md-7">
                <div className="advanced-search">
                  <button type="button" className="category-btn">
                    All Categories
                  </button>
                  <form action="#" className="input-group">
                    <input type="text" placeholder="What do you need?" />
                    <button type="button" className="search-button">
                      <span className="ti-search" />
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-lg-3 text-right col-md-3">
                <ul className="nav-right">
                  <Link to="/login">
                    <li className="user-icon">
                      <FontAwesomeIcon icon={faUser} /> <span></span>
                    </li>
                  </Link>
                  <Menu.Item onClick={() => logout()}>
                    <li className="user-icon">
                      <FontAwesomeIcon icon={faUserSlash} /> <span></span>
                    </li>
                  </Menu.Item>
                  <li className="heart-icon">
                    <a href="#">
                      <FontAwesomeIcon icon={faHeart} /> <span>1</span>
                    </a>
                  </li>
                  <li className="cart-icon">
                    <a href="#">
                      <FontAwesomeIcon icon={faShoppingBag} />
                      <span>{`${
                        cart !== null ? cart.order_items.length : 0
                      }`}</span>
                    </a>
                    <Dropdown loading={loading} className="link item">
                      <Dropdown.Menu>
                        <CartDropDownWithItemsAndNoItems cart={cart} />
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                  <li className="cart-icon">
                    <a href="#">
                      <FontAwesomeIcon icon={faShoppingBag} /> <span>1</span>
                      <span>3</span>
                    </a>
                    <div className="cart-hover">
                      <div className="select-items">
                        <table>
                          <tbody>
                            <tr>
                              <td className="si-pic">
                                <img src="img/select-product-1.jpg" alt="" />
                              </td>
                              <td className="si-text">
                                <div className="product-selected">
                                  <p>$60.00 x 1</p>
                                  <h6>Kabino Bedside Table</h6>
                                </div>
                              </td>
                              <td className="si-close">
                                <i className="ti-close" />
                              </td>
                            </tr>
                            <tr>
                              <td className="si-pic">
                                <img src="img/select-product-2.jpg" alt="" />
                              </td>
                              <td className="si-text">
                                <div className="product-selected">
                                  <p>$60.00 x 1</p>
                                  <h6>Kabino Bedside Table</h6>
                                </div>
                              </td>
                              <td className="si-close">
                                <i className="ti-close" />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="select-total">
                        <span>total:</span>
                        <h5>$120.00</h5>
                      </div>
                      <div className="select-button">
                        <a href="#" className="primary-btn view-card">
                          VIEW CARD
                        </a>
                        <a href="#" className="primary-btn checkout-btn">
                          CHECK OUT
                        </a>
                      </div>
                    </div>
                  </li>
                  <li className="cart-price">$150.00</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Header End */}
    </div>
  );
};

TopNavigationWithAuth.propTypes = propTypes;

export default TopNavigationWithAuth;

const CartDropDownWithItemsAndNoItems = withItemsInTheCart(
  CartDropDownWithItems,
  CartDropDownNoItems
);
