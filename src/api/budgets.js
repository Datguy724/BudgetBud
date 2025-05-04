// budgets.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getBudgets = async (month, year, token) => {
    const params = new URLSearchParams();
    if (month) params.append('month', month);
    if (year) params.append('year', year);
    
    const response = await fetch(`${API_BASE_URL}/api/budgets?${params}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch budgets');
    }
    
    return response.json();
};

export const getBudgetById = async (budgetId, token) => {
    const response = await fetch(`${API_BASE_URL}/api/budgets/${budgetId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch budget');
    }
    
    return response.json();
};

export const createBudget = async (categoryId, amount, month, year, token) => {
    const response = await fetch(`${API_BASE_URL}/api/budgets`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            category_id: categoryId,
            amount: amount,
            month: month,
            year: year
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create budget');
    }
    
    return response.json();
};

export const updateBudget = async (budgetId, amount, token) => {
    const response = await fetch(`${API_BASE_URL}/api/budgets/${budgetId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            amount: amount
        })
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update budget');
    }
    
    return response.json();
};

export const deleteBudget = async (budgetId, token) => {
    const response = await fetch(`${API_BASE_URL}/api/budgets/${budgetId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete budget');
    }
    
    return response.json();
};