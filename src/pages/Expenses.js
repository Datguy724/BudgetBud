// ExpensesPage.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Expenses.css';
import { ExpensesContext } from '../context/ExpensesContext.js';

function ExpensesPage() {
  // Access expenses and the addExpense function from context
  const { expenses, addExpense } = useContext(ExpensesContext);

  // Local state for the “Add expense” form
  const [expenseInput, setExpenseInput] = useState({
    date: '',
    name: '',
    amount: '',
    category: ''
  });

  // Update local form state
  const handleChange = (e) => {
    setExpenseInput({ ...expenseInput, [e.target.name]: e.target.value });
  };

  // Handle the "Add expense" button
  const handleAddExpense = () => {
    const newExpense = {
      id: String(Date.now()),       // quick unique ID
      date: expenseInput.date,
      name: expenseInput.name,
      amount: parseFloat(expenseInput.amount) || 0,
      category: expenseInput.category
    };
    addExpense(newExpense);

    // Clear the form
    setExpenseInput({
      date: '',
      name: '',
      amount: '',
      category: ''
    });
  };

  return (
    <div className="expenses-page">
      <main className="main-content">
        {/* PAGE TITLE */}
        <h1 className="expenses-title">Expenses</h1>

        {/* TAB MENU */}
        <ul className="dashboard-tabs">
          <li>
            <Link to="/dashboard">Financial Overview</Link>
          </li>
          <li>
            <Link to="/income">Income</Link>
          </li>
          <li className="active-tab">
            <Link to="/expenses">Expenses</Link>
          </li>
          <li>
            <Link to="/budgeting">Budget Categories</Link>
          </li>
        </ul>

        {/* EXPENSES LIST/ENTRIES */}
        <div className="expenses-entries">
          {/* Table header */}
          <div className="expense-row header">
            <div className="expense-cell">Date</div>
            <div className="expense-cell">Expense Name</div>
            <div className="expense-cell">Amount</div>
            <div className="expense-cell">Category</div>
            <div className="expense-cell">Actions</div>
          </div>

          {/* Render each expense from context */}
          {expenses.map((exp) => (
            <div className="expense-row" key={exp.id}>
              <div className="expense-cell">{exp.date}</div>
              <div className="expense-cell">{exp.name}</div>
              <div className="expense-cell">${exp.amount}</div>
              <div className="expense-cell">{exp.category}</div>
              <div className="expense-cell">
                <button className="edit-btn">Edit/Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* NEW EXPENSE FORM */}
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
          <input
            name="category"
            type="text"
            placeholder="Category"
            value={expenseInput.category}
            onChange={handleChange}
          />
          <button className="add-btn" onClick={handleAddExpense}>
            Add expense
          </button>
        </div>
      </main>
    </div>
  );
}

export default ExpensesPage;
