import React, { useState } from "react";
import { forgotPassword, resetPassword } from "@/api/auth.js";
import {toast} from "react-toastify";

export default function ForgotPasswordModal({ setShowForgot, setShowLogin }) {
    const [step, setStep] = useState(1); // 1 = enter email, 2 = reset password
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [role, setRole] = useState("user"); // <-- "user" or "dealer"

    const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

    // Step 1: send reset code
    const handleSendCode = async (e) => {
        e.preventDefault();
        setError("");

        if (!email.trim() || !validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        setLoading(true);
        try {
            const res = await forgotPassword({ email }, role);
            setStep(2);
            toast.success(res.message || "Reset code sent to your email")
        } catch (err) {
            toast.success(err.message || "Failed to send reset code")
        } finally {
            setLoading(false);
        }
    };

    // Step 2: reset password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");

        if (!code.trim()) {
            setError("Please enter the code sent to your email");
            return;
        }
        if (newPassword.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const res = await resetPassword({ email, code, newPassword }, role);
            toast.success(res.message || "Password reset successfully!")

            setShowForgot(false);
            setShowLogin(true);
        } catch (err) {
            setError(err.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Overlay */}
            <div
                className="modal-overlay"
                style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    zIndex: 1050,
                }}
                onClick={() => setShowForgot(false)}
            />

            {/* Modal content */}
            <div
                className="modalCentered bg-white"
                style={{
                    display: "block",
                    position: "fixed",
                    borderRadius: '15px',
                    padding: '15px',
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 1060,
                    width: "100%",
                    maxWidth: "400px",
                }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
            <span
                className="icon icon-close"
                onClick={() => setShowForgot(false)}
                style={{ cursor: "pointer", position: "absolute", top: "10px", right: "10px" }}
            />

                        <div className="modal-log-wrap list-file-delete p-4">
                            <h5 className="title fw-semibold text-center mb-3">
                                {step === 1 ? "Forgot Password" : "Reset Password"}
                            </h5>

                            {/* Role Tabs */}
                            <div className="login-role-tabs d-flex justify-content-center mb-3">
                                <button
                                    type="button"
                                    className={`role-tab ${role === "user" ? "active" : ""}`}
                                    onClick={() => setRole("user")}
                                >
                                    User
                                </button>
                                <button
                                    type="button"
                                    className={`role-tab ${role === "dealer" ? "active" : ""}`}
                                    onClick={() => setRole("dealer")}
                                >
                                    Dealer
                                </button>
                            </div>

                            <form
                                onSubmit={step === 1 ? handleSendCode : handleResetPassword}
                                className="form-log"
                            >
                                <div className="form-content">
                                    <fieldset className="mb-3">
                                        <label className="fw-semibold body-md-2">Email *</label>
                                        <input
                                            type="email"
                                            placeholder="Your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            disabled={step === 2} // lock email during reset
                                            className="form-control"
                                        />
                                    </fieldset>

                                    {step === 2 && (
                                        <>
                                            <fieldset className="mb-3">
                                                <label className="fw-semibold body-md-2">Reset Code *</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter the code"
                                                    value={code}
                                                    onChange={(e) => setCode(e.target.value)}
                                                    required
                                                    className="form-control"
                                                />
                                            </fieldset>

                                            <fieldset className="mb-3">
                                                <label className="fw-semibold body-md-2">New Password *</label>
                                                <input
                                                    type="password"
                                                    placeholder="Enter new password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    required
                                                    className="form-control"
                                                />
                                            </fieldset>

                                            <fieldset className="mb-3">
                                                <label className="fw-semibold body-md-2">Confirm Password *</label>
                                                <input
                                                    type="password"
                                                    placeholder="Confirm new password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    required
                                                    className="form-control"
                                                />
                                            </fieldset>
                                        </>
                                    )}

                                    {error && <p className="text-danger">{error}</p>}

                                    <button
                                        type="submit"
                                        className="tf-btn w-100 mt-3"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? step === 1
                                                ? "Sending code..."
                                                : "Resetting password..."
                                            : step === 1
                                                ? "Send Reset Code"
                                                : "Reset Password"}
                                    </button>

                                    <p className="body-text-3 text-center mt-3">
                                        Remember your password?
                                        <span
                                            onClick={() => {
                                                setShowForgot(false);
                                                setShowLogin(true);
                                            }}
                                            className="fw-bold ms-2 cs-pointer"
                                        >
                                            Login Here
                                        </span>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
