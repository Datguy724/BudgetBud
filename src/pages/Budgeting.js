// BudgetingPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createCategory, getCategories } from '../api/categories.js'; // adjust the path if needed
import {
  getExpenses
} from '../api/expenses.js';
import './Budgeting.css';


// We’ll need our Expenses to determine how much each category has spent

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
  const [expenses, setExpenses] = useState([]);
  const token = localStorage.getItem('token');
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // optional: loading state
  const [error, setError] = useState(null);     // optional: error state


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [expensesData, categoriesData] = await Promise.all([
          getExpenses(month, year, null, token),
          getCategories(token)
        ]);
        setExpenses(expensesData.expenses || []);
        console.log(expensesData)
        setCategories(categoriesData || []);
        const fetched = await getCategories(token);
        setCategories(fetched);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [token]);

  // local state for budget categories
  // each category: { name: string, limit: number }
  const [showForm, setShowForm] = useState(false);

  // form inputs
  const [formInput, setFormInput] = useState({
    name: '',
    limit: ''
  });

  // toggle form open/close
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  // update local form inputs
  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value
    });
  };

  // add new category
  const addCategory = async () => {
    const limitVal = parseFloat(formInput.limit) || 0;
    const name = formInput.name.trim();
  
    if (!name) return;
  
    try {
      const newCategory = await createCategory(name, token);
      // append limit locally
      setCategories((prev) => [...prev, { ...newCategory, limit: limitVal }]);
    } catch (err) {
      setError(err.message);
    }
  
    setFormInput({ name: '', limit: '' });
    setShowForm(false);
  };
  

  // Build bar chart data for each category
  const labels = categories.map((cat) => cat.name);
  const withinBudgetData = [];
  const overBudgetData = [];

  // Iterate through categories and calculate expenses for each one
  categories.forEach((cat) => {
    console.log(`Processing category: ${cat.name}`);
    console.log('expenses:', expenses);
    // Calculate the total amount spent for the current category
    const totalSpent = expenses
      .filter((exp) => exp.category_name.toLowerCase() === cat.name.toLowerCase())
      .reduce((acc, exp) => acc + exp.amount, 0);

    // Determine the budget status for each category
    if (totalSpent <= 100) {
      withinBudgetData.push(totalSpent);
      console.log(`Category: ${cat.name}, Spent: ${totalSpent}, Limit: ${100}`);
      overBudgetData.push(0);
    } else {
      console.log(`Category: ${cat.name}, Spent: ${totalSpent}, Limit: ${100} (Over Budget)`);
      withinBudgetData.push(100);
      overBudgetData.push(totalSpent - 100);
    }
  });

  // Prepare chart.js data
  const data = {
    labels, // Category names as labels
    datasets: [
      {
        label: 'Within Budget',
        data: withinBudgetData, // Data for categories within budget
        backgroundColor: '#36A2EB', // Blue color for within budget
      },
      {
        label: 'Over Budget',
        data: overBudgetData, // Data for categories over budget
        backgroundColor: '#FF0000', // Red color for over budget
      },
    ],
  };

  const options = {
    responsive: true,
    stacked: true, // Stacked bars
    plugins: {
      title: {
        display: true,
        text: 'Budget vs. Expenses', // Title for the chart
      },
      legend: {
        position: 'top', // Position of the legend
      },
    },
    scales: {
      x: { stacked: true },
      y: {
        stacked: true,
        beginAtZero: true, // Ensure the y-axis starts at zero
      },
    },
  };

  return (
    <div className="budgeting-page">
      <main className="main-content">
        <h1 className="budget-title">Budgeting</h1>

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

        {/* If no categories yet, show "No budget yet..." */}
        {categories.length === 0 && (
          <p className="no-budget">No budget yet...</p>
        )}

        {/* Bar Chart */}
        {categories.length > 0 && (
          <div className="budget-chart-container">
            <Bar data={data} options={options} />
          </div>
        )}

        {/* "Add category" button or form */}
        <div className="add-category-container">
          {!showForm ? (
            <button className="add-category-btn" onClick={toggleForm}>
              Add category
            </button>
          ) : (
            <div className="add-category-form">
              <input
                name="name"
                type="text"
                placeholder="Category type"
                value={formInput.name}
                onChange={handleChange}
              />
              <input
                name="limit"
                type="number"
                placeholder="Budget limit"
                value={formInput.limit}
                onChange={handleChange}
              />
              <button className="confirm-btn" onClick={addCategory}>
                Add category
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default BudgetingPage;
