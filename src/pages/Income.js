// IncomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Income.css';

function IncomePage() {
  return (
    <div className="income-page">
      {/* TOP NAVIGATION */}
      <nav className="top-nav">
        <div className="nav-left">
          <div className="logo">
            <span className="logo-icon">$</span> BudgetBud
          </div>
        </div>
        <div className="nav-right">
          <Link to="/" className="nav-home-link">Home</Link>
        </div>
      </nav>

      <main className="main-content">
        <h1 className="income-title">Add income</h1>

        {/* TAB MENU */}
        <ul className="dashboard-tabs">
          <li>
            <Link to="/dashboard">Financial Overview</Link>
          </li>
          <li className="active-tab">
            <Link to="/income">Income</Link>
          </li>
          <li>Expenses</li>
          <li>Budget Categories</li>
        </ul>

        {/* INCOME LIST/ENTRIES */}
        <div className="income-entries">
          {/* Table header */}
          <div className="income-row header">
            <div className="income-cell">Date</div>
            <div className="income-cell">Source</div>
            <div className="income-cell">Amount</div>
            <div className="income-cell">Category</div>
            <div className="income-cell">Actions</div>
          </div>

          {/* Placeholder rows */}
          <div className="income-row">
            <div className="income-cell">2025-04-01</div>
            <div className="income-cell">Salary</div>
            <div className="income-cell">$3000</div>
            <div className="income-cell">Paycheck</div>
            <div className="income-cell">
              <button className="edit-btn">Edit/Delete</button>
            </div>
          </div>

          <div className="income-row">
            <div className="income-cell">2025-04-05</div>
            <div className="income-cell">Freelance</div>
            <div className="income-cell">$500</div>
            <div className="income-cell">Side Hustle</div>
            <div className="income-cell">
              <button className="edit-btn">Edit/Delete</button>
            </div>
          </div>

          <div className="income-row">
            <div className="income-cell">2025-04-10</div>
            <div className="income-cell">Investment</div>
            <div className="income-cell">$200</div>
            <div className="income-cell">Dividends</div>
            <div className="income-cell">
              <button className="edit-btn">Edit/Delete</button>
            </div>
          </div>
        </div>

        {/* NEW INCOME FORM */}
        <div className="income-form">
          <input type="date" placeholder="Date" />
          <input type="text" placeholder="Source" />
          <input type="number" placeholder="Amount" />
          <input type="text" placeholder="Category" />
          <button className="add-btn">Add income</button>
        </div>
      </main>
    </div>
  );
}

export default IncomePage;
