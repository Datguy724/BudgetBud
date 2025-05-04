import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createIncome, deleteIncome, getIncomes, markIncomeReceived } from '../api/income.js'; // Adjust the path if needed
import './Income.css';

function IncomePage() {
  const token = localStorage.getItem('token');
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const [incomes, setIncomes] = useState([]);
  const [formInput, setFormInput] = useState({
    date: '',
    source: '',
    amount: '',
    category: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [receivingId, setReceivingId] = useState(null);
  const [actualAmount, setActualAmount] = useState('');

  // Fetch incomes on mount
  useEffect(() => {
    const fetchIncomes = async () => {
      try {
        const fetchedIncomes = await getIncomes(month, year, token); // Adjust month and year accordingly;
        console.log('Fetched incomes:', fetchedIncomes);
        setIncomes(fetchedIncomes.incomes);

      } catch (err) {
        setError('Failed to fetch incomes');
      } finally {
        setLoading(false);
      }
    };

    fetchIncomes();
  }, [token]);

  // Handle form input change
  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value
    });
  };

  const handleAddIncome = async () => {
    const { date, source, amount, category } = formInput;
    if (!date || !source || !amount || !category) return;
  
    try {
      const parsedDate = new Date(date);
      const month = parsedDate.getMonth() + 1;
      const year = parsedDate.getFullYear();
  
      const newIncomeData = {
        source_name: source,
        expected_amount: parseFloat(amount),
        month,
        year,
        due_date: date,
        description: '',
        category
      };
  
      const response = await createIncome(newIncomeData, token);
      const savedIncome = response.income;
      console.log('Saved income:', savedIncome);
  
      if (!savedIncome) throw new Error("No data returned");
  
      setIncomes([...incomes, savedIncome]);
      console.log(incomes)
      setFormInput({ date: '', source: '', amount: '', category: '' });
    } catch (err) {
      console.error(err);
      setError('Failed to add income');
    }
  };

  // Handle marking income as received
  const handleMarkReceived = async (incomeId) => {
    try {
      const amount = parseFloat(actualAmount);
      if (isNaN(amount) || amount <= 0) {
        setError('Please enter a valid amount');
        return;
      }

      await markIncomeReceived(incomeId, amount, new Date().toISOString().split('T')[0], token);
      
      // Refresh incomes
      const fetchedIncomes = await getIncomes(month, year, token);
      setIncomes(fetchedIncomes.incomes);
      
      // Reset state
      setReceivingId(null);
      setActualAmount('');
    } catch (err) {
      console.error(err);
      setError('Failed to mark income as received');
    }
  };

  // Handle deleting an income
  const handleDeleteIncome = async (id) => {
    try {
      await deleteIncome(id, token);
      setIncomes(incomes.filter((income) => income.id !== id));

      window.location.reload();
    } catch (err) {
      setError('Failed to delete income');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="income-page">
      <main className="main-content">
        <h1 className="income-title">Income</h1>

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
            <div className="income-cell">Expected</div>
            <div className="income-cell">Actual</div>
            <div className="income-cell">Status</div>
            <div className="income-cell">Actions</div>
          </div>

          {/* Map through incomes */}
          {incomes.length === 0 && <p>No incomes added yet...</p>}
          {incomes.map((income) => (
            <div className="income-row" key={income.income_id}>
              <div className="income-cell">{income.due_date}</div>
              <div className="income-cell">{income.source_name}</div>
              <div className="income-cell">${income.expected_amount}</div>
              <div className="income-cell">
                {income.is_received ? `$${income.actual_amount}` : '-'}
              </div>
              <div className="income-cell">
                <span className={`income-status ${income.is_received ? 'received' : 'pending'}`}>
                  {income.is_received ? 'Received' : 'Pending'}
                </span>
              </div>
              <div className="income-cell">
                {!income.is_received && receivingId !== income.income_id && (
                  <button 
                    className="edit-btn" 
                    onClick={() => {
                      setReceivingId(income.income_id);
                      setActualAmount(income.expected_amount.toString());
                    }}
                  >
                    Mark Received
                  </button>
                )}
                {receivingId === income.income_id && (
                  <div className="mark-received-form">
                    <input
                      type="number"
                      value={actualAmount}
                      onChange={(e) => setActualAmount(e.target.value)}
                      placeholder="Actual amount"
                      className="actual-amount-input"
                    />
                    <button 
                      className="edit-btn" 
                      onClick={() => handleMarkReceived(income.income_id)}
                    >
                      ✓
                    </button>
                    <button 
                      className="edit-btn" 
                      onClick={() => {
                        setReceivingId(null);
                        setActualAmount('');
                      }}
                    >
                      ✕
                    </button>
                  </div>
                )}
                <button className="edit-btn" onClick={() => handleDeleteIncome(income.income_id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* NEW INCOME FORM */}
        <div className="income-form">
          <input
            type="date"
            name="date"
            value={formInput.date}
            onChange={handleChange}
            placeholder="Date"
          />
          <input
            type="text"
            name="source"
            value={formInput.source}
            onChange={handleChange}
            placeholder="Source"
          />
          <input
            type="number"
            name="amount"
            value={formInput.amount}
            onChange={handleChange}
            placeholder="Amount"
          />
          <input
            type="text"
            name="category"
            value={formInput.category}
            onChange={handleChange}
            placeholder="Category"
          />
          <button className="add-btn" onClick={handleAddIncome}>
            Add Income
          </button>
        </div>
      </main>
    </div>
  );
}

export default IncomePage;