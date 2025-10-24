import {fetchWrapper} from "@/utlis/fetchWrapper.js";

export const getWishlistByUser = async (id) => {
    return fetchWrapper(`/wishlist/${id}`);
};

/**
 * Add a post to the wishlist
 * @param userId
 * @param {number} postId - ID of the post
 * @param {string} postCategory - category / table name
 * @returns {Promise<object>} - wishlist response
 */
export const addToWishList = async (userId, postId, postCategory) => {
        try {
            return await fetchWrapper(`/wishlist/add/${postId}`, {
                method: "POST",
                body: JSON.stringify({
                    post_category: postCategory,
                    user_id: userId,
                    post_id: postId,
                }),
                headers: {"Content-Type": "application/json"},
            });
        } catch (err) {
            console.error("Error adding to wishlist:", err);
            throw err;
        }
};

/**
 * Remove a post from the wishlist
 * @param {number} userId - ID of the user
 * @param {number} postId - ID of the post
 * @param {string} postCategory - category / table name
 * @returns {Promise<object>} - wishlist response
 */
export const removeFromWishList = async (userId, postId, postCategory) => {
    try {
        return await fetchWrapper(`/wishlist/remove/${postId}`, {
            method: "DELETE",
            body: JSON.stringify({
                user_id: userId,
                post_id: postId,
                post_category: postCategory,
            }),
            headers: {"Content-Type": "application/json"},
        });
    } catch (err) {
        console.error("Error removing from wishlist:", err);
        throw err;
    }
};
