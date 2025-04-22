// BudgetingPage.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Budgeting.css';

// We’ll need our Expenses to determine how much each category has spent
import { ExpensesContext } from '../context/ExpensesContext.js';

// Chart imports
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BudgetingPage() {
  const { expenses } = useContext(ExpensesContext);

  // local state for budget categories
  // each category: { name: string, limit: number }
  const [categories, setCategories] = useState([]);
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
  const addCategory = () => {
    const limitVal = parseFloat(formInput.limit) || 0;
    const newCategory = { name: formInput.name.trim(), limit: limitVal };
    setCategories((prev) => [...prev, newCategory]);

    // reset form and close
    setFormInput({ name: '', limit: '' });
    setShowForm(false);
  };

  // Build bar chart data for each category
  const labels = categories.map((cat) => cat.name);
  const withinBudgetData = [];
  const overBudgetData = [];

  categories.forEach((cat) => {
    // sum of all expenses with matching category name
    const totalSpent = expenses
      .filter((exp) => exp.category.toLowerCase() === cat.name.toLowerCase())
      .reduce((acc, exp) => acc + exp.amount, 0);

    if (totalSpent <= cat.limit) {
      withinBudgetData.push(totalSpent);
      overBudgetData.push(0);
    } else {
      withinBudgetData.push(cat.limit);
      overBudgetData.push(totalSpent - cat.limit);
    }
  });

  // Prepare chart.js data
  const data = {
    labels,
    datasets: [
      {
        label: 'Within Budget',
        data: withinBudgetData,
        backgroundColor: '#36A2EB'
      },
      {
        label: 'Over Budget',
        data: overBudgetData,
        backgroundColor: '#FF0000'
      }
    ]
  };

  const options = {
    responsive: true,
    stacked: true,
    plugins: {
      title: {
        display: true,
        text: 'Budget vs. Expenses'
      },
      legend: {
        position: 'top'
      }
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true }
    }
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
