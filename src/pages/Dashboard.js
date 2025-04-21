// DashboardPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // <-- Import Link
import './Dashboard.css';
import axios from 'axios';

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
  console.log('DashboardPage component rendered');
  const [dashboardData, setDashboardData] = useState(null);
  const [savingsData, setSavingsData] = useState(null);
  const [error, setError] = useState(null);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed in JavaScript
  const currentYear = currentDate.getFullYear();

  // Example Pie chart data
  const pieData = dashboardData?.budget_summary ? {
    labels: dashboardData?.budget_summary.map(cat => cat.category_name),
    datasets: [
      {
        label: 'Category Spending',
        data: dashboardData?.budget_summary.map(cat => cat.spent_amount),
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
  } : {
    labels: [],
    datasets: []
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
  const lineData = savingsData?.savings_by_period ? {
    labels: savingsData.savings_by_period.map(p => `${p.month}/${p.year}`),
    datasets: [
      {
        label: 'Savings',
        data: savingsData.savings_by_period.map(p => p.amount),
        fill: false,
        borderColor: '#36A2EB',
        tension: 0.1
      }
    ]
  } : {
    labels: [],
    datasets: []
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

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get(`/api/dashboard?month=${currentMonth}&year=${currentYear}`);
        setDashboardData(res.data);
      } catch (err) {
        setError('Error fetching dashboard data');
        console.error(err);
      }
    };
      const fetchSavingsData = async () => {
        try {
          const res = await axios.get(`/api/dashboard/savings`);
          setSavingsData(res.data);
        } catch (err) {
          setError('Error fetching savings data');
          console.error(err);
        } 
      };

    fetchDashboardData();
    fetchSavingsData();
  }, [currentMonth, currentYear]);

  // if (!dashboardData || !savingsData) {
  //   return <div className="loading">Loading...</div>;
  // }

  return (
    <div className="dashboard-page">
{/* 
      TOP NAVIGATION
      <nav className="top-nav">
        <div className="nav-left">
          Logo or brand name
          <div className="logo">
            <span className="logo-icon">$</span> BudgetBud
          </div>
        </div>
        <div className="nav-right">
          Single "Home" link
          <Link to="/" className="nav-home-link">Home</Link>
        </div>
      </nav> */}

      {/* MAIN DASHBOARD CONTENT */}
      <main className="main-content">

        {/* PAGE TITLE */}
        <h1 className="dashboard-title">Dashboard</h1>

        {/* TAB MENU */}
        <ul className="dashboard-tabs">
          <li className="active-tab">Financial Overview</li>
          <li>
            <Link to="/income">Income</Link>
          </li>
          <li>
            <Link to="/expenses">Expenses</Link>
          </li>
          <li>
            <Link to="/budgeting">Budget Categories</Link>
          </li>
        </ul>

        {/* STATS CARDS */}
        <div className="stats-cards">
          <div className="card">
            <h2>Expected Income</h2>
            <p className="amount">${dashboardData?.balance.expected_income.toFixed(2) || "N/A"}</p>
            <button className="card-btn">Details</button>
          </div>
          <div className="card">
            <h2>Actual Income</h2>
            <p className="amount">${dashboardData?.balance.actual_income.toFixed(2) || "N/A"}</p>
            <button className="card-btn">Details</button>
          </div>
          <div className="card">
            <h2>Total Expenses</h2>
            <p className="amount">${dashboardData?.balance.total_expenses.toFixed(2) || "N/A"}</p>
            <button className="card-btn">Details</button>
          </div>
          <div className="card">
            <h2>Current Balance</h2>
            <p className="amount">${dashboardData?.balance.remaining_budget.toFixed(2) || "N/A"}</p>
            <button className="card-btn">Details</button>
          </div>
          <div className="card">
            <h2>Savings</h2>
           <p className="amount">${dashboardData?.savings.toFixed(2) || "N/A"}</p>
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
            <h3>Savings Over Time</h3>
            {savingsData?.savings_by_period ? (
              <Line data={lineData} options={lineOptions} />
            ) : (
              <p>Loading savings data...</p>
            )}
          </div>

        </div>
        {/* RECENT TRANSACTIONS */}
        {dashboardData?.recent_transactions?.length > 0 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardData.recent_transactions.map((tx, i) => (
                <div key={i} className ="bg-white shadow-md rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-lg">{tx.description}</span>
                    <span className={`text-sm ${tx.amount < 0 ? 'text-green-500' : 'text-red-500'}`}>
                      ${tx.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <p>Date: {new Date(tx.date).toLocaleDateString()}</p>
                    <p>Category: {tx.category}</p>
                    </div>
                    </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default DashboardPage;
