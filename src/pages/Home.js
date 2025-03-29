import React from 'react';
import './HomePage.css';
// import piggyBank from '../assets/images/piggy-bank.png'; // Update the path as needed
import budgetBudLogo from '../images/logo.png';
function HomePage() {
  return (
    <div className="home-page">
      {/* NAVIGATION */}
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

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero__text">
          <h1>Your Money's Best Friend.</h1>
          <p>
            Managing your money has never been easier! BudgetBud is your 
            all-in-one budgeting companion—designed to help you track income, 
            monitor expenses, and visualize your financial habits.
          </p>
          <button className="btn smart-spend-btn">Try Smart Spend</button>
        </div>
        <div className="hero__image">
          <img src={budgetBudLogo} alt="budget bud logo" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__top">
          <div className="footer__logo">BudgetBud</div>
          <p className="footer__description">
            BudgetBud was created to empower individuals to take control 
            of their finances with ease.
          </p>
        </div>
        <div className="footer__bottom">
          <ul className="footer__links">
            <li><a href="#english">English</a></li>
            <li><a href="#terms">Terms & Policy</a></li>
            <li><a href="#security">Security</a></li>
          </ul>
          <span className="footer__copy">
            ©2025 BudgetBud
          </span>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
