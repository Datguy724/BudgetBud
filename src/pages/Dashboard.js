// DashboardPage.js
"use client"

// DashboardPage.js
import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import "./Dashboard.css"
import { ExpensesContext } from "../context/ExpensesContext.js"
import { BudgetContext } from "../context/BudgetContext.js"

import { Pie, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function DashboardPage() {
  console.log("DashboardPage component rendered")
  const { expenses, getTotalExpenses, getExpensesByCategory } = useContext(ExpensesContext)
  const { income, budgetCategories, getTotalIncome, getTotalBudget } = useContext(BudgetContext)

  const [timeRange, setTimeRange] = useState("current-month")

  // Calculate dashboard data
  const totalExpenses = getTotalExpenses()
  const totalIncome = getTotalIncome()
  const remainingBudget = totalIncome - totalExpenses
  const savingsAmount = Math.max(0, remainingBudget)

  // Generate category spending data for pie chart
  const expensesByCategory = getExpensesByCategory()
  const categoryLabels = Object.keys(expensesByCategory)
  const categoryAmounts = Object.values(expensesByCategory)

  // Example Pie chart data
  const pieData = {
    labels: categoryLabels,
    datasets: [
      {
        label: "Category Spending",
        data: categoryAmounts,
        backgroundColor: [
          "#FF6384", // red/pink
          "#36A2EB", // blue
          "#FFCE56", // yellow
          "#4BC0C0", // turquoise
          "#9966FF", // purple
          "#FF9F40", // orange
          "#4BC0C0", // teal
        ],
        hoverOffset: 4,
      },
    ],
  }

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
    },
  }

  // Generate savings data for line chart
  // For demo purposes, we'll create mock historical data
  const savingsHistory = [
    { month: 1, year: 2025, amount: 300 },
    { month: 2, year: 2025, amount: 450 },
    { month: 3, year: 2025, amount: 380 },
    { month: 4, year: 2025, amount: savingsAmount },
  ]

  // Example Line chart data
  const lineData = {
    labels: savingsHistory.map((p) => `${p.month}/${p.year}`),
    datasets: [
      {
        label: "Savings",
        data: savingsHistory.map((p) => p.amount),
        fill: false,
        borderColor: "#36A2EB",
        tension: 0.1,
      },
    ],
  }

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  // Generate recent transactions
  const recentTransactions = [
    ...expenses.slice(0, 3).map((expense) => ({
      description: expense.name,
      amount: -expense.amount,
      date: expense.date,
      category: expense.category,
    })),
    ...income.slice(0, 2).map((inc) => ({
      description: inc.source,
      amount: inc.amount,
      date: inc.date,
      category: inc.category,
    })),
  ]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3)

  return (
    <div className="dashboard-page">
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
            <p className="amount">${getTotalBudget().toFixed(2)}</p>
            <Link to="/income">
              <button className="card-btn">Details</button>
            </Link>
          </div>
          <div className="card">
            <h2>Actual Income</h2>
            <p className="amount">${totalIncome.toFixed(2)}</p>
            <Link to="/income">
              <button className="card-btn">Details</button>
            </Link>
          </div>
          <div className="card">
            <h2>Total Expenses</h2>
            <p className="amount">${totalExpenses.toFixed(2)}</p>
            <Link to="/expenses">
              <button className="card-btn">Details</button>
            </Link>
          </div>
          <div className="card">
            <h2>Current Balance</h2>
            <p className="amount">${remainingBudget.toFixed(2)}</p>
            <Link to="/budgeting">
              <button className="card-btn">Details</button>
            </Link>
          </div>
          <div className="card">
            <h2>Savings</h2>
            <p className="amount">${savingsAmount.toFixed(2)}</p>
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
              <select id="spending-range" value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
                <option value="current-month">Current Month</option>
                <option value="last-month">Last Month</option>
                <option value="3-months">Last 3 Months</option>
              </select>
            </div>
          </div>

          {/* SPENDING TRENDS (LINE) */}
          <div className="chart-container">
            <h3>Savings Over Time</h3>
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        {/* RECENT TRANSACTIONS */}
        {recentTransactions.length > 0 && (
          <div className="recent-transactions">
            <h3>Recent Transactions</h3>
            <div className="transaction-list">
              {recentTransactions.map((tx, i) => (
                <div key={i} className="transaction-item">
                  <div className="transaction-details">
                    <span className="transaction-name">{tx.description}</span>
                    <span className={`transaction-amount ${tx.amount < 0 ? "expense" : "income"}`}>
                      ${Math.abs(tx.amount).toFixed(2)}
                    </span>
                  </div>
                  <div className="transaction-meta">
                    <span>Date: {tx.date}</span>
                    <span>Category: {tx.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default DashboardPage

