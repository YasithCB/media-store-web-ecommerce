import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { getImageUrl } from "@/utlis/util.js";

export default function Quickview() {
    const [thumbSwiper, setThumbSwiper] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [images, setImages] = useState([]);

    const { quickViewItem, addProductToCart, isAddedToCartProducts } = useContextElement();

    // Update images whenever a new product is selected
    useEffect(() => {
        if (quickViewItem) {
            setImages(quickViewItem.photos && quickViewItem.photos.length
                ? quickViewItem.photos
                : ["/images/product/product-thumb/quickview-1.jpg"]); // fallback image
        }
    }, [quickViewItem]);

    if (!quickViewItem) return null; // No product selected


    return (
        <div className="modal fade modalCentered modal-def modal-quick-view" id="quickView">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content flex-md-row">
                    <span className="icon-close icon-close-popup link" data-bs-dismiss="modal" />

                    {/* Product Images */}
                    <div className="quickview-image">
                        <div className="product-thumb-slider">
                            <Swiper
                                modules={[Navigation, Thumbs]}
                                navigation={{ prevEl: ".snbpqv", nextEl: ".snbnqv" }}
                                className="swiper tf-product-view-main"
                                thumbs={{ swiper: thumbSwiper }}
                            >
                                {images.map((img, i) => (
                                    <SwiperSlide key={i}>
                                        <Link to={`/product-detail/${quickViewItem.id}`} className="d-block tf-image-view">
                                            <img src={getImageUrl(img)} alt={quickViewItem.title} className="lazyload" width={900} height={1000} />
                                        </Link>
                                    </SwiperSlide>
                                ))}
                                <div className="swiper-button-prev nav-swiper-2 single-slide-prev snbpqv" />
                                <div className="swiper-button-next nav-swiper-2 single-slide-next snbnqv" />
                            </Swiper>

                            {/* Thumbnails */}
                            <Swiper
                                className="swiper tf-product-view-thumbs"
                                onSwiper={setThumbSwiper}
                                direction="horizontal"
                                spaceBetween={10}
                                slidesPerView="auto"
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Thumbs]}
                            >
                                {images.map((img, i) => (
                                    <SwiperSlide key={i}>
                                        <div className="item">
                                            <img src={getImageUrl(img)} alt={quickViewItem.title} width={100} height={100} />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="quickview-info-wrap">
                        <div className="quickview-info-inner">
                            <div className="tf-product-info-content">
                                <div className="infor-heading">
                                    <p className="caption">
                                        Category: <Link to={`/shop-fullwidth`} className="link text-secondary">{quickViewItem.category_title || "N/A"}</Link>
                                    </p>
                                    <h5 className="product-info-name fw-semibold">
                                        <Link to={`/product-detail/${quickViewItem.id}`} className="link">{quickViewItem.title}</Link>
                                    </h5>
                                </div>

                                <div className="infor-center">
                                    <div className="product-info-price">
                                        <h4 className="text-primary">{parseFloat(quickViewItem.price).toFixed(2)} AED</h4>
                                        {quickViewItem.oldPrice && (
                                            <span className="price-text text-main-2 old-price">{parseFloat(quickViewItem.oldPrice).toFixed(2)} AED</span>
                                        )}
                                    </div>
                                </div>

                                {/* Quantity + Add to Cart */}
                                <div className="box-quantity-wrap">
                                    <div className="wg-quantity">
                    <span className="btn-quantity minus-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                      <i className="icon-minus" />
                    </span>
                                        <input className="quantity-product" type="text" readOnly value={quantity} />
                                        <span className="btn-quantity plus-btn" onClick={() => setQuantity(q => q + 1)}>
                      <i className="icon-plus" />
                    </span>
                                    </div>
                                    <a
                                        href="#shoppingCart"
                                        className="tf-btn btn-gray"
                                        data-bs-toggle="offcanvas"
                                        onClick={() => addProductToCart(quickViewItem.id, quantity)}
                                    >
                    <span className="text-white">
                      {isAddedToCartProducts(quickViewItem.id) ? "Already Added" : "Add To Cart"}
                    </span>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
