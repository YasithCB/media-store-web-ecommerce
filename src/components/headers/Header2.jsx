import React from "react";
import Nav from "./Nav";
import { EllipsisVertical, Star, User, ShoppingCart } from 'lucide-react';

import { Link } from "react-router-dom";

import CartLength from "../common/CartLength";
import CartTotal from "../common/CartTotal";
import WishlistLength from "../common/WishlistLength";
import NavCategories from "./NavCategories";
import SearchForm from "./SearchForm";

export default function Header2() {
  return (
    <header className="tf-header style-3">
      <div className="inner-header bg-primary">
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-7 d-flex align-items-center">
              <div className="logo-site">
                <Link to={`/`}>
                    <img
                        alt="Logo"
                        src="/images/logo/logo.webp"
                        className="logo-img"
                    />
                </Link>
              </div>
            </div>
            <div className="col-md-6 d-none d-md-block">
              <div className="header-center justify-content-center">
                <SearchForm parentClass="form-search-product style-3" />
                <p className="body-small text-main-2 d-none d-xl-block">
                  Start Your Brand With Us ! We Are Always Ready
                </p>
              </div>
            </div>
            <div className="col-md-3 col-5 d-flex align-items-center justify-content-end">
              <div className="header-right">
                <ul className="nav-icon style-3">
                  <li className="d-none d-xxl-block">
                    <Link to={`/wishlist`} className="nav-icon-item">
                      <span className="icon position-relative">
                        <i className="icon-hearth text-cl-4" />
                        <span className="count-box text-cl-4">
                          {" "}
                          <WishlistLength />
                        </span>
                      </span>
                      <div className="infor text-start">
                        <span className="body-text-3 text-main-2">
                          wishlist:
                        </span>
                        <h6 className="number-item fw-semibold text-cl-4">
                          4 item
                        </h6>
                      </div>
                    </Link>
                  </li>
                  <li className="d-none d-xl-block">
                    <Link
                      to="/shop-cart"
                      className="nav-icon-item"
                    >
                      <span className="icon position-relative">
                        <i className="icon-cart" />
                        <span className="count-box">
                          <CartLength />
                        </span>
                      </span>
                      <div className="infor text-start">
                        <span className="body-text-3 text-main-2">
                          Your cart:
                        </span>
                        <h6 className="number-item text-cl-4 fw-semibold">
                          <CartTotal />
                        </h6>
                      </div>
                    </Link>
                  </li>
                </ul>

                {/* MOBILE VIEW */}
                <ul className="nav-icon justify-content-xl-center d-xl-none">
                  <li className="nav-account">
                    <Link
                      to="/my-account"
                      className="link nav-icon-item"
                    >
                      <span>
                         <User />
                      </span>
                      <p className="body-small">Sign in</p>
                    </Link>
                  </li>

                    <li className="nav-cart">
                        <Link to="/wishlist" className="link nav-icon-item">
                            <span>
                              <Star />
                            </span>
                            <p className="body-small">Wishlist:</p>
                        </Link>
                    </li>


                    <li className="nav-cart">
                        <Link
                            to="/shop-cart"   // Fixed typo: shoppingCar → shoppingCart
                            className="link nav-icon-item"
                        >
                            <span>
                              <ShoppingCart />
                            </span>
                            <p className="body-small">Your cart:</p>
                        </Link>
                    </li>

                    <li className="d-flex align-items-center d-xl-none">
                        <a
                            href="#mobileMenu"
                            className="mobile-button"
                            data-bs-toggle="offcanvas"
                            aria-controls="mobileMenu"
                        >
                            <EllipsisVertical />
                        </a>
                    </li>

                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="header-bottom bg-dark d-none d-xl-block">
            <div className="container">
                <div className="header-bt-left active-container bg-dark relative">
            <NavCategories styleClass=" style-2 style-white" />
            <nav className="main-nav-menu">
              <ul className="nav-list">
                <Nav />
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
