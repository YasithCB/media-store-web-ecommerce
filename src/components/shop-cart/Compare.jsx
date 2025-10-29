import React from "react";
import { useContextElement } from "@/context/Context";
import {getImageUrl} from "@/utlis/util.js";

export default function CompareTable() {
    const {
        compareItem,         // now full product objects
        removeFromCompareItem,
        addProductToCart,
        isAddedToCartProducts,
    } = useContextElement();

    if (!compareItem.length) {
        return (
            <div className="tf-sp-2 text-center">
                <p>No products to compare.</p>
            </div>
        );
    }

    console.log('compareItem')
    console.log(compareItem)

    return (
        <div className="tf-sp-2">
            <div className="container">
                <div className="tf-compare">
                    <table className="tf-table-compare">
                        <tbody>
                        {/* Product Name */}
                        <tr className="tf-compare-row row-info">
                            <td className="tf-compare-col">
                                <h6 className="fw-semibold">Product Name</h6>
                            </td>
                            {compareItem.map((product) => (
                                <td key={product.id} className="tf-compare-col tf-compare-info">
                                    <div className="compare-item_info">
                      <span
                          className="text-line-clamp-2 body-md-2 fw-semibold text-secondary link cs-pointer"
                          title={product.title}
                      >
                        {product.title}
                      </span>
                                        <span
                                            className="icon"
                                            onClick={() => removeFromCompareItem(product.id)}
                                        >
                        <i className="icon-close remove link cs-pointer" />
                      </span>
                                    </div>
                                </td>
                            ))}
                        </tr>

                        {/* Product Image */}
                        <tr className="tf-compare-row row-image">
                            <td className="tf-compare-col">
                                <h6 className="fw-semibold">Image</h6>
                            </td>
                            {compareItem.map((product) => (
                                <td
                                    key={product.id}
                                    className="tf-compare-col tf-compare-image text-center"
                                    style={{ verticalAlign: "middle" }}
                                >
                                    <img
                                        src={getImageUrl(product.photos?.[0] || "")}
                                        alt={product.title}
                                        className="lazyload"
                                        width={200}
                                        height={200}
                                    />
                                </td>
                            ))}
                        </tr>

                        {/* SKU */}
                        <tr className="tf-compare-row">
                            <td className="tf-compare-col">
                                <h6 className="fw-semibold">SKU</h6>
                            </td>
                            {compareItem.map((product) => (
                                <td key={product.id} className="tf-compare-col">
                                    <span>{product.id || "N/A"}</span>
                                </td>
                            ))}
                        </tr>

                        {/* Price */}
                        <tr className="tf-compare-row">
                            <td className="tf-compare-col">
                                <h6 className="fw-semibold">Price</h6>
                            </td>
                            {compareItem.map((product) => (
                                <td key={product.id} className="tf-compare-col">
                                    <p className="price-wrap fw-medium flex-nowrap">
                      <span className="new-price price-text fw-medium mb-0">
                        {product.price != null && !isNaN(product.price)
                            ? parseFloat(product.price).toFixed(2)
                            : "N/A"}{" "}
                          AED
                      </span>
                                        {product.oldPrice && (
                                            <span className="old-price body-md-2 text-main-2 fw-normal">
                          {parseFloat(product.oldPrice).toFixed(2)} AED
                        </span>
                                        )}
                                    </p>
                                </td>
                            ))}
                        </tr>

                        {/* Usage */}
                        <tr className="tf-compare-row">
                            <td className="tf-compare-col">
                                <h6 className="fw-semibold">Usage</h6>
                            </td>
                            {compareItem.map((product) => (
                                <td key={product.id} className="tf-compare-col">
                                    <span>{product.usage || "N/A"}</span>
                                </td>
                            ))}
                        </tr>

                        {/* Rating */}
                        <tr className="tf-compare-row">
                            <td className="tf-compare-col">
                                <h6 className="fw-semibold">Rating</h6>
                            </td>
                            {compareItem.map((product) => (
                                <td key={product.id} className="tf-compare-col">
                                    <span>{product.rating || "N/A"}</span>
                                </td>
                            ))}
                        </tr>

                        {/* City */}
                        <tr className="tf-compare-row">
                            <td className="tf-compare-col">
                                <h6 className="fw-semibold">City</h6>
                            </td>
                            {compareItem.map((product) => (
                                <td key={product.id} className="tf-compare-col">
                                    <span>{product.city || "N/A"}</span>
                                </td>
                            ))}
                        </tr>

                        {/* Brand */}
                        <tr className="tf-compare-row">
                            <td className="tf-compare-col">
                                <h6 className="fw-semibold">Brand</h6>
                            </td>
                            {compareItem.map((product) => (
                                <td key={product.id} className="tf-compare-col">
                                    <span>{product.brand || "N/A"}</span>
                                </td>
                            ))}
                        </tr>

                        {/* Add to Cart */}
                        <tr className="tf-compare-row">
                            <td className="tf-compare-col">
                                <h6 className="fw-semibold">Add To Cart</h6>
                            </td>
                            {compareItem.map((product) => (
                                <td key={product.id} className="tf-compare-col">
                                    <a
                                        href="#shoppingCart"
                                        data-bs-toggle="offcanvas"
                                        className="tf-btn btn-gray text-nowrap"
                                        onClick={() => addProductToCart(product.id)}
                                    >
                      <span className="text-white">
                        {isAddedToCartProducts(product.id)
                            ? "Already Added"
                            : "Add to Cart"}
                      </span>
                                    </a>
                                </td>
                            ))}
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
