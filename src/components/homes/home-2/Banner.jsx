import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import Product1 from '/images/item/camera-1.png';
import Product2 from '/images/item/light.png';

import { Pagination } from "swiper/modules";
export default function Banner() {
  return (
    <section>
      <div className="container">
        <Swiper
          className="swiper tf-sw-categories overflow-xxl-visible"
          spaceBetween={15}
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1200: {
              slidesPerView: 2,
            },
          }}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            el: ".spd28",
          }}
        >
          <SwiperSlide className="swiper-slide">
            <Link
              to={`/shop-fullwidth`}
              className="banner-image-product-2 style-2 type-sp-2 hover-img d-block"
            >
              <div className="item-image img-style overflow-visible position3">
                <img
                  src={Product1}
                  alt=""
                  className="lazyload"
                  width={231}
                  height={230}
                />
              </div>
              <div
                className="item-banner has-bg-img"
                style={{
                  backgroundImage: 'url("/images/banner/banner-4.jpg")',
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="inner">
                  <div className="box-sale-wrap box-price type-3 relative">
                    <p className="small-text sub-price">From</p>
                    <p className="main-title-2 num-price">990AED</p>
                  </div>
                  <h4 className="name fw-normal text-white lh-lg-38 text-xxl-center text-line-clamp-2">
                      CANON EOS R7
                      <br className="d-none d-sm-block" />
                    <span className="fw-bold"> 18-55 IS | 24.1 MP </span>
                  </h4>
                </div>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide">
            <Link
              to={`/shop-fullwidth`}
              className="banner-image-product-2 type-sp-2 hover-img d-block"
            >
              <div className="item-image img-style overflow-visible position2">
                <img
                  src={Product2}
                  alt=""
                  className="lazyload"
                  width={239}
                  height={227}
                />
              </div>
              <div
                className="item-banner has-bg-img"
                style={{
                  backgroundImage: 'url("/images/banner/banner-3.jpg")',
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="inner justify-content-xl-end">
                  <div className="box-sale-wrap type-3 relative">
                    <p className="small-text">From</p>
                    <p className="main-title-2">399AED</p>
                  </div>
                  <h4 className="name fw-normal text-white lh-lg-38 text-xl-end">
                      NEEWER MS150B
                    <br />
                    <span className="fw-bold"> 130W Bi Color LED Video Light </span>
                  </h4>
                </div>
              </div>
            </Link>
          </SwiperSlide>
          <div className="sw-dot-default sw-pagination-categories justify-content-center spd28" />
        </Swiper>
      </div>
    </section>
  );
}
