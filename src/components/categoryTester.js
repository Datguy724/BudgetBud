// src/components/CategoryTester.js
import React, { useEffect } from 'react';
import {
    createCategory,
    deleteCategory,
    getCategories,
    getCategoryById,
    updateCategory
} from '../api/categories.js';

const CategoryTester = () => {
  const token = localStorage.getItem('token');  // Retrieve token from localStorage

  useEffect(() => {
    const test = async () => {
      try {
        console.log('Testing Category API...');
        // Create a new category
        const newCat = await createCategory('Test Category2', token);
        console.log('Created:', newCat);

        // Get all categories
        const categories = await getCategories(token);
        console.log('All Categories:', categories);

        // Get by ID
        const single = await getCategoryById(newCat.category_id, token);
        console.log('Fetched Single:', single);

        // Update it
        const updated = await updateCategory(newCat.category_id, 'Updated Name', token);
        console.log('Updated:', updated);

        // Delete it
        const deletedMsg = await deleteCategory(newCat.category_id, token);
        console.log('Deleted:', deletedMsg);
      } catch (err) {
        console.error('Error:', err.message);
      }
    };

    test();
  }, []);

  return <div>Check console for results.</div>;
};

export default CategoryTester;
