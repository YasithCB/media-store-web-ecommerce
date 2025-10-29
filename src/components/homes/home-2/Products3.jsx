import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import { Navigation, Pagination } from "swiper/modules";
import AddToCart from "@/components/common/AddToCart";
import AddToWishlist from "@/components/common/AddToWishlist";
import AddToQuickView from "@/components/common/AddToQuickview";
import AddToCompare from "@/components/common/AddToCompare";
import {useEquipmentBySubCategoryId} from "@/hooks/useEquipments.js";
import {getImageUrl} from "@/utlis/util.js";

export default function Products3({subCategoryId, title}) {
    const { data, loading, error } = useEquipmentBySubCategoryId(subCategoryId);

    if (loading) return <p>Loading Video & Cameras...</p>;
    if (error) return <p>Error: {error}</p>;

    console.log(`useEquipmentBySubCategoryId : ${title}`)
    console.log(data)

  return (
    <section className="tf-sp-2 ">
      <div className="container">
        <div className="flat-title wow fadeInUp" data-wow-delay="0s">
          <h5 className="fw-semibold">{title}</h5>
          <div className="box-btn-slide relative">
            <div className="swiper-button-prev nav-swiper nav-prev-products snbp33">
              <i className="icon-arrow-left-lg" />
            </div>
            <div className="swiper-button-next nav-swiper nav-next-products snbn33">
              <i className="icon-arrow-right-lg" />
            </div>
          </div>
        </div>
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
            1200: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
          modules={[Navigation, Pagination]}
          pagination={{
            clickable: true,
            el: ".spd33",
          }}
          navigation={{
            prevEl: ".snbp33",
            nextEl: ".snbn33",
          }}
        >
          {data.map((product) => (
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
                      width={product.width}
                      height={product.height}
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
                      <span className="new-price price-text fw-medium mb-0">
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
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="d-flex d-lg-none sw-dot-default sw-pagination-products justify-content-center spd33" />
        </Swiper>
      </div>
    </section>
  );
}
