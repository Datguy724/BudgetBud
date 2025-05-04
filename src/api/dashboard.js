const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getDashboard = async (month, year, token) => {
  const res = await fetch(`${API_BASE_URL}/dashboard?month=${month}&year=${year}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};

export const getSavings = async (token) => {
  const res = await fetch(`${API_BASE_URL}/dashboard/savings`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
};
