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
  const res = await fetch(`${API_BASE_URL}/categories`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await handleResponse(res);
  return data.categories;
};

export const createCategory = async (name, token) => {
  const res = await fetch(`${API_BASE_URL}/categories`, {
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
  const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
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
  const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await handleResponse(res);
  return data.message;
};

export const getCategoryById = async (id, token) => {
  const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await handleResponse(res);
  return data.category;
};