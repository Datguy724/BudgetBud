const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getExpenses = async (month, year, categoryId, token) => {
  const query = `month=${month}&year=${year}${categoryId ? `&category=${categoryId}` : ''}`;
  const res = await fetch(`${API_BASE_URL}/expenses?${query}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const createExpense = async (expense, token) => {
  const res = await fetch(`${API_BASE_URL}/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(expense)
  });
  return res.json();
};

export const updateExpense = async (id, updates, token) => {
  const res = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updates)
  });
  return res.json();
};

export const deleteExpense = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/expenses/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};
