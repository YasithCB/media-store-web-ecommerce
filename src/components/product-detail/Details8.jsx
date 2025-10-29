import React from "react";
import Slider8 from "./sliders/Slider8";
import { Link } from "react-router-dom";
import {Truck} from "lucide-react";

export default function Details8({postDetails}) {
  return (
    <section>
      <div className="tf-main-product section-image-zoom">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              {/* Product Image */}
              <div className="tf-product-media-wrap thumbs-default sticky-top">
                <div className="thumbs-slider">
                  <Slider8 imgList={postDetails.photos}/>
                </div>
              </div>
              {/* /Product Image */}
            </div>
            <div className="col-md-6">
              {/* Product Infor */}
              <div className="tf-product-info-wrap position-relative">
                <div className="tf-zoom-main" />
                <div className="tf-product-info-list other-image-zoom flex-xxl-nowrap">
                  <div className="tf-product-info-content">
                    <div className="infor-heading">
                      <p className="caption">
                        <Link
                          to={`/shop-default`}
                          className="link text-secondary"
                        >
                            {`${postDetails.category_title}> ${postDetails.sub_category_title}`}
                        </Link>
                      </p>
                      <h5 className="product-info-name fw-semibold">
                          {postDetails.title}
                      </h5>
                      <ul className="product-info-rate-wrap">
                        <li className="star-review">
                          <ul className="list-star">
                            <li>
                              <i className="icon-star" />
                            </li>
                            <li>
                              <i className="icon-star" />
                            </li>
                            <li>
                              <i className="icon-star" />
                            </li>
                            <li>
                              <i className="icon-star" />
                            </li>
                            <li>
                              <i className="icon-star text-main-4" />
                            </li>
                          </ul>
                          <p className="caption text-main-2">Reviews (1.738)</p>
                        </li>
                        <li>
                          <p className="caption text-main-2">Sold: 349</p>
                        </li>
                        <li className="d-flex">
                          <Link
                            to={`/shop-default`}
                            className="caption text-secondary link"
                          >
                            View shop
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="infor-center">
                        {postDetails.sale_price != null ?
                            <div className="product-info-price">
                                <h4 className="text-third">AED {postDetails.sale_price}</h4>
                                <span className="price-text text-main-2 old-price">
                                  AED {postDetails.price}
                                </span>
                            </div>
                            :
                            <div className="product-info-price">
                                <h4 className="text-third">AED {postDetails.price}</h4>
                            </div>
                        }
                      <ul className="product-fearture-list">
                        <li>
                          <p className="body-md-2 fw-semibold">Brand</p>
                          <span className="body-text-3">{postDetails.brand}</span>
                        </li>
                        <li>
                          <p className="body-md-2 fw-semibold">Model</p>
                          <span className="body-text-3">{postDetails.model}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="infor-bottom">
                      <h6 className="fw-semibold">About this item</h6>
                        <p className="body-text-3">
                            {postDetails.description}
                        </p>
                    </div>
                  </div>
                  <div className="tf-product-info-choose-option sticky-top">
                    <div className="product-delivery">
                      <p className="price-text fw-medium text-third">
                        AED 25.00
                      </p>
                      <p>
                          <Truck size={20} />
                          {" "}Free shipping
                      </p>
                      <div className="shipping-to">
                        <p className="body-md-2">Shipping to:</p>
                        <div className="tf-cur">
                          <div className="tf-cur-item">
                            <select className="select-default cs-pointer fw-semibold body-md-2">
                              <option>Metro Manila</option>
                              <option>Metro Manila</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="product-quantity">
                      <p className="title body-text-3">Quantity</p>
                      <div className="wg-quantity">
                        <button className="btn-quantity btn-decrease">
                          <i className="icon-minus" />
                        </button>
                        <input
                          className="quantity-product"
                          type="text"
                          name="number"
                          defaultValue={1}
                        />
                        <button className="btn-quantity btn-increase">
                          <i className="icon-plus" />
                        </button>
                      </div>
                    </div>

                    <div className="product-box-btn">
                      <a
                        href="#shoppingCart"
                        data-bs-toggle="offcanvas"
                        className="tf-btn-primary"
                      >
                        Add to cart
                        <i className="icon-cart-2" />
                      </a>
                      <Link
                        to={`/shop-cart`}
                        className="tf-btn-dark"
                      >
                        Buy now
                      </Link>
                    </div>
                    <div className="product-detail">
                      <p className="caption">Details</p>
                      <p className="body-text-3">
                        <span>
                          Return policy: Eligible for Return, Refund or
                          Replacement within 30 days of receipt
                        </span>
                        <span>Support: Free Amazon tech support included</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* /Product Infor */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
