// src/context/ExpensesContext.js
import React, { createContext, useState } from 'react';
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense
} from '../api/expenses.js'; // adjust path if needed

export const ExpensesContext = createContext();

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Call this when user logs in or changes filters
  const loadExpenses = async (month, year, categoryId, token) => {
    setLoading(true);
    try {
      const data = await getExpenses(month, year, categoryId, token);
      setExpenses(data.expenses || []);
    } catch (err) {
      console.error('Failed to fetch expenses:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense, token) => {
    try {
      const data = await createExpense(expense, token);
      setExpenses((prev) => [...prev, data.expense]); // assuming backend returns the created expense
    } catch (err) {
      console.error('Failed to add expense:', err);
      setError(err.message);
    }
  };

  const editExpense = async (id, updates, token) => {
    try {
      const data = await updateExpense(id, updates, token);
      setExpenses((prev) =>
        prev.map((exp) => (exp.id === id ? data.expense : exp))
      );
    } catch (err) {
      console.error('Failed to update expense:', err);
      setError(err.message);
    }
  };

  const removeExpense = async (id, token) => {
    try {
      await deleteExpense(id, token);
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    } catch (err) {
      console.error('Failed to delete expense:', err);
      setError(err.message);
    }
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        loading,
        error,
        loadExpenses,
        addExpense,
        editExpense,
        removeExpense
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
}
