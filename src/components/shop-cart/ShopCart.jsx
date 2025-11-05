import React from "react";
import { Link } from "react-router-dom";

import { useContextElement } from "@/context/Context";
import {getImageUrl} from "@/utlis/util.js";
import Swal from "sweetalert2";
export default function ShopCart() {
  const {
    cartProducts,
    removeFromCart,
    totalPrice,

    updateQuantity,
  } = useContextElement();

    function confirmAndRemove(productId, category) {
        Swal.fire({
            title: "Remove from Cart?",
            text: "Are you sure you want to remove this item?",
            icon: "warning",
            iconColor: '#212529',
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#212529",
            confirmButtonText: "Yes, remove it",
        }).then((result) => {
            if (result.isConfirmed) {
                removeFromCart(productId, category);
                Swal.fire({
                    title: "Removed!",
                    text: "Item has been removed from your cart.",
                    icon: "success",
                    confirmButtonColor: "#212529",
                });
            }
        });
    }

  return (
    <div className="s-shoping-cart tf-sp-2">
      <div className="container">
        <div className="checkout-status tf-sp-2 pt-0">
          <div className="checkout-wrap">
            <span className="checkout-bar first" />
            <div className="step-payment">
              <span className="icon">
                <i className="icon-shop-cart-1" />
              </span>
              <Link to={`/shop-cart`} className="text-secondary body-text-3">
                Shopping Cart
              </Link>
            </div>
            <div className="step-payment">
              <span className="icon">
                <i className="icon-shop-cart-2" />
              </span>
              <Link to={`/checkout`} className="link-secondary body-text-3">
                Shopping &amp; Checkout
              </Link>
            </div>
            <div className="step-payment">
              <span className="icon">
                <i className="icon-shop-cart-3" />
              </span>
              <Link
                to={`/order-details`}
                className="link-secondary body-text-3"
              >
                Confirmation
              </Link>
            </div>
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="form-discount">
          <div className="overflow-x-auto">
            {cartProducts.length ? (
              <table className="tf-table-page-cart">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {cartProducts.map((product, i) => (
                    <tr key={i} className="tf-cart-item">
                      <td className="tf-cart-item_product">
                        <a href="#" className="img-box">
                          <img
                            alt=""
                            src={getImageUrl(product.photos?.[0] || "")}
                            width={300}
                            height={300}
                          />
                        </a>
                        <div className="cart-info">
                          <a
                            href="#"
                            className="cart-title body-md-2 fw-semibold link"
                          >
                            {product.title}
                          </a>
                          <div className="variant-box">
                            <p className="body-text-3">Color:</p>
                            <div className="tf-select">
                              <select>
                                <option>Yellow</option>
                                <option>Green</option>
                                <option>Black</option>
                                <option>Red</option>
                                <option>Beige</option>
                                <option>Pink</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        data-cart-title="Price"
                        className="tf-cart-item_price"
                      >
                        <p className="cart-price price-on-sale price-text fw-medium">
                            {product.price != null && !isNaN(product.price)
                                ? parseFloat(product.price).toFixed(2)
                                : "N/A"} AED
                        </p>
                      </td>
                      <td
                        data-cart-title="Quantity"
                        className="tf-cart-item_quantity"
                      >
                        <div className="wg-quantity">
                          <span
                            className="btn-quantity btn-decrease"
                            onClick={() =>
                              updateQuantity(product.id, product.quantity - 1)
                            }
                          >
                            <i className="icon-minus" />
                          </span>
                          <input
                            className="quantity-product"
                            type="text"
                            name="number"
                            value={product.quantity}
                            readOnly
                          />
                          <span
                            className="btn-quantity btn-increase"
                            onClick={() =>
                              updateQuantity(product.id, product.quantity + 1)
                            }
                          >
                            <i className="icon-plus" />
                          </span>
                        </div>
                      </td>
                      <td
                        data-cart-title="Total"
                        className="tf-cart-item_total"
                      >
                        <p className="cart-total total-price price-text fw-medium">
                          {(parseFloat(product.price).toFixed(2) * product.quantity).toFixed(2)} AED
                        </p>
                      </td>
                      <td
                        data-cart-title="Remove"
                        className="remove-cart text-xxl-end"
                      >
                          <span
                              className="icon-close remove link"
                              onClick={() => confirmAndRemove(product.id, product.category_title)}
                          />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-4">
                <div className="col-4">
                  Your Cart is empty. Start adding favorite products to cart!{" "}
                </div>
                <Link
                  className="tf-btn mt-2 mb-3 text-white"
                  style={{ width: "fit-content" }}
                  to={"/shop-fullwidth"}>
                  Explore Products
                </Link>
              </div>
            )}
          </div>
          <div className="cart-bottom">
            <div className="ip-discount-code">
              <input
                type="text"
                placeholder="Enter your cupon code"
                required=""
              />
              <button type="submit" className="tf-btn btn-gray">
                <span className="text-white">Apply coupon</span>
              </button>
            </div>
            <span className="last-total-price main-title fw-semibold">
              Total: {totalPrice.toFixed(2)} AED
            </span>
          </div>
        </form>
        <div className="box-btn">
          <Link to={`/shop`} className="tf-btn btn-gray">
            <span className="text-white">Continue shopping</span>
          </Link>
          <Link to={`/checkout`} className="tf-btn-dark">
            <span className="text-white">Proceed to checkout</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
