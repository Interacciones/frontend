"use client";
import React, { useState, useEffect } from 'react';

function Filter({ setFilter }) {
  const [course, setCourse] = useState('');
  const [idSubject, setIdSubject] = useState('');
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch('http://localhost:3000/subjects');
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

  return (
    <div className='w-full max-w-4xl bg-white rounded-xl shadow-md p-6 mx-auto'>
      <h1 className='text-center font-bold text-3xl text-indigo-800 mb-6'>Encuentra a tu profesor particular</h1>
      
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
        <div className='text-white'>
          <label htmlFor="Curso" className='block w-full bg-indigo-800 p-3 rounded-t-lg font-medium'>Curso</label>
          <input
            type="text"
            name="Curso"
            id="Curso"
            placeholder="Ej: Cálculo I, Programación, Física"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            onKeyDown={handleKeyPress}
            className='w-full bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 p-3 rounded-b-lg placeholder-indigo-200' />
        </div>
        
        <div className='text-white'>
          <label htmlFor="Area" className='block w-full bg-indigo-800 p-3 rounded-t-lg font-medium'>Área de estudio</label>
          <select
            name="Area"
            id="Area"
            value={idSubject}
            onChange={(e) => setIdSubject(e.target.value)}
            className='w-full bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 p-3 rounded-b-lg'
          >
            <option value="">Todas las áreas</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>{area.subject}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className='flex justify-center'>
        <button
          onClick={handleFilter}
          className='font-semibold text-black flex items-center justify-center bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 transition-all rounded-lg w-48 px-5 py-3 text-sm shadow-md'
        >
          <img src="/lens.svg" className='h-4 mr-2' alt=""/>
          Buscar Profesores
        </button>
      </div>
    </div>
  )
}

export default Filter;