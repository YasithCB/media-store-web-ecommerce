import { products8 } from "@/data/products";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import { Navigation, Pagination } from "swiper/modules";
import AddToCart from "@/components/common/AddToCart";
import AddToWishlist from "@/components/common/AddToWishlist";
import AddToQuickview from "@/components/common/AddToQuickview";
import AddToCompare from "@/components/common/AddToCompare";
import {api} from "@/api/index.js";
import {getImageUrl} from "@/utlis/util.js";
export default function Products2() {
  const [activeTab, setActiveTab] = useState("Toprate");
  const [filtered, setFiltered] = useState(products8);
  const [loading, setLoading] = useState(false);


    const tabs = [
    { id: 1, name: "On sale" },
    { id: 2, name: "Toprate" },
  ];
    const fetchProducts = async (tabName) => {
        setLoading(true);
        try {
            let data = [];

            if (tabName === "Toprate") {
                data = await api.equipment.getTopRatedEquipments();
            } else if (tabName === "On sale") {
                data = await api.equipment.getOnSaleEquipments();
            }

            setFiltered(data.data || []);
        } catch (error) {
            console.error("API error:", error);
            setFiltered([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(activeTab);
    }, [activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="tf-sp-2 flat-animate-tab">
      <div className="container">
        <div className="flat-title">
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
                      activeTab === tab.name ? "text-third" : ""
                    }`}
                  >
                    {tab.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="tab-content">
          <div className="tab-pane active show" id="feature" role="tabpanel">
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
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1200: {
                  slidesPerView: 5,
                  spaceBetween: 30,
                },
              }}
              spaceBetween={15}
              modules={[Navigation, Pagination]}
              pagination={{
                clickable: true,
                el: ".spd32",
              }}
            >
              {filtered.map((product) => (
                <SwiperSlide className="swiper-slide" key={product.id}>
                  <div
                    className={`card-product style-img-border wow ${product.animation}`}
                    data-wow-delay={product.wowDelay}
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

                          <img
                          className="img-hover lazyload"
                          src={getImageUrl(product.photos?.[0] || "")}
                          alt="image-product"
                          width={product.hoverWidth || product.width}
                          height={product.hoverHeight || product.height}
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
                              {product.subcategory_title}
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
                            {product.price != null && !isNaN(product.price)
                                ? parseFloat(product.price).toFixed(2)
                                : "N/A"}
                          </span>
                          <span className="old-price body-md-2 text-main-2 fw-normal">
                            {product.price != null && !isNaN(product.price)
                                ? parseFloat(product.price).toFixed(2)
                                : "N/A"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="sw-dot-default sw-pagination-products justify-content-center spd32" />
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
