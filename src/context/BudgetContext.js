"use client"

// src/context/BudgetContext.js
import { createContext, useState } from "react"

export const BudgetContext = createContext()

export function BudgetProvider({ children }) {
  const [budgetCategories, setBudgetCategories] = useState([
    { name: "Food", limit: 300 },
    { name: "Utilities", limit: 200 },
    { name: "Entertainment", limit: 100 },
    { name: "Transportation", limit: 150 },
    { name: "Health", limit: 100 },
    { name: "Shopping", limit: 200 },
    { name: "Insurance", limit: 100 },
  ])

  const [income, setIncome] = useState([
    { id: "1", date: "2025-04-01", source: "Salary", amount: 3000, category: "Paycheck" },
    { id: "2", date: "2025-04-05", source: "Freelance", amount: 500, category: "Side Hustle" },
    { id: "3", date: "2025-04-10", source: "Investment", amount: 200, category: "Dividends" },
  ])

  // Add a new budget category
  const addBudgetCategory = (category) => {
    setBudgetCategories((prev) => [...prev, category])
  }

  // Edit a budget category
  const editBudgetCategory = (index, updatedCategory) => {
    setBudgetCategories((prev) => {
      const newCategories = [...prev]
      newCategories[index] = updatedCategory
      return newCategories
    })
  }

  // Delete a budget category
  const deleteBudgetCategory = (index) => {
    setBudgetCategories((prev) => prev.filter((_, i) => i !== index))
  }

  // Add income
  const addIncome = (newIncome) => {
    setIncome((prev) => [...prev, newIncome])
  }

  // Edit income
  const editIncome = (id, updatedIncome) => {
    setIncome((prev) => prev.map((inc) => (inc.id === id ? { ...inc, ...updatedIncome } : inc)))
  }

  // Delete income
  const deleteIncome = (id) => {
    setIncome((prev) => prev.filter((inc) => inc.id !== id))
  }

  // Get total income
  const getTotalIncome = () => {
    return income.reduce((total, inc) => total + inc.amount, 0)
  }

  // Get total budget limit
  const getTotalBudget = () => {
    return budgetCategories.reduce((total, category) => total + category.limit, 0)
  }

  return (
    <BudgetContext.Provider
      value={{
        budgetCategories,
        addBudgetCategory,
        editBudgetCategory,
        deleteBudgetCategory,
        income,
        addIncome,
        editIncome,
        deleteIncome,
        getTotalIncome,
        getTotalBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}
