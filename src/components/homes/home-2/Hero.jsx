import React from "react";
import { Link } from "react-router-dom";

import { PackagePlus } from 'lucide-react';

import AddToCart from "@/components/common/AddToCart";
import AddToWishlist from "@/components/common/AddToWishlist";
import AddToQuickview from "@/components/common/AddToQuickview";
import AddToCompare from "@/components/common/AddToCompare";

import BannerImage1 from '/images/banner/banner-31.webp'
import MainItem1 from '/images/item/camera-4.png'
import {useEquipmentsTopRated} from "@/hooks/useEquipments.js";
import LoadingDots from "@/components/custom/loadingDots.jsx";
import {getImageUrl} from "@/utlis/util.js";
import {useContextElement} from "@/context/Context.jsx";

export default function Hero() {
    const { data, loading, error } = useEquipmentsTopRated();
    const { currentUser } = useContextElement();

    if (loading) return <LoadingDots />;
    if (error) return <p>Error: {error}</p>;

  return (
    <section
      className="has-bg-img"
      style={{ backgroundImage: `url(${BannerImage1})` }}
    >
      <div className="container">
        <div className="banner-product flex-xl-nowrap justify-content-center">
          <div className="product-wrap hover-img flex-md-nowrap justify-content-center">
            <Link
              to={`/shop-fullwidth`}
              className="d-inline-flex item-product img-style"
            >
              <img
                src={MainItem1}
                alt=""
                className="lazyload"
                width={1084}
                height={808}
              />
            </Link>
            <div className="info-product text-center text-md-start">
              <div className="box-title">
                <p className="tag-new text-white text-uppercase title-sidebar">
                  New arrival
                </p>
                <h1 className="name">
                  <Link
                    to={`/shop-fullwidth`}
                    className="text-white text-uppercase link"
                  >
                    Camera &amp; <br />
                    <span className="fw-8"> Lenses </span>
                  </Link>
                </h1>
              </div>
              <div className="box-price">
                <p className="start text-white">Starting</p>
                <h1 className="price text-primary">AED900</h1>
              </div>
            </div>
          </div>

          {/* right col */}
          <div className="other-item flex-xl-column flex-md-row">
              <div className="d-grid">
                  { currentUser ?
                      <Link to={`/add-post`} className="body-small link">
                          <button className="btn bg-primary text-secondary fw-semibold w-100">
                              <PackagePlus />
                              {" "}Add Your post for FREE
                          </button>
                      </Link>
                      :
                      <button className="btn bg-primary text-secondary fw-semibold w-100">
                          <PackagePlus />
                          {" "}Login to Add Your post for FREE
                      </button>
                  }
              </div>

              <div className='d-none d-lg-block'>
                  {data.slice(0, 2).map((product) => (
                      <div
                          className={`card-product style-row row-small-2 mb-1 bg-white radius-8`}
                          key={product.id}
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
                                      src={product.imgHover}
                                      alt="image-product"
                                      width={product.hoverWidth || product.width}
                                      height={product.hoverHeight || product.height}
                                  />
                              </Link>
                          </div>
                          <div className="card-product-info">
                              <div className="box-title">
                                  <div className="bg-white relative z-5">
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
                                  <div className="group-btn">
                                      <p className="price-wrap fw-medium">
                        <span className="new-price price-text fw-medium">
                          {product.price != null && !isNaN(product.price)
                              ? parseFloat(product.price).toFixed(2)
                              : "N/A"}
                        </span>
                                          <span className="old-price body-md-2 text-main-2">
                           {product.price != null && !isNaN(product.price)
                               ? parseFloat(product.price).toFixed(2)
                               : "N/A"}
                        </span>
                                      </p>
                                      <ul className="list-product-btn flex-row">
                                          <li>
                                              <AddToCart productId={product.id}/>
                                          </li>
                                          <li className="wishlist">
                                              <AddToWishlist productId={product.id}
                                                             productCategory={product.category_title}/>
                                          </li>
                                          <li>
                                              <AddToCompare productId={product.id}/>
                                          </li>
                                      </ul>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
