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

export const getIncomes = async (month, year, token) => {
  const res = await fetch(`${API_BASE_URL}/api/income?month=${month}&year=${year}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return handleResponse(res); // Use handleResponse here
};

export const createIncome = async (income, token) => {
  const res = await fetch(`${API_BASE_URL}/api/income`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(income)
  });
  console.log('Creating income:', income, token); // Debug log
  return handleResponse(res); // Use handleResponse here
};

export const updateIncome = async (id, updates, token) => {
  const res = await fetch(`${API_BASE_URL}/api/income/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updates)
  });
  return handleResponse(res); // Use handleResponse here
};

export const markIncomeReceived = async (id, actual_amount, receive_date, token) => {
  const res = await fetch(`${API_BASE_URL}/api/income/${id}/receive`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ actual_amount, receive_date })
  });
  return handleResponse(res); // Use handleResponse here
};

export const deleteIncome = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/api/income/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  return handleResponse(res); // Use handleResponse here
};
