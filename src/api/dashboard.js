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

export const getDashboard = async (month, year, token) => {
  console.log(`Fetching dashboard for month: ${month}, year: ${year}`); // Debug log
  const res = await fetch(`${API_BASE_URL}/api/dashboard?month=${month}&year=${year}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  return handleResponse(res);
};

/*export const getSavings = async (token) => {
  const res = await fetch(`${API_BASE_URL}/api/dashboard/savings`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return handleResponse(res); // Use handleResponse here
};*/
