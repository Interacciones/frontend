"use client";
import React from 'react';
import Teacher from './Teacher';

export default function Grid({ teachers, filter, totalCount }) {
  return (
    <>
      {teachers.length === 0 ? (
        <div className='w-full max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md text-center'>
          <span className='font-bold text-indigo-800'>¡Ups! </span>
          <span className='text-gray-700'>No se encontraron profesores. Prueba con otros filtros o inténtalo de nuevo más tarde.</span>
        </div>
      ) : (
        <div className='w-full max-w-7xl mx-auto'>
          <div className='mb-4 px-4'>
            <h2 className='text-xl font-bold text-gray-700'>
              {totalCount} {totalCount === 1 ? 'profesor encontrado' : 'profesores encontrados'}
              {filter.course && ` para "${filter.course}"`}
            </h2>
          </div>
          <div className='grid gap-6 mx-auto justify-items-center w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {teachers.map((teacher) => (
              <Teacher
                props={teacher}
                key={teacher.id}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}