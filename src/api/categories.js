const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok || data.status !== 'success') {
    const message = data.message || 'An unexpected error occurred';
    throw new Error(message);
  }
  return data;
};

export const getCategories = async (token) => {
  console.log(`${API_BASE_URL}/api/categories`)
  const res = await fetch(`${API_BASE_URL}/api/categories`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await handleResponse(res);
  return data.categories;
};

export const createCategory = async (name, token) => {
  console.log('Creating category:', name, token); // Debug log
  const res = await fetch(`${API_BASE_URL}/api/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name })
  });
  const data = await handleResponse(res);
  return data.category;
};

export const updateCategory = async (id, name, token) => {
  const res = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name })
  });
  const data = await handleResponse(res);
  return data.category;
};

export const deleteCategory = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await handleResponse(res);
  return data.message;
};

export const getCategoryById = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await handleResponse(res);
  return data.category;
};