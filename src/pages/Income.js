// IncomePage.js

"use client"

import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import "./Income.css"
import { BudgetContext } from "../context/BudgetContext.js"

function IncomePage() {
  const { income, addIncome, deleteIncome } = useContext(BudgetContext)

  // Local state for the "Add income" form
  const [incomeInput, setIncomeInput] = useState({
    date: "",
    source: "",
    amount: "",
    category: "",
  })

  // Update local form state
  const handleChange = (e) => {
    setIncomeInput({ ...incomeInput, [e.target.name]: e.target.value })
  }

  // Handle the "Add income" button
  const handleAddIncome = () => {
    const newIncome = {
      id: String(Date.now()), // quick unique ID
      date: incomeInput.date,
      source: incomeInput.source,
      amount: Number.parseFloat(incomeInput.amount) || 0,
      category: incomeInput.category,
    }
    addIncome(newIncome)

    // Clear the form
    setIncomeInput({
      date: "",
      source: "",
      amount: "",
      category: "",
    })
  }

  // Handle delete income
  const handleDeleteIncome = (id) => {
    deleteIncome(id)
  }

  return (
    <div className="income-page">
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
          <li>
            <Link to="/expenses">Expenses</Link>
          </li>
          <li>
            <Link to="/budgeting">Budget Categories</Link>
          </li>
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

          {/* Render each income from context */}
          {income.map((inc) => (
            <div className="income-row" key={inc.id}>
              <div className="income-cell">{inc.date}</div>
              <div className="income-cell">{inc.source}</div>
              <div className="income-cell">${inc.amount}</div>
              <div className="income-cell">{inc.category}</div>
              <div className="income-cell">
                <button className="edit-btn" onClick={() => handleDeleteIncome(inc.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* NEW INCOME FORM */}
        <div className="income-form">
          <input name="date" type="date" placeholder="Date" value={incomeInput.date} onChange={handleChange} />
          <input name="source" type="text" placeholder="Source" value={incomeInput.source} onChange={handleChange} />
          <input name="amount" type="number" placeholder="Amount" value={incomeInput.amount} onChange={handleChange} />
          <input
            name="category"
            type="text"
            placeholder="Category"
            value={incomeInput.category}
            onChange={handleChange}
          />
          <button className="add-btn" onClick={handleAddIncome}>
            Add income
          </button>
        </div>
      </main>
    </div>
  )
}

export default IncomePage
