"use client";
import React, { useState, useEffect } from 'react';

function Filter({ setFilter }) {
  const [nombre, setNombre] = useState('');
  const [curso, setCurso] = useState('');
  const [area, setArea] = useState('');
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await fetch('https://interaccionesuni.com/subjects');
        const data = await response.json();
        if (response.ok) {
          setAreas(data.data.split(', '));
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
    setFilter({ nombre, curso, area });
  };

  return (
    <div className='flex flex-wrap mx-auto w-full justify-center'>
        <h1 className='mx-auto text-center font-semibold text-4xl p-4 md:w-full'>Encuentra a tu nuevo <br /> profesor particular:</h1>
        <div className='flex flex-wrap mx-auto w-full md:w-[35%] text-white my-3 lg:my-7 lg:w-full'>
            <label htmlFor="Nombre" className='w-full bg-indigo-800 p-3 rounded-t-xl'>Nombre</label>
            <input
              type="text"
              name="Nombre"
              id="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              onKeyDown={handleKeyPress}
              className='w-full bg-indigo-600 focus:outline-none p-3 rounded-b-xl' />
        </div>
        <div className='flex flex-wrap mx-auto w-full md:w-[35%] text-white my-3 lg:my-7 rounded-xl lg:w-full'>
            <label htmlFor="Curso" className='w-full bg-indigo-800 p-3 rounded-t-xl'>Curso</label>
            <input
              type="text"
              name="Curso"
              id="Curso"
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
              onKeyDown={handleKeyPress}
              className='w-full bg-indigo-600 focus:outline-none p-3 rounded-b-xl' />
        </div>
        <div className='flex flex-wrap mx-auto w-full md:w-[35%] text-white my-3 lg:my-7 rounded-xl lg:w-full'>
            <label htmlFor="Area" className='w-full bg-indigo-800 p-3 rounded-t-xl'>Área de estudio</label>
            <select
              name="Area"
              id="Area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className='w-full bg-indigo-600 focus:outline-none p-3 rounded-b-xl'
            >
              <option value="">Selecciona un área</option>
              {areas.map((area, index) => (
                <option key={index} value={area}>{area}</option>
              ))}
            </select>
        </div>
        <button
          onClick={handleFilter}
          className='font-semibold text-black flex flex-wrap items-center justify-center bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 transition-all rounded-md mx-auto w-44 px-3.5 py-2.5 text-sm md:my-auto md:h-16 lg:h-fit'
        >
          <img src="/lens.svg" className='h-3 mr-2' alt=""/>
          Buscar
        </button>
    </div>
  )
}

export default Filter;