// src/context/ExpensesContext.js
import React, { createContext, useState } from 'react';

export const ExpensesContext = createContext();

export function ExpensesProvider({ children }) {
  const [expenses, setExpenses] = useState([
    // Optional: Pre-fill with sample data
    // { id: '1', date: '2025-04-05', name: 'Groceries', amount: 120, category: 'Food' },
    // { id: '2', date: '2025-04-07', name: 'Electric Bill', amount: 60, category: 'Utilities' },
  ]);

  // Add a new expense
  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };

  // (Optionally, you can add edit/delete logic here if needed)

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
}
