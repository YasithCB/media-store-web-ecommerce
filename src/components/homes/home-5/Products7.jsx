import { products23 } from "@/data/products";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import { Navigation, Pagination } from "swiper/modules";
import AddToCart from "@/components/common/AddToCart";
import AddToWishlist from "@/components/common/AddToWishlist";
import AddToQuickview from "@/components/common/AddToQuickview";
import AddToCompare from "@/components/common/AddToCompare";
export default function Products7() {
  return (
    <section className="box-btn-slide-item">
      <div className="flat-title wow fadeInUp" data-wow-delay="0s">
        <h5 className="fw-semibold">Recently Viewed</h5>
        <div className="box-btn-slide relative">
          <div className="swiper-button-prev nav-swiper nav-prev-products snbp52">
            <i className="icon-arrow-left-lg" />
          </div>
          <div className="swiper-button-next nav-swiper nav-next-products snbn52">
            <i className="icon-arrow-right-lg" />
          </div>
        </div>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        pagination={{
          clickable: true,
          el: ".spd52",
        }}
        navigation={{
          prevEl: ".snbp52",
          nextEl: ".snbn52",
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
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        spaceBetween={15}
      >
        {products23.map((product) => (
          <SwiperSlide key={product.id} className="swiper-slide">
            <div
              className={`card-product wow fadeInUp ${product.styleClass}`}
              data-wow-delay={product.delay}
            >
              <div className="card-product-wrapper">
                <Link
                  to={`/product-detail/${product.id}`}
                  className="product-img"
                >
                  <img
                    className="img-product lazyload"
                    src={product.imgSrc}
                    alt="image-product"
                    width={product.width}
                    height={product.height}
                  />
                  <img
                    className="img-hover lazyload"
                    src={product.imgHover}
                    alt="image-product"
                    width={product.width}
                    height={product.height}
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

        <div className="d-flex d-xl-none sw-dot-default sw-pagination-products justify-content-center spd52" />
      </Swiper>
    </section>
  );
}
