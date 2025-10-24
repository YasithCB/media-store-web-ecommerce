import { products53 } from "@/data/products";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import { Navigation, Pagination } from "swiper/modules";
import AddToCart from "../common/AddToCart";
import AddToWishlist from "../common/AddToWishlist";
import AddToQuickview from "../common/AddToQuickview";
import AddToCompare from "../common/AddToCompare";
export default function SimilerProducts() {
  return (
    <section className="tf-sp-2 pt-0">
      <div className="container">
        <div className="flat-title">
          <h5 className="fw-semibold">Discover Similar Items</h5>
          <div className="box-btn-slide relative">
            <div className="swiper-button-prev nav-swiper nav-prev-products snbp68">
              <i className="icon-arrow-left-lg" />
            </div>
            <div className="swiper-button-next nav-swiper nav-next-products snbn68">
              <i className="icon-arrow-right-lg" />
            </div>
          </div>
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{
            clickable: true,
            el: ".spd68",
          }}
          navigation={{
            prevEl: ".snbp68",
            nextEl: ".snbn68",
          }}
          className="swiper tf-sw-products"
          breakpoints={{
            0: { slidesPerView: 2 },
            575: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          spaceBetween={15}
        >
          {products53.map((product) => (
            <SwiperSlide className="swiper-slide" key={product.id}>
              <div className="card-product">
                <div className="card-product-wrapper">
                  <Link
                    to={`/product-detail/${product.id}`}
                    className="product-img"
                  >
                    <img
                      className="img-product lazyload"
                      src={product.imgSrc}
                      alt={product.title} // Use the product title as alt text
                      width={500}
                      height={500}
                    />
                    <img
                      className="img-hover lazyload"
                      src={product.imgHover}
                      alt={`${product.title} hover`} // More descriptive alt text
                      width={500}
                      height={500}
                    />
                  </Link>
                  <ul className="list-product-btn">
                    <li>
                      <AddToCart
                        tooltipClass="tooltip-left"
                        productId={product.id}
                      />
                    </li>
                    <li className="d-none d-sm-block wishlist">
                      <AddToWishlist
                              tooltipClass="tooltip-left"
                              productId={product.id}
                              productCategory={product.category_title}
                          />
                    </li>
                    <li>
                      <AddToQuickview
                        productId={product.id}
                        tooltipClass="tooltip-left"
                      />
                    </li>
                    <li className="d-none d-sm-block">
                      <AddToCompare
                        productId={product.id}
                        tooltipClass="tooltip-left"
                      />
                    </li>
                  </ul>
                </div>
                <div className="card-product-info">
                  <div className="box-title">
                    <div className="d-flex flex-column">
                      <p className="caption text-main-2 font-2">
                        {product.category}
                      </p>
                      <Link
                        to={`/product-detail/${product.id}`}
                        className="name-product body-md-2 fw-semibold text-secondary link"
                      >
                        {product.title}
                      </Link>
                    </div>
                    <p className="price-wrap fw-medium">
                      <span className="new-price price-text fw-medium mb-0">
                        ${product.price.toFixed(3)}
                      </span>
                      <span className="old-price body-md-2 text-main-2 fw-normal">
                        ${product.oldPrice.toFixed(3)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="d-flex d-lg-none sw-dot-default sw-pagination-products justify-content-center spd68" />
        </Swiper>
      </div>
    </section>
  );
}
