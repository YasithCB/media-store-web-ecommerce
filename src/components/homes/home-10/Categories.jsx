import { items } from "@/data/collections";
import React from "react";
import { Grid, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <section className="tf-sp-4 pb-0 wow fadeInUp" data-wow-delay="0s">
      <div className="container">
        <div className="flat-title mb-20 pb-0 border-0">
          <h5 className="fw-semibold">Shop By Categories</h5>
          <div className="box-btn-slide relative">
            <div className="swiper-button-prev nav-swiper nav-prev-products snbp17">
              <i className="icon-arrow-left-lg" />
            </div>
            <div className="swiper-button-next nav-swiper nav-next-products snbn17">
              <i className="icon-arrow-right-lg" />
            </div>
          </div>
        </div>
        <Swiper
          className="swiper tf-sw-products"
          breakpoints={{
            0: { slidesPerView: 1 },
            575: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          spaceBetween={15}
          grid={{
            rows: 2,
            fill: "row",
          }}
          modules={[Navigation, Pagination, Grid]}
          pagination={{
            clickable: true,
            el: ".spd17",
          }}
          navigation={{
            prevEl: ".snbp17",
            nextEl: ".snbn17",
          }}
        >
          {items.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="wg-cls hover-img type-abs">
                <Link to={`/shop-default`} className="img-style d-block">
                  <img alt="" src={item.imgSrc} width={700} height={224} />
                </Link>
                <div className="content">
                  <h6 className="fw-normal">
                    <a href="#" className="link">
                      {item.title}
                    </a>
                  </h6>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="sw-dot-default sw-pagination-products justify-content-center spd17" />
        </Swiper>
      </div>
    </section>
  );
}
