import { fetchWrapper } from "@/utlis/fetchWrapper.js";

/**
 * Get all cart items for a specific user
 * @param {number} userId - ID of the user
 * @returns {Promise<object>} - cart response
 */
export const getCartByUser = async (userId) => {
    try {
        return await fetchWrapper(`/cart/${userId}`);
    } catch (err) {
        console.error("Error fetching user cart:", err);
        throw err;
    }
};

/**
 * Add a product to the user's cart
 * @param {number} userId - ID of the user
 * @param {number} productId - ID of the product
 * @param postCategory
 * @param {number} quantity - Quantity to add
 * @returns {Promise<object>} - cart response
 */
export const addToCartAPI = async (userId, productId, postCategory, quantity = 1) => {
    try {
        return await fetchWrapper(`/cart/add`, {
            method: "POST",
            body: JSON.stringify({
                user_id: userId,
                product_id: productId,
                post_category: postCategory,
                quantity,
            }),
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("Error adding to cart:", err);
        throw err;
    }
};

/**
 * Update a product's quantity in the cart
 * @param {number} userId - ID of the user
 * @param {number} productId - ID of the product
 * @param {number} quantity - New quantity
 * @returns {Promise<object>} - cart response
 */
export const updateCartAPI = async (userId, productId, quantity) => {
    try {
        return await fetchWrapper(`/cart/update}`, {
            method: "PUT",
            body: JSON.stringify({
                user_id: userId,
                product_id: productId,
                quantity,
            }),
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("Error updating cart quantity:", err);
        throw err;
    }
};

/**
 * Remove a product from the cart
 * @param {number} userId - ID of the user
 * @param {number} productId - ID of the product
 * @param category
 * @returns {Promise<object>} - cart response
 */
export const removeFromCartAPI = async (userId, productId, category) => {
    try {
        return await fetchWrapper(`/cart/remove`, {
            method: "DELETE",
            body: JSON.stringify({
                user_id: userId,
                product_id: productId,
                post_category: category,
            }),
            headers: { "Content-Type": "application/json" },
        });
    } catch (err) {
        console.error("Error removing from cart:", err);
        throw err;
    }
};
