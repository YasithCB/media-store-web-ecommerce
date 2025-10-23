import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import { Navigation, Pagination } from "swiper/modules";
import AddToCart from "@/components/common/AddToCart";
import AddToWishlist from "@/components/common/AddToWishlist";
import AddToQuickview from "@/components/common/AddToQuickview";
import AddToCompare from "@/components/common/AddToCompare";

import Banner from '/images/banner/banner-7.jpg';
import Product1 from '/images/item/tivi-4.png';
import {useDealersTopRated} from "@/hooks/useDealers.js";
import {getImageUrl} from "@/utlis/util.js";

export default function Products4() {
    const { data, loading, error } = useDealersTopRated();

    if (loading) return <p>Loading top dealers...</p>;
    if (error) return <p>Error: {error}</p>;

    console.log('Top Dealers : ', data)

    return (
    <section className="tf-sp-2">
      <div className="container">
        <div className="flat-title wow fadeInUp" data-wow-delay="0s">
          <h5 className="fw-semibold">Top Dealers</h5>
          <div className="box-btn-slide relative">
            <div className="swiper-button-prev nav-swiper nav-prev-products snbp34">
              <i className="icon-arrow-left-lg" />
            </div>
            <div className="swiper-button-next nav-swiper nav-next-products snbn34">
              <i className="icon-arrow-right-lg" />
            </div>
          </div>
        </div>
        <div className="slider-wrap">
          <div
            className="banner-image-product-3 hover-img d-none d-xl-block wow fadeInUp"
            data-wow-delay="0s"
          >
            <div className="wrap">
              <div className="image">
                <img
                  src={Banner}
                  alt=""
                  className="lazyload"
                  width={550}
                  height={370}
                />
              </div>
              <div className="content">
                <div className="box-title">
                  <p className="name fw-light lh-lg-50">
                    <a href="#" className="text-white link">
                        CATCH <br/>
                        BEST <br/>
                        DEALERS
                    </a>
                  </p>
                  <p className="sub-name h1 mb-0 text-white">TODAY</p>
                </div>
                <p className="caption text-white font-2 pb-2">
                    Eacam LED Video Light, W140 RGB Rechargeable Photography <br/>
                    Fill Light 2500K-9000K Dimmable 20 Lighting
                </p>
              </div>
            </div>
            <Link
              to={`/shop`}
              className="img-item img-style overflow-visible"
            >
              <img
                src={Product1}
                alt=""
                className="lazyload pt-4"
                width={314}
                height={311}
              />
            </Link>
          </div>
          <Swiper
            className="swiper tf-sw-products"
            spaceBetween={15}
            breakpoints={{
              0: { slidesPerView: 2 },
              575: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            modules={[Navigation, Pagination]}
            pagination={{
              clickable: true,
              el: ".spd34",
            }}
            navigation={{
              prevEl: ".snbp34",
              nextEl: ".snbn34",
            }}
          >
            {data.map((dealer) => (
              <SwiperSlide className="swiper-slide" key={dealer.id}>
                <div
                  className={`card-product style-img-border wow ${dealer.animation}`}
                  data-wow-delay={dealer.wowDelay}
                >
                  <div className="card-product-wrapper">
                    <Link
                      to={`/dealer-detail/${dealer.id}`}
                      className="product-img"
                    >
                        {console.log(getImageUrl(dealer.logo || ""))}
                      <img
                        className="img-product lazyload"
                        src={getImageUrl(dealer.logo || "")}
                        alt="image-product"
                        width={dealer.width}
                        height={dealer.height}
                      />
                      <img
                        className="img-hover lazyload"
                        src={getImageUrl(dealer.logo || "")}
                        alt="image-product"
                        width={dealer.width}
                        height={dealer.height}
                      />
                    </Link>
                    <ul className="list-product-btn">
                      <li>
                        <AddToCart
                          tooltipClass="tooltip-left"
                          productId={dealer.id}
                        />
                      </li>
                      <li className="d-none d-sm-block wishlist">
                        <AddToWishlist
                          tooltipClass="tooltip-left"
                          productId={dealer.id}
                        />
                      </li>
                      <li>
                        <AddToQuickview
                          productId={dealer.id}
                          tooltipClass="tooltip-left"
                        />
                      </li>
                      <li className="d-none d-sm-block">
                        <AddToCompare
                          productId={dealer.id}
                          tooltipClass="tooltip-left"
                        />
                      </li>
                    </ul>
                  </div>
                  <div className="card-product-info">
                    <div className="box-title">
                      <div className="d-flex flex-column">
                        <p className="caption text-main-2 font-2">
                          {dealer.subcategory_title}
                        </p>
                        <Link
                          to={`/product-detail/${dealer.id}`}
                          className="name-product body-md-2 fw-semibold text-secondary link"
                        >
                          {dealer.title}
                        </Link>
                      </div>
                        <p className="caption text-main-2 font-2">
                            {dealer.description}
                        </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="d-flex d-lg-none sw-dot-default sw-pagination-products justify-content-center spd34" />
          </Swiper>
        </div>
      </div>
    </section>
  );
}
