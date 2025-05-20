"use client";
import React, { useState, useEffect } from 'react';

function Filter({ setFilter, initialFilter = { course: '', idSubject: '' } }) {
  const [course, setCourse] = useState(initialFilter.course || '');
  const [idSubject, setIdSubject] = useState(initialFilter.idSubject || '');
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    setCourse(initialFilter.course || '');
    setIdSubject(initialFilter.idSubject || '');
  }, [initialFilter]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch('https://interaccionesuni.com/subjects');
        const data = await response.json();
        if (response.ok) {
          setAreas(data.data);
        } else {
          console.error('Error fetching areas:', data.message);
        }
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    };

    fetchAreas();
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleFilter();
    }
  };

  const handleFilter = () => {
    setFilter({ course, idSubject });
  };

  const handlePopularFilter = (courseName) => {
    setCourse(courseName);
    setFilter({ course: courseName, idSubject });
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 transform transition-all">
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
        <div className="md:col-span-3">
          <label htmlFor="curso" className="block text-sm font-medium text-gray-700 mb-1">
            Curso
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="text"
              name="curso"
              id="curso"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ej: Cálculo I, Programación, Física"
              className="block w-full rounded-md border-gray-300 py-3 pl-4 pr-12 focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
            Área de estudio
          </label>
          <select
            id="area"
            name="area"
            value={idSubject}
            onChange={(e) => setIdSubject(e.target.value)}
            className="block w-full rounded-md border border-gray-300 py-3 pl-3 pr-10 text-base text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          >
            <option value="">Todas las áreas</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id} className="text-gray-900">{area.subject}</option>
            ))}
          </select>
        </div>
        
        <button
          onClick={handleFilter}
          className="md:col-span-1 w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
        >
          <svg className="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          Buscar
        </button>
      </div>
      
      {/* Filtros populares */}
      <div className="mt-6">
        <div className="flex items-center">
          <span className="text-sm font-medium text-gray-700 mr-3">Filtros populares:</span>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => handlePopularFilter('Cálculo I')}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
            >
              Cálculo I
            </button>
            <button 
              onClick={() => handlePopularFilter('Optimización')}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
            >
              Optimización
            </button>
            <button 
              onClick={() => handlePopularFilter('Programación')}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
            >
              Programación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;