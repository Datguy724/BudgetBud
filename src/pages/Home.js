import React from 'react';
import './HomePage.css';
import piggyBank from '../images/piggyBankLogo.png';
// import budgetBudLogo from '../images/logo.png';
// import Navbar from './components/Navbar';

function HomePage() {
  return (
    <div className="home-page">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero__text">
          <h1>Your Money's Best Friend.</h1>
          <p>
            Managing your money has never been easier! BudgetBud is your 
            all-in-one budgeting companion—designed to help you track income, 
            monitor expenses, and visualize your financial habits.
          </p>
          <button className="btn smart-spend-btn">Try BudgetBud</button>
        </div>
        <div className="hero__image">
          <img src={piggyBank} alt="piggy" />
        </div>
      </section>
    </div>
  );
}

export default HomePage;
