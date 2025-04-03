import React from "react";
// import budgetBudLogo from '../images/logo.png';

function Navbar(){
    return (
        <nav className="navbar">
            <div className="navbar__left">
            <div className="navbar__logo">BudgetBud</div>
            <ul className="navbar__links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#resources">Resources</a></li>
            </ul>
            </div>
                <div className="navbar__right">
                <button className="btn login-btn">Login</button>
                <button className="btn cta-btn">Try BudgetBud</button>
            </div>
        </nav>
    );
}

export default Navbar;