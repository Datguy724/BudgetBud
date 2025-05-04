// BudgetingPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createCategory } from '../api/categories.js';
import { getBudgets, createBudget, updateBudget } from '../api/budgets.js';
import './Budgeting.css';

// Chart imports
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BudgetingPage() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  const token = localStorage.getItem('token');
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  // Form for creating new category with budget
  const [formInput, setFormInput] = useState({
    name: '',
    amount: ''
  });

  useEffect(() => {
    fetchBudgets();
  }, [token, month, year]);

  const fetchBudgets = async () => {
    if (!token) {
      setError('Please login to view budgets');
      setLoading(false);
      return;
    }

    try {
      const budgetsResponse = await getBudgets(month, year, token);
      console.log('Budgets Response:', budgetsResponse);
      
      const budgetsData = budgetsResponse.budgets || [];
      setBudgets(budgetsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching budgets:', err);
      setError(`Failed to load budgets: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
    if (!showForm) {
      setFormInput({ name: '', amount: '' });
      setError(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(null);
  };

  // Create category and budget together
  const addCategoryWithBudget = async () => {
    if (!formInput.name.trim()) {
      setError('Please enter a category name');
      return;
    }

    const amount = parseFloat(formInput.amount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid budget amount greater than 0');
      return;
    }

    try {
      // First create the category
      console.log('Creating category:', formInput.name);
      const categoryResponse = await createCategory(formInput.name, token);
      console.log('Category created:', categoryResponse);
      
      // Extract category ID from response
      const categoryId = categoryResponse.category?.category_id || 
                        categoryResponse.category?.id || 
                        categoryResponse.category_id || 
                        categoryResponse.id;
      
      if (!categoryId) {
        throw new Error('Failed to get category ID from response');
      }

      // Then create the budget for this category
      console.log('Creating budget for category ID:', categoryId);
      const budgetResponse = await createBudget(categoryId, amount, month, year, token);
      console.log('Budget created:', budgetResponse);
      
      // Refresh the budgets list
      await fetchBudgets();
      
      // Reset form
      setFormInput({ name: '', amount: '' });
      setShowForm(false);
      setError(null);
    } catch (err) {
      console.error('Error creating category with budget:', err);
      setError(`Failed to create category with budget: ${err.message}`);
    }
  };

  // Prepare chart data
  const chartData = {
    labels: budgets.map(budget => budget.category_name || 'Unknown'),
    datasets: [
      {
        label: 'Within Budget',
        data: budgets.map(budget => 
          Math.min(budget.spent_amount || 0, budget.amount || 0)
        ),
        backgroundColor: '#36A2EB',
      },
      {
        label: 'Over Budget',
        data: budgets.map(budget => 
          Math.max(0, (budget.spent_amount || 0) - (budget.amount || 0))
        ),
        backgroundColor: '#FF0000',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Budget vs. Expenses',
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: { stacked: true },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  };

  if (loading) {
    return (
      <div className="budgeting-page">
        <main className="main-content">
          <div className="loading">Loading budget data...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="budgeting-page">
      <main className="main-content">
        <h1 className="budget-title">Budgeting - {month}/{year}</h1>

        {/* TAB MENU */}
        <ul className="dashboard-tabs">
          <li>
            <Link to="/dashboard">Financial Overview</Link>
          </li>
          <li>
            <Link to="/income">Income</Link>
          </li>
          <li>
            <Link to="/expenses">Expenses</Link>
          </li>
          <li className="active-tab">Budget Categories</li>
        </ul>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            {error}
            <button 
              onClick={() => setError(null)} 
              className="error-close"
              style={{ marginLeft: '10px', cursor: 'pointer' }}
            >
              ×
            </button>
          </div>
        )}

        {/* No budgets message */}
        {budgets.length === 0 && (
          <p className="no-budget">
            No budget categories yet. Click 'Add category' to create your first budget category.
          </p>
        )}

        {/* Bar Chart */}
        {budgets.length > 0 && (
          <div className="budget-chart-container">
            <Bar data={chartData} options={chartOptions} />
          </div>
        )}

        {/* Budget Summary */}
        {budgets.length > 0 && (
          <div className="budget-summary">
            <div className="budget-summary-item">
              <span>Total Budget:</span>
              <span>${budgets.reduce((sum, b) => sum + (b.amount || 0), 0).toFixed(2)}</span>
            </div>
            <div className="budget-summary-item">
              <span>Total Spent:</span>
              <span>${budgets.reduce((sum, b) => sum + (b.spent_amount || 0), 0).toFixed(2)}</span>
            </div>
            <div className="budget-summary-item">
              <span>Total Remaining:</span>
              <span>${budgets.reduce((sum, b) => sum + (b.remaining || 0), 0).toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Budget Details Table */}
        {budgets.length > 0 && (
          <div className="budget-details">
            <h2>Budget Details</h2>
            <table className="budget-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Budget</th>
                  <th>Spent</th>
                  <th>Remaining</th>
                  <th>Usage</th>
                </tr>
              </thead>
              <tbody>
                {budgets.map((budget) => (
                  <tr key={budget.budget_id}>
                    <td>{budget.category_name}</td>
                    <td>${(budget.amount || 0).toFixed(2)}</td>
                    <td>${(budget.spent_amount || 0).toFixed(2)}</td>
                    <td className={budget.remaining < 0 ? 'over-budget' : ''}>
                      ${(budget.remaining || 0).toFixed(2)}
                    </td>
                    <td>
                      <div className="progress-bar">
                        <div 
                          className={`progress ${budget.percentage_used > 100 ? 'over-budget' : ''}`}
                          style={{ width: `${Math.min(budget.percentage_used || 0, 100)}%` }}
                        >
                          {(budget.percentage_used || 0).toFixed(1)}%
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add category with budget button/form */}
        <div className="add-category-container">
          {!showForm ? (
            <button 
              className="add-category-btn" 
              onClick={toggleForm}
            >
              Add category
            </button>
          ) : (
            <div className="add-category-form">
              <input
                name="name"
                type="text"
                placeholder="Category name"
                value={formInput.name}
                onChange={handleChange}
                className="category-name-input"
              />
              <input
                name="amount"
                type="number"
                placeholder="Budget amount"
                value={formInput.amount}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="budget-amount-input"
              />
              <button 
                className="confirm-btn" 
                onClick={addCategoryWithBudget}
                disabled={!formInput.name || !formInput.amount}
              >
                Add category
              </button>
              <button className="cancel-btn" onClick={toggleForm}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default BudgetingPage;