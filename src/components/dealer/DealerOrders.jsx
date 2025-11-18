import React, { useState } from "react";
import {Link} from "react-router-dom";
import {formatDateTime, getImageUrl, getStatusBadge} from "@/utlis/util.js";
import Swal from "sweetalert2";
import {markOrderDelivered, markOrderReady, markOrderShipped} from "@/api/dealers.js";
import {toast} from "react-toastify";

export default function DealerOrders({data}) {
    const [ordersList, setOrdersList] = useState(data);

    if (!data) {
        return (
            <div className="p-4 d-flex flex-column justify-content-center align-items-center text-center">
                <div className="col-4">
                    Your Orders list is empty!
                </div>
            </div>
        );
    }

    const handleCancelOrder = async (postId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this and it will affect to your dealer account health",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#000",
            confirmButtonText: "Yes, Cancel it!",
            cancelButtonText: "Cancel",
            iconColor: '#d33'
        });

        if (result.isConfirmed) {
            try {
                //todo

                await Swal.fire({
                    title: "Cancelled!",
                    text: "Your order has been cancelled.",
                    icon: "success",
                    confirmButtonColor: "black" // make success button green
                });

            } catch (err) {
                await Swal.fire("Error!", "Failed to delete post.", "error");
            }
        }
    };

    const HandleOrderStatus = async (orderId, orderStatus) => {
        const result = await Swal.fire({
            title: `${orderStatus === 'PENDING' ? 'Order Ready to Ship?' : 'Order Shipped?'}`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#daa500",
            cancelButtonColor: "#000",
            confirmButtonText: `${ orderStatus === 'PENDING' ? 'Yes, Mark it as Ready!' : 'Yes, Already Shipped'}`,
            cancelButtonText: "Cancel",
            iconColor: '#daa500'
        });

        if (result.isConfirmed) {
            try {
                let res;

                switch (orderStatus) {
                    case "PENDING":
                        // Mark order as Ready if it's currently Pending
                        res = await markOrderReady(orderId);
                        break;

                    case "READY":
                        // Mark order as Shipped if it's currently ready
                        res = await markOrderShipped(orderId);
                        break;

                    default:
                        return toast.error("Unknown order status.");
                }

                if (res.status === 'success') {
                    await Swal.fire({
                        title: `${ orderStatus === 'PENDING' ? 'Ready to Ship!' : 'Shipped!'}`,
                        text: `${ orderStatus === 'PENDING' ? 'You can now ship the product' : 'We will wait for the delivery'}`,
                        icon: "success",
                        confirmButtonColor: "black" // make success button green
                    });

                    if (orderStatus === 'PENDING') {
                        setOrdersList(prev =>
                            prev.map(order =>
                                order.id === orderId ? { ...order, status: "READY" } : order
                            )
                        );
                    }else if (orderStatus === 'READY') {
                        setOrdersList(prev =>
                            prev.map(order =>
                                order.id === orderId ? { ...order, status: "SHIPPED" } : order
                            )
                        );
                    }
                }else {
                    toast.error(res.message)
                }

            } catch (err) {
                await Swal.fire({
                    title: "Error!",
                    text: "Failed to change order status",
                    icon: "error",
                    confirmButtonColor: "black" // make success button green
                });
            }
        }
    };

    const HandleOrderDelivered = async (orderId) => {
        const result = await Swal.fire({
            title: 'Order Delivered?',
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#daa500",
            cancelButtonColor: "#000",
            confirmButtonText: 'Yes Order Delivered!',
            cancelButtonText: "Cancel",
            iconColor: '#daa500'
        });

        if (result.isConfirmed) {
            try {
                let res = await markOrderDelivered(orderId);

                if (res.status === 'success') {
                    await Swal.fire({
                        title: "Done!",
                        text: 'Order Completed',
                        icon: "success",
                        confirmButtonColor: "black" // make success button green
                    });

                    setOrdersList(prev =>
                        prev.map(order =>
                            order.id === orderId ? { ...order, status: "DELIVERED" } : order
                        )
                    );

                }else {
                    toast.error(res.message)
                }

            } catch (err) {
                await Swal.fire({
                    title: "Error!",
                    text: "Failed to change order status.",
                    icon: "error",
                    confirmButtonColor: "black" // make success button green
                });
            }
        }
    };

    return (
        <div className="tf-sp-2">
            <div className="container">
                <div className="tf-wishlist">
                    {ordersList.length > 0 ? (
                        <table className="tf-table-wishlist">
                            <thead>
                            <tr>
                                <th className="wishlist-item_image" />
                                <th className="wishlist-item_info">
                                    <p className="product-title fw-semibold">Title</p>
                                </th>
                                <th className="wishlist-item_info">
                                    <p className="product-title fw-semibold">Status</p>
                                </th>
                                <th className="wishlist-item_price">
                                    <p className="product-title fw-semibold">QTY</p>
                                </th>
                                <th className="wishlist-item_price">
                                    <p className="product-title fw-semibold">Price</p>
                                </th>
                                <th className="wishlist-item_stock">
                                    <p className="product-title fw-semibold">Time</p>
                                </th>
                                <th className="wishlist-item_stock">
                                    <p className="product-title fw-semibold">Location</p>
                                </th>
                                <th className="wishlist-item_stock text-center">
                                    <p className="product-title fw-semibold">Actions</p>
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                            {ordersList.map((item, i) => (
                                <tr key={i} className="wishlist-item">
                                    {/* Image */}
                                    <td className="wishlist-item_image">
                                        {item.product.photos[0] ? (
                                            <img
                                                src={getImageUrl(item.product.photos[0])}
                                                alt={item.title}
                                                className="lazyload"
                                                width={80}
                                                height={80}
                                                style={{ borderRadius: "8px", objectFit: "cover" }}
                                            />
                                        ) : (
                                            <div
                                                style={{
                                                    width: "80px",
                                                    height: "80px",
                                                    borderRadius: "8px",
                                                    background: "#f0f0f0",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    color: "#aaa",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                No Image
                                            </div>
                                        )}
                                    </td>

                                    {/* Title */}
                                    <td className="wishlist-item_info">
                                        <p className="body-md-2 fw-semibold text-secondary mb-0">
                                            {item.product.title}
                                        </p>
                                    </td>

                                    {/* STATUS */}
                                    <td className="wishlist-item_info">
                                        {(() => {
                                            const badge = getStatusBadge(item.status);
                                            return (
                                                <span
                                                    style={{
                                                        backgroundColor: badge.bg,
                                                        color: badge.color,
                                                        padding: "6px 14px",
                                                        borderRadius: "12px",
                                                        fontSize: "0.85rem",
                                                        fontWeight: 600,
                                                        display: "inline-block",
                                                        textTransform: "capitalize"
                                                    }}
                                                >
                                                    {item.status.replace(/_/g, " ")}
                                                </span>
                                            );
                                        })()}
                                    </td>


                                    {/* QTY */}
                                    <td className="wishlist-item_price" style={{ maxWidth: "300px" }}>
                                        <p className="text-truncate mb-0">{item.quantity}</p>
                                    </td>

                                    {/* Price */}
                                    <td className="wishlist-item_price fw-bold">
                                        {item.product.sale_price
                                            ? `${parseFloat(item.product.sale_price).toFixed(2)} AED`
                                            : `${parseFloat(item.product.price).toFixed(2)} AED`
                                        }
                                    </td>

                                    {/* Time */}
                                    <td className="wishlist-item_stock text-capitalize">
                                        {formatDateTime(item.created_at)}
                                    </td>

                                    {/* LOCATION */}
                                    <td className="wishlist-item_stock text-capitalize">
                                        Dubai, UAE
                                    </td>

                                    {/* Edit & Delete */}
                                    <td className="wishlist-item_stock text-center">
                                        { (item.status === 'PENDING' || item.status === 'READY') ?
                                            <div className="d-flex justify-content-center gap-2">
                                                <button
                                                    className="btn btn-sm btn-outline-dark fw-semibold"
                                                    onClick={() => HandleOrderStatus(item.id, item.status)}
                                                >
                                                    { item.status === 'PENDING' ? 'MARK AS READY' : item.status === 'READY' ? 'MARK AS SHIPPED' : ''}
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger fw-semibold"
                                                    onClick={() => handleCancelOrder(item.id)}
                                                >
                                                    CANCEL
                                                </button>
                                            </div>
                                            :
                                            ( item.status === 'SHIPPED' && (
                                                    <div className="d-flex justify-content-center gap-2">
                                                        <button
                                                            className="btn btn-sm btn-outline-dark fw-semibold"
                                                            onClick={() => HandleOrderDelivered(item.id)}
                                                        >
                                                            MARK AS DELIVERED
                                                        </button>
                                                    </div>
                                                )
                                            )
                                        }
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-4 d-flex flex-column justify-content-center align-items-center text-center">
                            <div className="col-4">
                                You haven’t added any posts yet. Create your first one now!
                            </div>
                            <Link
                                className="tf-btn mt-2 mb-3 text-white"
                                style={{ width: "fit-content" }}
                                to="/add-post"
                            >
                                Add Post
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
