import React from "react";
// import budgetBudLogo from '../images/logo.png';
import logo from '../images/logo.png';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar(){
    return (
        <nav className="navbar">
            {/* <div className="navbar__left"> */}
            <div className="navbar__logo-container">
                <Link to="/" className="navbar__link">
                    <img src={logo} alt="BudgetBud Logo" className="navbar__logo" />
                </Link>
            </div>

            <ul className="navbar__links">
                <li><a href="../about">About Us</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#resources">Resources</a></li>
            </ul>
            {/* </div> */}
                <div className="navbar__right">
                <Link to="/signin" className="navbar__link">
                    <button className="btn login-btn">Login</button>
                </Link>
                <Link to="/signup" className="navbar__link">
                    <button className="btn cta-btn">Try BudgetBud</button>
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;