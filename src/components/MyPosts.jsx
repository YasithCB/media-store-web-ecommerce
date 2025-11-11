import React, { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { useContextElement } from "@/context/Context";
import { getImageUrl } from "@/utlis/util.js";
import LoadingDots from "@/components/custom/loadingDots.jsx";
import Swal from "sweetalert2";
import {deletePostById} from "@/api/posts.js";

export default function MyPosts() {
    const { currentUser, fetchMyPostsFromDB, myPosts,setMyPosts  } = useContextElement();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!currentUser) return;

        const loadPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                await new Promise((res) => setTimeout(res, 1000));
                await fetchMyPostsFromDB();
            } catch (err) {
                console.error(err);
                setError("Failed to fetch posts");
            } finally {
                setLoading(false);
            }
        };

        loadPosts();
    }, [currentUser]);

    if (loading) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center py-5">
                <p className="mb-2">Loading posts...</p>
                <LoadingDots />
            </div>
        );
    }

    if (error) {
        return <p className="text-danger text-center py-4">{error}</p>;
    }

    if (!currentUser) {
        return (
            <div className="p-4 d-flex flex-column justify-content-center align-items-center text-center">
                <div className="col-4">
                    Your post list is empty. Log in to manage your posts easily!
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

    const handleDelete = async (postId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#000",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            iconColor: '#d33'
        });

        if (result.isConfirmed) {
            try {
                await deletePostById(postId);
                // ✅ Remove the deleted post from the local state immediately
                const updatedPosts = myPosts.data.filter(post => post.id !== postId);
                setMyPosts(prev => ({ ...prev, data: updatedPosts }));

                await Swal.fire({
                    title: "Deleted!",
                    text: "Your post has been deleted.",
                    icon: "success",
                    confirmButtonColor: "black" // make success button green
                });

            } catch (err) {
                await Swal.fire("Error!", "Failed to delete post.", "error");
            }
        }
    };

    const postsList = Array.isArray(myPosts?.data) ? myPosts.data : [];

    return (
        <div className="tf-sp-2">
            <div className="container">
                <div className="tf-wishlist">
                    {postsList.length > 0 ? (
                        <table className="tf-table-wishlist">
                            <thead>
                            <tr>
                                <th className="wishlist-item_image" />
                                <th className="wishlist-item_info">
                                    <p className="product-title fw-semibold">Title</p>
                                </th>
                                <th className="wishlist-item_price">
                                    <p className="product-title fw-semibold">Description</p>
                                </th>
                                <th className="wishlist-item_price">
                                    <p className="product-title fw-semibold">Price / Salary</p>
                                </th>
                                <th className="wishlist-item_stock">
                                    <p className="product-title fw-semibold">Type</p>
                                </th>
                                <th className="wishlist-item_stock text-center">
                                    <p className="product-title fw-semibold">Actions</p>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {postsList.map((item, i) => (
                                <tr key={i} className="wishlist-item">
                                    {/* Image */}
                                    <td className="wishlist-item_image">
                                        {item.image ? (
                                            <img
                                                src={getImageUrl(item.image)}
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
                                            {item.title}
                                        </p>
                                    </td>

                                    {/* Description */}
                                    <td className="wishlist-item_price" style={{ maxWidth: "300px" }}>
                                        <p className="text-truncate mb-0">{item.description}</p>
                                    </td>

                                    {/* Price / Salary */}
                                    <td className="wishlist-item_price">
                                        {item.price
                                            ? `${parseFloat(item.price).toFixed(2)} AED`
                                            : item.salary
                                                ? `${parseFloat(item.salary).toFixed(2)} AED`
                                                : "N/A"}
                                    </td>

                                    {/* Type */}
                                    <td className="wishlist-item_stock text-capitalize">
                                        {item.type}
                                    </td>

                                    {/* Edit & Delete */}
                                    <td className="wishlist-item_stock text-center">
                                        <div className="d-flex justify-content-center gap-2">
                                            <button
                                                className="btn btn-sm btn-outline-dark"
                                                onClick={() => navigate(`/edit-post/${item.id}`)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
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
