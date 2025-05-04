import React from 'react';
import './HomePage.css';
import piggyBank from '../images/piggyBankLogo.png';
// import budgetBudLogo from '../images/logo.png';
// import Navbar from './components/Navbar';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero__text">
          <h1>Your Money's <span className="highlight">Best Friend</span>.</h1>
          <p>
            Managing your money has never been easier! <span className="bold">BudgetBud</span> is your 
            all-in-one budgeting companion—designed to help you track income, 
            monitor expenses, and visualize your financial habits.
          </p>
          <Link to="/signup" className="navbar__link">
            <button className="btn smart-spend-btn">Try BudgetBud</button>
          </Link>
        </div>
        <div className="hero__image">
          <img src={piggyBank} alt="piggy" />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
