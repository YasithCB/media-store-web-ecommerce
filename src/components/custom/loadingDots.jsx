import React from "react";
import "src/components/custom/loadingDots.sass";

const LoadingDots = ({className = ''}) => {
    return (
        <div className={`${className} loading-dots-container d-flex justify-content-center align-items-center`}>
            <div className="loading-dots">
                <span className="dot bg-dark"></span>
                <span className="dot bg-dark"></span>
                <span className="dot bg-dark"></span>
            </div>
        </div>
    );
};

export default LoadingDots;
