const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok || data.status !== 'success') {
    const message = data.message || 'An unexpected error occurred';
    throw new Error(message);
  }
  console.log('Response data:', data); // Debug log
  return data;
};

export const getExpenses = async (month, year, categoryId, token) => {
  const query = `month=${month}&year=${year}${categoryId ? `&category=${categoryId}` : ''}`;
  const res = await fetch(`${API_BASE_URL}/api/expenses?${query}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return handleResponse(res); // Use handleResponse here
};

export const createExpense = async (expense, token) => {
  const res = await fetch(`${API_BASE_URL}/api/expenses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(expense)
  });
  return handleResponse(res); // Use handleResponse here
};

export const updateExpense = async (id, updates, token) => {
  const res = await fetch(`${API_BASE_URL}/api/expenses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updates)
  });
  return handleResponse(res); // Use handleResponse here
};

export const deleteExpense = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/api/expenses/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  return handleResponse(res); // Use handleResponse here
};
