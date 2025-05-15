"use client";
import React from 'react';
import Project from './Project';

export default function Grid({ projects, totalCount, cantidad, pagina, setPagina }) {
  return (
    <>
      {projects.length === 0 ? (
        <div className='my-auto mx-auto font-medium w-full text-2xl md:text-3xl lg:text-4xl lg:text-left lg:max-w-[55%]'>
          <span className='font-bold'>¡Ups! </span>No se encontraron emprendimientos. Inténtalo de nuevo más tarde.
        </div>
      ) : (
        <div className='grid mx-auto justify-items-center gap-10 w-full lg:w-[80%] xl:w-[90%] lg:max-w-fit lg:mx-auto sm:grid-cols-1 md:grid-cols-2 ls-2 md:gap-10 lg:grid-cols-2 lg:gap-20 xl:grid-cols-3 xl:gap-14'>
          {projects.map((project) => (
            <Project
              props={project}
              key={project.id}
            />
          ))}
        </div>
      )}
    </>
  );
} 