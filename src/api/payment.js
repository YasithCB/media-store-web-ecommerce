import {fetchWrapper} from "@/utlis/fetchWrapper.js";

/**
 * ✅ Verify Tap payment (called from redirect or success page)
 * @param {string} tapId - Tap charge ID from redirect query
 * @returns {Promise<object>} - Verified payment details
 */
export const verifyTapPayment = async (tapId) => {
    try {
        return await fetchWrapper(`/payments/verify?tap_id=${tapId}`);
    } catch (err) {
        console.error("Error verifying payment:", err);
        throw err;
    }
};

/**
 * 🧾 Create Tap Hosted Checkout Payment
 * @param {object} payload - Payment info
 * @returns {Promise<object>} - Response from backend
 */
export const createCharge = async (payload) => {
    try {
        // Your backend endpoint will call Tap API with secret key
        return await fetchWrapper("/payments/create-charge", {
            method: "POST",
            body: JSON.stringify({
                amount: payload.amount || 1140,
                token_id: payload.token_id,
                order_id: payload.order_id,
                currency: payload.currency || "AED",
                description: payload.description || "N/A",
                customer_name: payload.customer_name || "N/A",
                customer_email: payload.customer_email || "N/A",
                customer_phone: payload.customer_phone || 'N/A',
            }),
        });
    } catch (err) {
        console.error("Error creating Tap payment:", err);
        throw err;
    }
};

/**
 * 🧾 Create Tap Hosted Checkout Payment
 * @param {String} chargeId - chargeId
 * @returns {Promise<object>} - Response from backend
 */
export const charge = async (chargeId) => {
    try {
        // Your backend endpoint will call Tap API with secret key
        return await fetchWrapper(`/payments/payment-details/${chargeId}`, {
            method: "get",
        });
    } catch (err) {
        console.error("Error charging Tap payment:", err);
        throw err;
    }
};

/**
 * 💳 Save order/payment in backend
 * @param {Object} paymentData - Payment/order data
 * @param {string} paymentData.tap_id - Tap charge ID
 * @param {string} paymentData.order_id - Order ID
 * @param {string|number} paymentData.user_id - User ID
 * @param {string|number} paymentData.cus_id - Customer ID
 * @param {string} [paymentData.customer_name] - Customer name
 * @param {string} [paymentData.customer_email] - Customer email
 * @param {number} paymentData.amount - Payment amount
 * @param {string} [paymentData.currency] - Currency code (default 'AED')
 * @param {string} [paymentData.description] - Description
 * @param {string} [paymentData.status] - Payment status (default 'INITIATED')
 * @param {string} [paymentData.payment_method] - Card or payment method
 * @param {object} [paymentData.response_data] - Full response JSON
 * @returns {Promise<object>} - Backend response
 */
export const saveOrder = async (paymentData) => {
    try {
        return await fetchWrapper("/payments/save-payment-details", {
            method: "post",
            body: JSON.stringify({
                tap_id: paymentData.tap_id || null,
                order_id: paymentData.order_id || null,
                user_id: paymentData.user_id,
                cus_id: paymentData.cus_id,
                customer_name: paymentData.customer_name || '',
                customer_email: paymentData.customer_email || '',
                amount: paymentData.amount,
                currency: paymentData.currency || 'AED',
                description: paymentData.description || '',
                status: paymentData.status || 'INITIATED',
                payment_method: paymentData.payment_method || '',
                response_data: paymentData.response_data || null,
                items: paymentData.items
            }),
        });
    } catch (err) {
        console.error("Error saving order/payment:", err);
        throw err;
    }
};

/**
 * 🌟 Fetch all orders for a specific user
 * @param {string|number} userId
 * @returns {Promise<Array>} - Array of orders
 */
export const getOrdersByUser = async (userId) => {
    try {
        if (!userId) throw new Error("User ID is required");

        return await fetchWrapper(`/orders/${userId}`, {
            method: "get",
        });
    } catch (err) {
        console.error("Error fetching orders by user:", err);
        throw err;
    }
};
