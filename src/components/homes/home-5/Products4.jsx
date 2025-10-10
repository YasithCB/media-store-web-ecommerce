import { products20 } from "@/data/products";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import { Navigation, Pagination } from "swiper/modules";
import AddToCart from "@/components/common/AddToCart";
import AddToWishlist from "@/components/common/AddToWishlist";
import AddToQuickview from "@/components/common/AddToQuickview";
import AddToCompare from "@/components/common/AddToCompare";
export default function Products4() {
  const [activeTab, setActiveTab] = useState("Feature");
  const [filtered, setFiltered] = useState(products20);

  const tabs = [
    { id: 1, name: "Feature" },
    { id: 2, name: "Toprate" },
    { id: 3, name: "On sale" },
  ];
  useEffect(() => {
    setFiltered(products20.filter((elm) => elm.filterTab.includes(activeTab)));
  }, [activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div className="tf-sp-2 flat-animate-tab box-btn-slide-item">
      <div className="flat-title wow fadeInUp" data-wow-delay="0s">
        <div className="flat-title-tab-default">
          <ul className="menu-tab-line" role="tablist">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                className="nav-tab-item d-flex"
                onClick={() => handleTabClick(tab.name)}
              >
                <a
                  className={`tab-link main-title link fw-semibold ${
                    activeTab === tab.name ? "active" : ""
                  }`}
                >
                  {tab.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="box-btn-slide relative">
          <div className="swiper-button-prev nav-swiper nav-prev-products snbp49">
            <i className="icon-arrow-left-lg" />
          </div>
          <div className="swiper-button-next nav-swiper nav-next-products snbn49">
            <i className="icon-arrow-right-lg" />
          </div>
        </div>
      </div>
      <div className="tab-content">
        <div className="tab-pane active show" id="feature" role="tabpanel">
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
                spaceBetween: 30,
              },
            }}
            modules={[Navigation, Pagination]}
            pagination={{
              clickable: true,
              el: ".spd49",
            }}
            navigation={{
              prevEl: ".snbp49",
              nextEl: ".snbn49",
            }}
          >
            {filtered.map((product, index) => (
              <SwiperSlide className="swiper-slide" key={product.id}>
                <div
                  className={`card-product ${
                    index < 5 ? "wow fadeInLeft" : ""
                  }`}
                  {...(index < 5 && { "data-wow-delay": product.delay })}
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
                        {product.oldPrice && (
                          <span className="old-price body-md-2 text-main-2 fw-normal">
                            ${product.oldPrice.toFixed(3)}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="d-flex d-xl-none sw-dot-default sw-pagination-products justify-content-center spd49" />
          </Swiper>
        </div>
      </div>
    </div>
  );
}
