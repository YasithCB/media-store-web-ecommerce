import { products54 } from "@/data/products";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import { Navigation, Pagination } from "swiper/modules";
import AddToCart from "../common/AddToCart";
import AddToWishlist from "../common/AddToWishlist";
import AddToQuickview from "../common/AddToQuickview";
import AddToCompare from "../common/AddToCompare";
import {useEquipmentBySubCategoryId} from "@/hooks/useEquipments.js";
import {getImageUrl} from "@/utlis/util.js";
import {useDealersBySubCategoryId} from "@/hooks/useDealers.js";
import LoadingDots from "@/components/custom/loadingDots.jsx";
export default function Relatedproducts({categoryId, subCategoryId}) {
    const { data, loading, error } = categoryId === 1 ? useEquipmentBySubCategoryId(subCategoryId) : useDealersBySubCategoryId(subCategoryId);

    if (loading) return <LoadingDots />;
    if (error) return <p>Error: {error}</p>;

    console.log(`Relatedproducts : ${subCategoryId}`)
    console.log(data)

  return (
    <section className="tf-sp-2 pt-0">
      <div className="container">
        <div className="flat-title">
          <h5 className="fw-semibold">Products Related To This Item</h5>
          <div className="box-btn-slide relative">
            <div className="swiper-button-prev nav-swiper nav-prev-products snbp67">
              <i className="icon-arrow-left-lg" />
            </div>
            <div className="swiper-button-next nav-swiper nav-next-products snbn67">
              <i className="icon-arrow-right-lg" />
            </div>
          </div>
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{
            clickable: true,
            el: ".spd67",
          }}
          navigation={{
            prevEl: ".snbp67",
            nextEl: ".snbn67",
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
                              <img
                                  className="img-product lazyload"
                                  src={getImageUrl(dealer.photos[0] || "")}
                                  alt="image-product"
                                  width={dealer.width}
                                  height={dealer.height}
                              />
                              <img
                                  className="img-hover lazyload"
                                  src={getImageUrl(dealer.photos[0] || "")}
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
                                  {dealer.description?.length > 150
                                      ? dealer.description.substring(0, 150) + "..."
                                      : dealer.description}
                              </p>

                          </div>
                      </div>
                  </div>
              </SwiperSlide>
          ))}
          <div className="d-flex d-lg-none sw-dot-default sw-pagination-products justify-content-center spd67" />
        </Swiper>
      </div>
    </section>
  );
}
