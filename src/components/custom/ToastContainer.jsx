import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Optional: custom wrapper for convenience
export const SmartToast = {
    success: (msg, options = {}) => toast.success(msg, { autoClose: 3000, ...options }),
    error: (msg, options = {}) => toast.error(msg, { autoClose: 5000, ...options }),
    info: (msg, options = {}) => toast.info(msg, { autoClose: 3000, ...options }),
    warn: (msg, options = {}) => toast.warn(msg, { autoClose: 3000, ...options }),
};

// Component to include once in the app
export const SmartToastContainer = () => (
    <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    />
);
