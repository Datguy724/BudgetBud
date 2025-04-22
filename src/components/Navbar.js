import React, { useContext } from "react";
// import budgetBudLogo from '../images/logo.png';
import logo from '../images/logo.png';
import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import { AuthContext } from "../context/AuthContext.js";

function Navbar(){
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="navbar">
            {/* <div className="navbar__left"> */}
            <div className="navbar__logo-container">
                <Link to="/" className="navbar__link">
                    <img src={logo} alt="BudgetBud Logo" className="navbar__logo" />
                </Link>
            </div>

            <ul className="navbar__links">
                {isAuthenticated ? (
                    <>
                        <li><Link to="/dashboard" className="navbar__link">Dashboard</Link></li>
                        <li><Link to="/income" className="navbar__link">Income</Link></li>
                        <li><Link to="/expenses" className="navbar__link">Expenses</Link></li>
                        <li><Link to="/budgeting" className="navbar__link">Budgeting</Link></li>
                    </>
                ) : (
                    <>
                    <li><Link to="/" className="navbar__link">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#resources">Resources</a></li>
                    </>
                )}
            </ul>
            {/* </div> */}
            <div className="navbar__right">
                {isAuthenticated ? (
                    <button onClick={handleLogout} className="btn logout-btn">Logout</button>
                ) : (
                <>
                    <Link to="/signin" className="navbar__link">
                        <button className="btn login-btn">Login</button>
                    </Link>
                    <Link to="/signup" className="navbar__link">
                        <button className="btn cta-btn">Try BudgetBud</button>
                    </Link>
                </>
            )}
            </div>
        </nav>
    );
}

export default Navbar;