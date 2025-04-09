// DashboardPage.js
import React from 'react';
import { Link } from 'react-router-dom'; // <-- Import Link
import './Dashboard.css';

import { Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function DashboardPage() {
  // Example Pie chart data
  const pieData = {
    labels: ['Rent', 'Groceries', 'Utilities', 'Entertainment', 'Others'],
    datasets: [
      {
        label: 'Category Spending',
        data: [400, 250, 100, 150, 100],
        backgroundColor: [
          '#FF6384', // red/pink
          '#36A2EB', // blue
          '#FFCE56', // yellow
          '#4BC0C0', // turquoise
          '#9966FF'  // purple
        ],
        hoverOffset: 4
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right'
      }
    }
  };

  // Example Line chart data
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Spending',
        data: [200, 300, 250, 400, 350, 450],
        fill: false,
        borderColor: '#36A2EB',
        tension: 0.1
      }
    ]
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="dashboard-page">

      {/* TOP NAVIGATION */}
      <nav className="top-nav">
        <div className="nav-left">
          {/* Logo or brand name */}
          <div className="logo">
            <span className="logo-icon">$</span> BudgetBud
          </div>
        </div>
        <div className="nav-right">
          {/* Single "Home" link */}
          <Link to="/" className="nav-home-link">Home</Link>
        </div>
      </nav>

      {/* MAIN DASHBOARD CONTENT */}
      <main className="main-content">

        {/* PAGE TITLE */}
        <h1 className="dashboard-title">Dashboard</h1>

        {/* TAB MENU */}
        <ul className="dashboard-tabs">
          <li className="active-tab">Financial Overview</li>
          {/* Updated: Link to the Income page */}
          <li>
            <Link to="/income">Income</Link>
          </li>
          <li>Expenses</li>
          <li>Budget Categories</li>
        </ul>

        {/* STATS CARDS */}
        <div className="stats-cards">
          <div className="card">
            <h2>Total Income</h2>
            <p className="amount">$0</p>
            <button className="card-btn">Button</button>
          </div>
          <div className="card">
            <h2>Total Expenses</h2>
            <p className="amount">$0</p>
            <button className="card-btn">Button</button>
          </div>
          <div className="card">
            <h2>Current Balance</h2>
            <p className="amount">$0</p>
            <button className="card-btn">Button</button>
          </div>
        </div>

        {/* CHARTS SECTION */}
        <div className="charts-section">

          {/* CATEGORY SPENDING (PIE) */}
          <div className="chart-container">
            <h3>Category Spending</h3>
            <Pie data={pieData} options={pieOptions} />
            {/* Example dropdown below the chart */}
            <div className="chart-dropdown">
              <label htmlFor="spending-range">View By</label>
              <select id="spending-range">
                <option value="current-month">Current Month</option>
                <option value="last-month">Last Month</option>
                <option value="3-months">Last 3 Months</option>
              </select>
            </div>
          </div>

          {/* SPENDING TRENDS (LINE) */}
          <div className="chart-container">
            <h3>Spending Trends</h3>
            <Line data={lineData} options={lineOptions} />
          </div>

        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
