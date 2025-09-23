"use client";
import React, { useEffect, useState } from 'react';

export default function CategoryFilter({ selectedCategoryId = '', onChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:3000/categories', {
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        if (res.ok) setCategories(Array.isArray(data.data) ? data.data : []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 transform transition-all w-full">
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
          <select
            value={selectedCategoryId}
            onChange={(e) => onChange(e.target.value)}
            className="block w-full rounded-md border border-gray-300 py-3 pl-3 pr-10 text-base text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          >
            <option value="">Todas las categorías</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        {/* Removed helper text to keep UI clean */}
      </div>
    </div>
  );
}


