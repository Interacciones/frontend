"use client";
import React from 'react';
import Teacher from './Teacher';

export default function Grid({ teachers, filter, totalCount }) {
  return (
    <>
      {teachers.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-8 text-center mx-auto max-w-xl">
          <div className="mb-4">
            <svg className="h-16 w-16 text-indigo-300 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">No se encontraron profesores</h3>
          <p className="mt-2 text-gray-600">
            Prueba con otros filtros o términos de búsqueda más generales.
          </p>
        </div>
      ) : (
        <div>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {totalCount} {totalCount === 1 ? 'profesor encontrado' : 'profesores encontrados'}
              {filter.course && <span className="ml-2 text-indigo-600">para &ldquo;{filter.course}&rdquo;</span>}
            </h2>
            
            <div className="flex items-center text-sm text-gray-600">
              <svg className="mr-1 h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              Mostrando los resultados más relevantes
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="transform transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Teacher props={teacher} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}