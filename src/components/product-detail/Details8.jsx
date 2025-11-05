import React from "react";
import Slider8 from "./sliders/Slider8";
import {Link} from "react-router-dom";
import {Truck} from "lucide-react";

export default function Details8({postDetails}) {
    return (
        <section>
            <div className="tf-main-product section-image-zoom mb-5 pb-5">
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
                                <div className="tf-zoom-main"/>
                                <div className="tf-product-info-list other-image-zoom flex-xxl-nowrap">
                                    <div className="tf-product-info-content">
                                        <div className="infor-heading">
                                            <p className="caption">
                                                <Link
                                                    to={`/shop-fullwidth`}
                                                    className="link text-secondary"
                                                >
                                                    {`${postDetails.category_title}> ${postDetails.subcategory_title}`}
                                                </Link>
                                            </p>
                                            <div className="position-relative d-inline-block">
                                                <h5 className="product-info-name fw-semibold mb-0">
                                                    {postDetails.title}
                                                </h5>

                                                {postDetails.verified === 1 && (
                                                    <span
                                                        className="position-absolute cs-pointer top-0 end-0 d-inline-flex align-items-center px-2 py-1"
                                                        style={{
                                                            transform: 'translate(25%, -25%)',
                                                            backgroundColor: '#0f88ff', // FB-style blue
                                                            color: '#fff',
                                                            borderRadius: 6,
                                                            fontSize: '12px',
                                                            fontWeight: 500,
                                                        }}
                                                        title="Verified"
                                                    >
                                                        Verified
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="ms-1"
                                                        >
                                                            <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/>
                                                            <path d="m9 12 2 2 4-4"/>
                                                        </svg>
                                                    </span>
                                                )}
                                            </div>



                                            <ul className="product-info-rate-wrap">
                                                <li className="star-review">
                                                    <ul className="list-star">
                                                        <li>
                                                            <i className="icon-star"/>
                                                        </li>
                                                        <li>
                                                            <i className="icon-star"/>
                                                        </li>
                                                        <li>
                                                            <i className="icon-star"/>
                                                        </li>
                                                        <li>
                                                            <i className="icon-star"/>
                                                        </li>
                                                        <li>
                                                            <i className="icon-star text-main-4"/>
                                                        </li>
                                                    </ul>
                                                    <p className="caption text-main-2">Reviews (1.738)</p>
                                                </li>
                                                <li>
                                                    <p className="caption text-main-2">Service Provides: 349</p>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="infor-center">
                                            <div>
                                                <div className="product-info-price">
                                                    <h4 className="text-third">{postDetails.price} AED</h4>
                                                </div>
                                            </div>
                                            <ul className="product-fearture-list">
                                                <li>
                                                    <p className="body-md-2 fw-semibold">City</p>
                                                    <span className="body-text-3">{postDetails.city}</span>
                                                </li>
                                                <li>
                                                    <p className="body-md-2 fw-semibold">Country</p>
                                                    <span className="body-text-3">{postDetails.country}</span>
                                                </li>
                                                <li>
                                                    <p className="body-md-2 fw-semibold">Email</p>
                                                    <span className="body-text-3">{postDetails.email}</span>
                                                </li>
                                                <li>
                                                    <p className="body-md-2 fw-semibold">Since</p>
                                                    <span className="body-text-3">{postDetails.established_year}</span>
                                                </li>
                                                <li>
                                                    <p className="body-md-2 fw-semibold">Services</p>
                                                    <div className="d-flex flex-wrap gap-1 mt-1">
                                                        {postDetails.services?.map((service, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="badge bg-primary text-black px-3 py-1"
                                                            >
                                                                {service}
                                                            </span>
                                                        ))}
                                                    </div>
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
                                                <Truck size={20}/>
                                                {" "}Free shipping
                                            </p>
                                            <div className="shipping-to">
                                                <p className="body-md-2">Shipping to:</p>
                                                <div className="tf-cur">
                                                    <div className="tf-cur-item">
                                                        <select
                                                            className="select-default cs-pointer fw-semibold body-md-2">
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
                                                    <i className="icon-minus"/>
                                                </button>
                                                <input
                                                    className="quantity-product"
                                                    type="text"
                                                    name="number"
                                                    defaultValue={1}
                                                />
                                                <button className="btn-quantity btn-increase">
                                                    <i className="icon-plus"/>
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
                                                <i className="icon-cart-2"/>
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
