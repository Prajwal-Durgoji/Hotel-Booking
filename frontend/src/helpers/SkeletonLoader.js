import React from 'react';
import './SkeletonLoader.css'; // Make sure to create this CSS file

const SkeletonLoader = () => {
    return (
        <div className="skeleton-loader">
            <div className="skeleton-header"></div>
            <div className="skeleton-paragraph"></div>
            <div className="skeleton-cards">
                <div className="skeleton-card"></div>
                <div className="skeleton-card"></div>
                <div className="skeleton-card"></div>
            </div>
        </div>
    );
};

export default SkeletonLoader;