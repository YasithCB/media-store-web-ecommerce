import { products5 } from "@/data/products";
import React, {useEffect, useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import { Navigation, Pagination } from "swiper/modules";
import AddToCart from "./AddToCart";
import AddToWishlist from "./AddToWishlist";
import AddToQuickView from "./AddToQuickView";
import AddToCompare from "./AddToCompare";
import {getFirstPhoto, getImageUrl, getRecentlyViewed} from "@/utlis/util.js";
import LoadingDots from "@/components/custom/loadingDots.jsx";

export default function RecentProducts({
  parentClass = "tf-sp-2",
  fullWidth = false,
}) {

    const [recentlyViewedList, setRecentlyViewedList] = useState([])

    useEffect(() => {
        const data = getRecentlyViewed();
        setRecentlyViewedList(data);
    }, []);


    const handleClearRecents = () => {
        localStorage.removeItem("recentlyViewed"); // clear localStorage
        setRecentlyViewedList([]) // update state if you store in React state
    };

    if (recentlyViewedList.length === 0) return;

    return (
    <section className={parentClass}>
      <div className={`container${fullWidth ? "-full" : ""}`}>
        <div className="flat-title wow fadeInUp" data-wow-delay="0s">
          <h5 className="fw-semibold">Recently Viewed</h5>
          <div className="box-btn-slide relative">
              <button
                  onClick={handleClearRecents}
                  style={{
                      fontSize: "0.85rem",
                      padding: "4px 10px",
                      background: "transparent",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      color: "#333",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => e.target.style.background = "#f0f0f0"}
                  onMouseLeave={e => e.target.style.background = "transparent"}
              >
                  Clear Recents
              </button>


              <div className="swiper-button-prev nav-swiper nav-prev-products snbp12">
              <i className="icon-arrow-left-lg" />
            </div>
            <div className="swiper-button-next nav-swiper nav-next-products snbn12">
              <i className="icon-arrow-right-lg" />
            </div>
          </div>
        </div>
        <Swiper
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
          modules={[Navigation, Pagination]}
          pagination={{
            clickable: true,
            el: ".spd12",
          }}
          navigation={{
            prevEl: ".snbp12",
            nextEl: ".snbn12",
          }}
        >
          {recentlyViewedList.map((product) => (
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
                      src={product.category_id === 2 ? getImageUrl(product.logo) : getImageUrl(getFirstPhoto(product.photos) || "")}
                      alt="image-product"
                      width={product.imgWidth}
                      height={product.imgHeight}
                    />
                    <img
                      className="img-hover lazyload"
                      src={product.category_id === 2 ? getImageUrl(product.logo) : getImageUrl(getFirstPhoto(product.photos) || "")}
                      alt="image-product"
                      width={product.hoverWidth}
                      height={product.hoverHeight}
                    />
                  </Link>
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
                      <span className="new-price price-text fw-medium">
                        {product.price != null && !isNaN(product.price)
                          ? parseFloat(product.price).toFixed(2)
                          : "N/A"} AED
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="d-flex d-lg-none sw-dot-default sw-pagination-products justify-content-center spd12" />
        </Swiper>
      </div>
    </section>
  );
}
