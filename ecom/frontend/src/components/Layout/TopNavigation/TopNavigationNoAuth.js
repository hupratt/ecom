import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const TopNavigationNoAuth = () => {
  return (
    <div>
      {/* Header Section Begin */}
      <header className="header-section">
        <div className="container">
          <div className="inner-header">
            <div className="row">
              <div className="col-lg-2 col-md-2">
                <div className="logo">
                  <Link to="/">
                    <img
                      src="https://bookshop-images-f1492f08-f236-4a55-afb7-70ded209cb24.s3.eu-west-2.amazonaws.com/resources/logo-petite-portugaise-300.png"
                      alt="la petite portugaise's logo"
                    />
                  </Link>
                </div>
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
                  <li className="heart-icon">
                    <a href="#">
                      <i className="icon_heart_alt" />
                      <span>1</span>
                    </a>
                  </li>
                  <li className="cart-icon">
                    <a href="#">
                      <i className="icon_bag_alt" />
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
    </div> // <Menu.Menu position="left" onClick={() => window.location.reload()}>
    //   <Link to="/">
    //     <Menu.Item header>Home</Menu.Item>
    //   </Link>
    // </Menu.Menu>
    // <React.Fragment>
    //   <Menu.Menu position="right">
    //     <Link to="/login">
    //       <Menu.Item header>Login</Menu.Item>
    //     </Link>
    //     <Link to="/signup">
    //       <Menu.Item header>Signup</Menu.Item>
    //     </Link>
    //   </Menu.Menu>
    // </React.Fragment>
  );
};

export default TopNavigationNoAuth;
