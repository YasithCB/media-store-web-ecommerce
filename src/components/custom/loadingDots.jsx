import React from "react";
import "./LoadingDots.sass";

const LoadingDots = () => {
    return (
        <div className="loading-dots-container d-flex justify-content-center align-items-center">
            <div className="loading-dots">
                <span className="dot bg-dark"></span>
                <span className="dot bg-dark"></span>
                <span className="dot bg-dark"></span>
            </div>
        </div>
    );
};

export default LoadingDots;
