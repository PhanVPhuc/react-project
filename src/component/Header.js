import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const auth = JSON.parse(localStorage.getItem("Auth"));
  const token = JSON.parse(localStorage.getItem("Token"));
  const flag = JSON.parse(localStorage.getItem("Flag"));
  const navigate = useNavigate();
  function handleLogout() {
    // console.log(auth);
    // console.log(token);
    // console.log(flag);

    if (flag) {
      return (
        <a onClick={logout} id="cart">
          <i className="fa fa-lock" /> Logout
        </a>
      );
    } else {
      return (
        <Link to="/login" id="cart">
          <i className="fa fa-lock" /> Login
        </Link>
      );
    }
  }

  function logout() {
    //remove local

    localStorage.removeItem("Auth");
    localStorage.removeItem("Token");
    localStorage.removeItem("Flag");
    navigate("/login");
  }

  return (
    <header id="header">
      {/*header*/}
      <div className="header_top">
        {/*header_top*/}
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <div className="contactinfo">
                <ul className="nav nav-pills">
                  <li>
                    <a href="#">
                      <i className="fa fa-phone" /> +2 95 01 88 821
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-envelope" /> info@domain.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="social-icons pull-right">
                <ul className="nav navbar-nav">
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-linkedin" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-dribbble" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-google-plus" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*/header_top*/}
      <div className="header-middle">
        {/*header-middle*/}
        <div className="container">
          <div className="row">
            <div className="col-md-4 clearfix">
              <div className="logo pull-left">
                <a href="index.html">
                  <img src="frontend/images/home/logo.png" alt="" />
                </a>
              </div>
              <div className="btn-group pull-right clearfix">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-default dropdown-toggle usa"
                    data-toggle="dropdown"
                  >
                    USA
                    <span className="caret" />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a href>Canada</a>
                    </li>
                    <li>
                      <a href>UK</a>
                    </li>
                  </ul>
                </div>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-default dropdown-toggle usa"
                    data-toggle="dropdown"
                  >
                    DOLLAR
                    <span className="caret" />
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a href>Canadian Dollar</a>
                    </li>
                    <li>
                      <a href>Pound</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-8 clearfix">
              <div className="shop-menu clearfix pull-right">
                <ul className="nav navbar-nav">
                  <li>
                    <Link to="/account">
                      <i className="fa fa-user" /> Account
                    </Link>
                  </li>
                  <li>
                    <a href>
                      <i className="fa fa-star" /> Wishlist
                    </a>
                  </li>
                  <li>
                    <Link to="/check-out">
                      <i className="fa fa-crosshairs" /> Checkout
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart">
                      <i className="fa fa-shopping-cart" /> Cart
                    </Link>
                  </li>
                  <li>
                    {/* HELP Me
                    
                    
                    
                    
                    
                    */}
                    {/* <Link to="/login">
                      <i className="fa fa-lock" /> Login
                    </Link> */}
                    {handleLogout()}
                    {/* 
                    
                    


                    
                    help me 
                    */}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*/header-middle*/}
      <div className="header-bottom">
        {/*header-bottom*/}
        <div className="container">
          <div className="row">
            <div className="col-sm-9">
              <div className="navbar-header">
                <button
                  type="button"
                  className="navbar-toggle"
                  data-toggle="collapse"
                  data-target=".navbar-collapse"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                  <span className="icon-bar" />
                </button>
              </div>
              <div className="mainmenu pull-left">
                <ul className="nav navbar-nav collapse navbar-collapse">
                  <li>
                    <Link to="/" className="active">
                      Home
                    </Link>
                  </li>
                  <li className="dropdown">
                    <Link to="#">
                      Shop
                      <i className="fa fa-angle-down" />
                    </Link>
                    <ul role="menu" className="sub-menu">
                      <li>
                        <Link to="/shop">Products</Link>
                      </li>
                      <li>
                        <Link to="/product-details">Product Details</Link>
                      </li>
                      <li>
                        <Link to="/check-out">Checkout</Link>
                      </li>
                      <li>
                        <Link to="/cart">Cart</Link>
                      </li>
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown">
                    <Link to="/Blog">
                      Blog
                      <i className="fa fa-angle-down" />
                    </Link>
                    <ul role="menu" className="sub-menu">
                      <li>
                        <Link to="/Blog">Blog List</Link>
                      </li>
                      <li>
                        <Link to="/blog-single">Blog Single</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link to="/404">404</Link>
                  </li>
                  <li>
                    <Link to="/contact-us">Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="search_box pull-right">
                <input type="text" placeholder="Search" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*/header-bottom*/}
      <section id="slider">
        {/*slider*/}
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div
                id="slider-carousel"
                className="carousel slide"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#slider-carousel"
                    data-slide-to={0}
                    className="active"
                  />
                  <li data-target="#slider-carousel" data-slide-to={1} />
                  <li data-target="#slider-carousel" data-slide-to={2} />
                </ol>
                <div className="carousel-inner">
                  <div className="item active">
                    <div className="col-sm-6">
                      <h1>
                        <span>E</span>-SHOPPER
                      </h1>
                      <h2>Free E-Commerce Template</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <button type="button" className="btn btn-default get">
                        Get it now
                      </button>
                    </div>
                    <div className="col-sm-6">
                      <img
                        src="images/home/girl1.jpg"
                        className="girl img-responsive"
                        alt=""
                      />
                      <img
                        src="images/home/pricing.png"
                        className="pricing"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="item">
                    <div className="col-sm-6">
                      <h1>
                        <span>E</span>-SHOPPER
                      </h1>
                      <h2>100% Responsive Design</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <button type="button" className="btn btn-default get">
                        Get it now
                      </button>
                    </div>
                    <div className="col-sm-6">
                      <img
                        src="images/home/girl2.jpg"
                        className="girl img-responsive"
                        alt=""
                      />
                      <img
                        src="images/home/pricing.png"
                        className="pricing"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="item">
                    <div className="col-sm-6">
                      <h1>
                        <span>E</span>-SHOPPER
                      </h1>
                      <h2>Free Ecommerce Template</h2>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                      </p>
                      <button type="button" className="btn btn-default get">
                        Get it now
                      </button>
                    </div>
                    <div className="col-sm-6">
                      <img
                        src="images/home/girl3.jpg"
                        className="girl img-responsive"
                        alt=""
                      />
                      <img
                        src="images/home/pricing.png"
                        className="pricing"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <a
                  href="#slider-carousel"
                  className="left control-carousel hidden-xs"
                  data-slide="prev"
                >
                  <i className="fa fa-angle-left" />
                </a>
                <a
                  href="#slider-carousel"
                  className="right control-carousel hidden-xs"
                  data-slide="next"
                >
                  <i className="fa fa-angle-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>

    // {/*/header*/}
  );
}

export default Header;
