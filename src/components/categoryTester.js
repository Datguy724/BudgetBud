// src/components/CategoryTester.js
import React, { useEffect } from 'react';
import {
    createCategory,
    deleteCategory,
    getCategories,
    getCategoryById,
    updateCategory
} from '../api/categories';

const CategoryTester = () => {
  const token = 'YOUR_JWT_TOKEN_HERE'; // Replace with a real token

  useEffect(() => {
    const test = async () => {
      try {
        // Create a new category
        const newCat = await createCategory('Test Category', token);
        console.log('Created:', newCat);

        // Get all categories
        const categories = await getCategories(token);
        console.log('All Categories:', categories);

        // Get by ID
        const single = await getCategoryById(newCat.id, token);
        console.log('Fetched Single:', single);

        // Update it
        const updated = await updateCategory(newCat.id, 'Updated Name', token);
        console.log('Updated:', updated);

        // Delete it
        const deletedMsg = await deleteCategory(newCat.id, token);
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
