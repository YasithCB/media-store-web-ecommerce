import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import { getImageUrl } from "@/utlis/util.js";
import LoadingDots from "@/components/custom/loadingDots.jsx";

export default function MyOrders() {
    const { currentUser, fetchMyOrdersFromDB, myOrders } = useContextElement();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!currentUser) return;

        const loadOrders = async () => {
            setLoading(true);
            setError(null);
            try {
                // Delay to ensure context/user is ready
                await new Promise((res) => setTimeout(res, 1500));
                await fetchMyOrdersFromDB();
            } catch (err) {
                console.error(err);
                setError("Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, [currentUser]);

    // Loading state
    if (loading) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center py-5">
                <p className="mb-2">Loading orders...</p>
                <LoadingDots />
            </div>
        );
    }

    // Error state
    if (error) {
        return <p className="text-danger text-center py-4">{error}</p>;
    }

    // Not logged in
    if (!currentUser) {
        return (
            <div className="p-4 d-flex flex-column justify-content-center align-items-center text-center">
                <div className="col-4">
                    Your order list is empty. Log in to start adding products and easily manage them from your orders!
                </div>
                <a
                    className="tf-btn mt-2 mb-3 text-white"
                    style={{ width: "fit-content" }}
                    href="#log"
                    data-bs-toggle="modal"
                >
                    Login Now
                </a>
            </div>
        );
    }

    // Safely handle empty or undefined myOrders
    const orderList = Array.isArray(myOrders?.data) ? myOrders.data : [];

    return (
        <div className="tf-sp-2">
            <div className="container">
                <div className="tf-wishlist">
                    {orderList.length > 0 ? (
                        <table className="tf-table-wishlist">
                            <thead>
                            <tr>
                                <th className="wishlist-item_image" />
                                <th className="wishlist-item_info">
                                    <p className="product-title fw-semibold">Product Name</p>
                                </th>
                                <th className="wishlist-item_price">
                                    <p className="product-title fw-semibold">Price</p>
                                </th>
                                <th className="wishlist-item_stock">
                                    <p className="product-title fw-semibold">Quantity</p>
                                </th>
                                <th className="wishlist-item_stock">
                                    <p className="product-title fw-semibold">Category</p>
                                </th>
                                <th className="wishlist-item_stock">
                                    <p className="product-title fw-semibold">Order ID</p>
                                </th>
                                <th className="wishlist-item_stock">
                                    <p className="product-title fw-semibold">Status</p>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {orderList.map((item, i) => (
                                <tr key={i} className="wishlist-item">
                                    <td className="wishlist-item_image">
                                        <Link to={`/product-detail/${item.product?.id}`}>
                                            <img
                                                src={getImageUrl(item.product?.photos?.[0] || "")}
                                                alt={item.product?.title || "Product"}
                                                className="lazyload"
                                                width={500}
                                                height={500}
                                            />
                                        </Link>
                                    </td>
                                    <td className="wishlist-item_info">
                                        <Link
                                            className="text-line-clamp-2 body-md-2 fw-semibold text-secondary link"
                                            to={`/product-detail/${item.product?.id}`}
                                        >
                                            {item.product?.title || "Unnamed Product"}
                                        </Link>
                                    </td>
                                    <td className="wishlist-item_price">
                                        <p className="price-wrap fw-medium flex-nowrap">
                                            <span className="new-price price-text fw-medium mb-0">
                                              {item.product?.price != null && !isNaN(item.product?.price)
                                                  ? parseFloat(item.product.price).toFixed(2)
                                                  : "N/A"}{" "}
                                                AED
                                            </span>
                                        </p>
                                    </td>
                                    <td className="wishlist-item_stock">
                                        <span>{item.product?.quantity || 1}</span>
                                    </td>
                                    <td className="wishlist-item_stock">
                                        <span>{item.category_title || "N/A"}</span>
                                    </td>
                                    <td className="wishlist-item_stock">
                                        <span>{item.order_id}</span>
                                    </td>
                                    <td className="wishlist-item_stock">
                      <span
                          className={`order-status ${
                              item.status === "CAPTURED"
                                  ? "text-success"
                                  : item.status === "FAILED"
                                      ? "text-danger"
                                      : "text-warning"
                          }`}
                      >
                        {item.status}
                      </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-4 d-flex flex-column justify-content-center align-items-center text-center">
                            <div className="col-4">
                                You haven’t placed any orders yet. Start shopping to create your first order!
                            </div>
                            <Link
                                className="tf-btn mt-2 mb-3"
                                style={{ width: "fit-content" }}
                                to="/shop-fullwidth"
                            >
                                Explore Products
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
