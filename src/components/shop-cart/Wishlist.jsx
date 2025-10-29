import React, {useEffect} from "react";
import {Link} from "react-router-dom";

import {useContextElement} from "@/context/Context";
import {getImageUrl} from "@/utlis/util.js";
import Swal from "sweetalert2";
import {addToCartAPI} from "@/api/cart.js";

export default function Wishlist() {
    const {
        wishList,
        cartProducts,
        setCartProducts,
        fetchWishlistFromDB,
        currentUser,
        removeFromWishlist,
        isAddedToCartProducts,
    } = useContextElement();

    useEffect(() => {
        if (currentUser?.id) {
            fetchWishlistFromDB(currentUser.id);
        }
    }, [currentUser]); // run when user logs in or changes

    function confirmAndRemove(productId, productCategory, removeFromWishlist) {
        Swal.fire({
            title: "Remove from Wishlist?",
            text: "Are you sure you want to remove this item?",
            icon: "warning",
            iconColor: '#212529',
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#212529",
            confirmButtonText: "Yes, remove it",
        }).then((result) => {
            if (result.isConfirmed) {
                removeFromWishlist(productId, productCategory);
                Swal.fire({
                    title: "Removed!",
                    text: "Item has been removed from your wishlist.",
                    icon: "success",
                    confirmButtonColor: "#212529",
                });
            }
        });
    }

    if (!currentUser)
        return (
            <div className="p-4 d-flex flex-column justify-content-center align-items-center text-center">
                <div className="col-4">
                    Your wishlist is empty. Log in to start adding favorite products and easily manage them from your
                    wishlist!
                </div>
                <a
                    className="tf-btn mt-2 mb-3 text-white"
                    style={{width: "fit-content"}}
                    href="#log"
                    data-bs-toggle="modal"
                >
                    Login Now
                </a>
            </div>
        )

    return (
        <div className="tf-sp-2">
            <div className="container">
                <div className="tf-wishlist">
                    {wishList.length ? (
                        <table className="tf-table-wishlist">
                            <thead>
                            <tr>
                                <th className="wishlist-item_remove"/>
                                <th className="wishlist-item_image"/>
                                <th className="wishlist-item_info">
                                    <p className="product-title fw-semibold">Product Name</p>
                                </th>
                                <th className="wishlist-item_price">
                                    <p className="product-title fw-semibold">Unit Price</p>
                                </th>
                                <th className="wishlist-item_stock">
                                    <p className="product-title fw-semibold">Stock Status</p>
                                </th>
                                <th className="wishlist-item_action"/>
                            </tr>
                            </thead>
                            <tbody>
                            {wishList.map((product, i) => (
                                <tr key={i} className="wishlist-item">
                                    <td
                                        className="wishlist-item_remove"
                                        onClick={() => confirmAndRemove(product.id, product.category_title, removeFromWishlist)}
                                    >
                                        <i className="icon-close remove link cs-pointer"/>
                                    </td>
                                    <td className="wishlist-item_image">
                                        <Link to={`/product-detail/${product.id}`}>
                                            <img
                                                src={getImageUrl(product.photos?.[0] || "")}
                                                alt="Image"
                                                className="lazyload"
                                                width={500}
                                                height={500}
                                            />
                                        </Link>
                                    </td>
                                    <td className="wishlist-item_info">
                                        <Link
                                            className="text-line-clamp-2 body-md-2 fw-semibold text-secondary link"
                                            to={`/product-detail/${product.id}`}
                                        >
                                            {product.title}
                                        </Link>
                                    </td>
                                    <td className="wishlist-item_price">
                                        <p className="price-wrap fw-medium flex-nowrap">
                        <span className="new-price price-text fw-medium mb-0">
                          {product.price != null && !isNaN(product.price)
                              ? parseFloat(product.price).toFixed(2)
                              : "N/A"} AED
                        </span>
                                        </p>
                                    </td>
                                    <td className="wishlist-item_stock">
                                        <span className="wishlist-stock-status">In Stock</span>
                                    </td>
                                    <td className="wishlist-item_action">
                                        <button
                                            type="button"
                                            className="tf-btn btn-gray"
                                            onClick={() => {
                                                // Immediately update state for UI
                                                const productInCart = cartProducts.find((item) => item.id === product.id);
                                                if (!productInCart) {
                                                    const newItem = {...product, quantity: 1};
                                                    setCartProducts((prev) => [...prev, newItem]);
                                                    localStorage.setItem("cartList", JSON.stringify([...cartProducts, newItem]));
                                                } else {
                                                    // Optional: increment quantity
                                                    const updated = cartProducts.map((item) =>
                                                        item.id === product.id ? {
                                                            ...item,
                                                            quantity: item.quantity + 1
                                                        } : item
                                                    );
                                                    setCartProducts(updated);
                                                    localStorage.setItem("cartList", JSON.stringify(updated));
                                                }

                                                // Call API asynchronously, no need to await here
                                                if (currentUser) {
                                                    addToCartAPI(currentUser.id, product.id, product.category_title).catch(console.error);
                                                }

                                                // Refresh wishlist if needed
                                                fetchWishlistFromDB().catch(console.error);
                                            }}
                                        >
                                            <span className="text-white">
                                              {isAddedToCartProducts(product.id) ? "Already Added" : "Add to Cart"}
                                            </span>
                                        </button>
                                    </td>

                                </tr>
                            ))}
                            </tbody>
                            <tfoot className="d-none">
                            <tr>
                                <td colSpan={6} className="text-center">
                                    No products added to the wishlist
                                </td>
                            </tr>
                            </tfoot>
                        </table>
                    ) : (
                        <div className="p-4 d-flex flex-column justify-content-center align-items-center text-center">
                            <div className="col-4">
                                Your wishlist is empty. Start adding favorite products to
                                wishlist!{" "}
                            </div>
                            <a
                                className="tf-btn mt-2 mb-3 text-white"
                                style={{width: "fit-content"}}
                                href="/shop-default"
                            >
                                Explore Products
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
