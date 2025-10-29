import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {charge, saveOrder} from "@/api/payment.js";
import {useContextElement} from "@/context/Context.jsx";
import LoadingDots from "@/components/custom/loadingDots.jsx";

export default function OrderDetails() {
    const {currentUser} = useContextElement();

    const [paymentDetails, setPaymentDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const chargeId = new URLSearchParams(window.location.search).get("tap_id");

    useEffect(() => {
        const getPaymentResults = async () => {
            if (!chargeId) return alert("No charge ID found!");

            try {
                const res = await charge(chargeId); // call backend
                setPaymentDetails(res.data); // from backend’s success response
            } catch (error) {
                alert("Failed to fetch payment details: " + error.message);
            } finally {
                setLoading(false);
            }
        };

         getPaymentResults();
    }, []);

    useEffect(() => {
        if (!chargeId || !currentUser) return; // wait until both are available

        const fetchAndSavePayment = async () => {
            setLoading(true);
            try {
                // 1️⃣ Get payment details from backend
                const res = await charge(chargeId);
                const paymentDetails = res.data; // get data from backend

                if (!paymentDetails) throw new Error("Payment details not found");

                // 2️⃣ Prepare order data
                const paymentData = {
                    tap_id: chargeId,
                    order_id: paymentDetails.reference?.order || '',
                    user_id: currentUser.id,
                    cus_id: paymentDetails.customer.id,
                    customer_name: paymentDetails.customer.first_name || 'N/A',
                    customer_email: paymentDetails.customer.email || 'N/A',
                    amount: paymentDetails.amount || 'N/A',
                    currency: paymentDetails.currency || 'AED',
                    description: paymentDetails.description || 'N/A',
                    status: paymentDetails.status || 'INITIATED',
                    payment_method: paymentDetails.source?.payment_method || '',
                    response_data: paymentDetails
                };

                // 3️⃣ Save order/payment in backend
                const saveRes = await saveOrder(paymentData);

                console.log("Saved order/payment:", saveRes);

            } catch (err) {
                alert("Failed to fetch/save payment details: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAndSavePayment();

    }, [chargeId, currentUser]); // rerun whenever chargeId or currentUser changes


    if (loading) {
        return (
            <section className="tf-sp-2">
                <div className="container text-center py-5">
                    <p className="mt-3">Verifying your payment...</p>
                    <LoadingDots />
                </div>
            </section>
        );
    }

    if (!paymentDetails) {
        return (
            <section className="tf-sp-2">
                <div className="container text-center py-5">
                    <p>Payment not found or failed.</p>
                </div>
            </section>
        );
    }

    // Extract clean fields from Tap response
    const {
        id,
        amount,
        currency,
        status,
        description,
        customer,
        reference,
        transaction,
        merchant,
    } = paymentDetails;

    return (
        <section className="tf-sp-2 pt-1">
            <div className="container">
                {/* ✅ Status Header */}
                <div className="order-notice text-center mb-5">
                  <span className="icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={150}
                        height={150}
                        fill="#28a745"
                        viewBox="0 0 256 256"
                    >
                      <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34Z" />
                    </svg>
                  </span>
                    <h4 className="fw-bold text-success">Payment Successful!</h4>
                    <p>Thank you. Your order has been received and confirmed.</p>
                </div>

                {/* ✅ Order Overview */}
                <ul className="order-overview-list mb-4">
                    <li>
                        Order number: <strong>{reference?.order || "N/A"}</strong>
                    </li>
                    <li>
                        Date:{" "}
                        <strong>
                            {new Date(Number(transaction?.date?.created)).toLocaleString()}
                        </strong>
                    </li>
                    <li>
                        Total:{" "}
                        <strong>
                            {amount} {currency}
                        </strong>
                    </li>
                    <li>
                        Payment method: <strong>{paymentDetails.source?.payment_method}</strong>
                    </li>
                    <li>
                        Status:{" "}
                        <strong className="text-success">
                            {status?.toUpperCase()}
                        </strong>
                    </li>
                </ul>

                {/* ✅ Details */}
                <div className="order-detail-wrap mb-5">
                    <h5 className="fw-bold">Transaction Details</h5>
                    <table className="tf-table-order-detail">
                        <tbody>
                        <tr>
                            <td>Transaction ID</td>
                            <td>{id}</td>
                        </tr>
                        <tr>
                            <td>Description</td>
                            <td>{description}</td>
                        </tr>
                        <tr>
                            <td>Merchant ID</td>
                            <td>{merchant?.id}</td>
                        </tr>
                        <tr>
                            <td>Authorization Code</td>
                            <td>{transaction?.authorization_id}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                {/* ✅ Billing */}
                <div className="row gap-30">
                    <div className="col-sm-6">
                        <div className="order-detail-wrap">
                            <h5 className="fw-bold">Billing Details</h5>
                            <div className="billing-info">
                                <p>{customer.id}</p>
                                <p>
                                    {customer.first_name}
                                </p>
                                <p>{customer.email}</p>
                                <p>
                                    {currentUser.phone}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="order-detail-wrap">
                            <h5 className="fw-bold">Payment Reference</h5>
                            <div className="billing-info">
                                <p>Track ID: {reference?.track}</p>
                                <p>Payment Ref: {reference?.payment}</p>
                                <p>Gateway Ref: {reference?.gateway}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ✅ Back Button */}
                <div className="text-center mt-5">
                    <Link to="/" className="tf-btn-dark px-4 py-2 rounded-2">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </section>
    );
}
