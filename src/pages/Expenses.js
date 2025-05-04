import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../api/categories.js';
import {
  createExpense,
  deleteExpense // ✅ Make sure this is defined in your ../api/expenses.js
  ,
  getExpenses
} from '../api/expenses.js';
import './Expenses.css';

function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expenseInput, setExpenseInput] = useState({
    date: '',
    name: '',
    amount: '',
    category: ''
  });

  const token = localStorage.getItem('token');
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expensesData, categoriesData] = await Promise.all([
          getExpenses(month, year, null, token),
          getCategories(token)
        ]);
        setExpenses(expensesData.expenses || []);
        setCategories(categoriesData || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, month, year]);

  const handleChange = (e) => {
    setExpenseInput({ ...expenseInput, [e.target.name]: e.target.value });
  };

  const handleAddExpense = async () => {
    try {
      const newExpense = {
        date: expenseInput.date,
        name: expenseInput.name,
        amount: parseFloat(expenseInput.amount) || 0,
        category_id: expenseInput.category
      };
      const response = await createExpense(newExpense, token);
      setExpenses((prev) => [...prev, response.expense]);
      setExpenseInput({ date: '', name: '', amount: '', category: '' });
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Correct delete function
  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id, token);
      window.location.reload(); // Just refresh
    } catch (err) {
      setError('Failed to delete expense');
    }
  };

  return (
    <div className="expenses-page">
      <main className="main-content">
        <h1 className="expenses-title">Expenses</h1>

        <ul className="dashboard-tabs">
          <li><Link to="/dashboard">Financial Overview</Link></li>
          <li><Link to="/income">Income</Link></li>
          <li className="active-tab"><Link to="/expenses">Expenses</Link></li>
          <li><Link to="/budgeting">Budget Categories</Link></li>
        </ul>

        {loading ? (
          <p>Loading expenses...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <div className="expenses-entries">
            <div className="expense-row header">
              <div className="expense-cell">Date</div>
              <div className="expense-cell">Amount</div>
              <div className="expense-cell">Category</div>
              <div className="expense-cell">Actions</div>
            </div>

            {expenses.map((exp) => (
              <div className="expense-row" key={exp.expense_id}>
                <div className="expense-cell">{exp.date}</div>
                <div className="expense-cell">${exp.amount.toFixed(2)}</div>
                <div className="expense-cell">{exp.category_name}</div>
                <div className="expense-cell">
                  <button className="edit-btn" onClick={() => handleDeleteExpense(exp.expense_id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="expense-form">
          <input
            name="date"
            type="date"
            placeholder="Date"
            value={expenseInput.date}
            onChange={handleChange}
          />
          <input
            name="name"
            type="text"
            placeholder="Expense Name"
            value={expenseInput.name}
            onChange={handleChange}
          />
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={expenseInput.amount}
            onChange={handleChange}
          />
          <select
            name="category"
            value={expenseInput.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.category_id || cat.name} value={cat.category_id || cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          <button className="add-btn" onClick={handleAddExpense}>
            Add expense
          </button>
        </div>
      </main>
    </div>
  );
}

export default ExpensesPage;
