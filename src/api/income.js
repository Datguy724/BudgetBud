const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getIncomes = async (month, year, token) => {
  const res = await fetch(`${API_BASE_URL}/income?month=${month}&year=${year}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const createIncome = async (income, token) => {
  const res = await fetch(`${API_BASE_URL}/income`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(income)
  });
  return res.json();
};

export const updateIncome = async (id, updates, token) => {
  const res = await fetch(`${API_BASE_URL}/income/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updates)
  });
  return res.json();
};

export const markIncomeReceived = async (id, actual_amount, receive_date, token) => {
  const res = await fetch(`${API_BASE_URL}/income/${id}/receive`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ actual_amount, receive_date })
  });
  return res.json();
};

export const deleteIncome = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/income/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};
