"use client"

// src/context/ExpensesContext.js
import { createContext, useState } from "react"

export const ExpensesContext = createContext()

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState([
    // Pre-filled with sample data
    { id: "1", date: "2025-04-05", name: "Groceries", amount: 120, category: "Food" },
    { id: "2", date: "2025-04-07", name: "Electric Bill", amount: 60, category: "Utilities" },
    { id: "3", date: "2025-04-10", name: "Netflix Subscription", amount: 15, category: "Entertainment" },
    { id: "4", date: "2025-04-12", name: "Gas", amount: 45, category: "Transportation" },
    { id: "5", date: "2025-04-15", name: "Dinner Out", amount: 75, category: "Food" },
    { id: "6", date: "2025-04-18", name: "Internet Bill", amount: 70, category: "Utilities" },
    { id: "7", date: "2025-04-20", name: "Movie Tickets", amount: 30, category: "Entertainment" },
    { id: "8", date: "2025-04-22", name: "Gym Membership", amount: 50, category: "Health" },
    { id: "9", date: "2025-04-25", name: "Clothing", amount: 120, category: "Shopping" },
    { id: "10", date: "2025-04-28", name: "Car Insurance", amount: 90, category: "Insurance" },
  ])

  // Add a new expense
  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense])
  }

  // Edit an expense
  const editExpense = (id, updatedExpense) => {
    setExpenses((prev) => prev.map((expense) => (expense.id === id ? { ...expense, ...updatedExpense } : expense)))
  }

  // Delete an expense
  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id))
  }

  // Get total expenses
  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0)
  }

  // Get expenses by category
  const getExpensesByCategory = () => {
    const categories = {}
    expenses.forEach((expense) => {
      if (!categories[expense.category]) {
        categories[expense.category] = 0
      }
      categories[expense.category] += expense.amount
    })
    return categories
  }

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        addExpense,
        editExpense,
        deleteExpense,
        getTotalExpenses,
        getExpensesByCategory,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  )
}
