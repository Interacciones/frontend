"use client";
import React, { useEffect, useState } from 'react';

export default function CategorySelector({ selectedIds = [], onChange }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:3000/categories', {
          headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        if (res.ok) {
          setCategories(Array.isArray(data.data) ? data.data : []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const toggle = (id) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id];
    onChange(next);
  };

  if (loading) return <p className="text-gray-700">Cargando categorías…</p>;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => toggle(cat.id)}
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              selectedIds.includes(cat.id)
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-white text-indigo-700 border-indigo-200 hover:bg-indigo-50'
            }`}
            title={cat.description || ''}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}


