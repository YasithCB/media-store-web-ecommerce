import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import { Navigation, Pagination } from "swiper/modules";
import AddToCart from "./AddToCart";
import AddToWishlist from "./AddToWishlist";
import AddToQuickview from "./AddToQuickview";
import AddToCompare from "./AddToCompare";
import {getImageUrl} from "@/utlis/util.js";
import {useEquipmentsTopRated} from "@/hooks/useEquipments.js";
import LoadingDots from "@/components/custom/loadingDots.jsx";
import React from "react";

export default function Products6({ parentClass = "tf-sp-2 pt-0" }) {
    const { data, loading, error } = useEquipmentsTopRated();

    if (loading) return <LoadingDots />;
    if (error) return <p>Error: {error}</p>;

    return (
    <section className={parentClass}>
      <div className="container">
        <div className="flat-title pb-8 wow fadeInUp" data-wow-delay="0s">
          <h5 className="fw-semibold flat-title-has-icon">
            <span className="icon">
              <i className="icon-fire tf-ani-tada" />
            </span>
            Top Rated Items
          </h5>
          <div className="box-btn-slide relative">
            <div className="swiper-button-prev nav-swiper nav-prev-products snbp11">
              <i className="icon-arrow-left-lg" />
            </div>
            <div className="swiper-button-next nav-swiper nav-next-products snbn11">
              <i className="icon-arrow-right-lg" />
            </div>
          </div>
        </div>
        <div className="box-btn-slide-2 sw-nav-effect">
          <Swiper
            className="swiper tf-sw-products"
            spaceBetween={15}
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
                spaceBetween: 20,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }}
            modules={[Navigation, Pagination]}
            pagination={{
              clickable: true,
              el: ".spd11",
            }}
            navigation={{
              prevEl: ".snbp11",
              nextEl: ".snbn11",
            }}
          >
            {data.map((product) => (
              <SwiperSlide className="swiper-slide" key={product.id}>
                <div
                  className={`card-product style-img-border ${
                    product.animation ? "wow " + product.animation : ""
                  }`}
                  data-wow-delay={product.wowDelay || undefined}
                >
                  <div className="card-product-wrapper">
                    <Link
                      to={`/product-detail/${product.id}`}
                      className="product-img"
                    >
                      <img
                        className="img-product lazyload"
                        src={getImageUrl(product.photos?.[0] || "")}
                        alt="image-product"
                        width={product.width}
                        height={product.height}
                      />
                        {console.log(getImageUrl(product.photos?.[0] || ""))}
                      <img
                        className="img-hover lazyload"
                        src={getImageUrl(product.photos?.[0] || "")}
                        alt="image-product"
                        width={product.hoverWidth || product.width}
                        height={product.hoverHeight || product.height}
                      />
                    </Link>
                    {product.salePercentage && (
                      <div className="box-sale-wrap pst-default z-5">
                        <p className="small-text">Sale</p>
                        <p className="title-sidebar-2">
                          {product.salePercentage}
                        </p>
                      </div>
                    )}
                    <ul className="list-product-btn">
                      <li>
                        <AddToCart
                          tooltipClass="tooltip-left"
                          productId={product.id}
                          productCategory={product.category_title}
                        />
                      </li>
                      <li className="d-none d-sm-block wishlist">
                          <AddToWishlist
                              tooltipClass="tooltip-left"
                              productId={product.id}
                              productCategory={product.category_title}
                          />
                      </li>
                      <li className="d-none d-sm-block">
                        <AddToCompare
                          productId={product.id}
                          product={product}
                          tooltipClass="tooltip-left"
                        />
                      </li>
                    </ul>
                  </div>
                  <div className="card-product-info">
                    <div className="box-title">
                      <div className="d-flex flex-column">
                        <p className="caption text-main-2 font-2">
                            {product.sub_category_title}
                        </p>
                        <Link
                          to={`/product-detail/${product.id}`}
                          className="name-product body-md-2 fw-semibold text-secondary link"
                        >
                          {product.title}
                        </Link>
                      </div>
                      <p className="price-wrap fw-medium">
                        <span className="new-price price-text fw-medium text-cl-4 mb-0">
                          {product.price != null && !isNaN(product.price)
                              ? parseFloat(product.price).toFixed(2)
                              : "N/A"} AED
                        </span>
                        <span className="old-price body-md-2 text-main-2 fw-normal">
                          {product.price != null && !isNaN(product.price)
                              ? parseFloat(product.price).toFixed(2)
                              : "N/A"}
                        </span>
                      </p>
                    </div>
                      {product.progressWidth ??
                          <div className="box-infor-detail">
                              <div className="product-progress-sale">
                                  <div
                                      className="progress-sold progress"
                                      role="progressbar"
                                      aria-valuemin={0}
                                      aria-valuemax={100}
                                  >
                                      <div
                                          className="progress-bar bg-dark"
                                          style={{ width: product.progressWidth }}
                                      />
                                  </div>
                                  <div className="box-quantity d-flex justify-content-between">
                                      <p className="text-avaiable caption">
                                          Sold:{" "}
                                          <span className="fw-bold">{product.sold}</span>
                                      </p>
                                      <p className="text-avaiable caption">
                                          Available:{" "}
                                          <span className="fw-bold">{product.available}</span>
                                      </p>
                                  </div>
                              </div>
                          </div>
                      }
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="sw-dot-default sw-pagination-products justify-content-center spd11" />
          </Swiper>
        </div>
      </div>
    </section>
  );
}
