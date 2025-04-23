import React from 'react';
import './NotFoundPage.css';
import { Link } from 'react-router-dom';

// 404 Not Found Page
function NotFoundPage() {
    return (
        <div className="not-found-page">
        <h1 className="not-found-title">404 Not Found</h1>
        <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="not-found-link">Go back to Home</Link>
        </div>
    );
}

export default NotFoundPage;