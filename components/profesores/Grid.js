"use client";
import React, { useEffect, useState } from 'react';
import Teacher from './Teacher';

export default function Grid({ teachers, filter, totalCount, cantidad, pagina, setPagina }) {
    const [filteredTeachers, setFilteredTeachers] = useState([]);

    useEffect(() => {
        filterTeachers(filter.nombre, filter.curso, filter.area);
    }, [filter, teachers]);

    function removeDiacritics(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    const filterTeachers = (nombre, curso, area) => {
        const normalizedNombre = removeDiacritics(nombre.toLowerCase());
        const normalizedCurso = removeDiacritics(curso.toLowerCase());
        const normalizedArea = removeDiacritics(area.toLowerCase());

        let filtered = teachers;

        if (normalizedNombre) {
            filtered = filtered.filter(teacher => {
                const fullName = removeDiacritics(`${teacher.name} ${teacher.lastName}`.toLowerCase());
                return fullName.includes(normalizedNombre);
            });
        }

        if (normalizedCurso) {
            filtered = filtered.filter(teacher => {
                return teacher.courses.some(course => removeDiacritics(course.toLowerCase()).startsWith(normalizedCurso));
            });
        }

        if (normalizedArea) {
            filtered = filtered.filter(teacher => {
                return teacher.subjects.some(subject => removeDiacritics(subject.toLowerCase()) === normalizedArea);
            });
        }

        setFilteredTeachers(filtered);
    };

    const totalPages = Math.ceil(totalCount / cantidad);

    return (
        <>
            {filteredTeachers.length === 0 ? (
                <div className='my-auto mx-auto font-medium w-full text-2xl md:text-3xl lg:text-4xl lg:text-left lg:max-w-[55%]'>
                    <span className='font-bold'>¡Ups! </span>No se encontraron profesores. Prueba con otros filtros o inténtalo de nuevo más tarde.
                </div>
            ) : (
                <div className='grid mx-auto justify-items-center gap-10 w-full lg:w-[51%] xl:w-[62%] lg:max-w-fit lg:mx-auto sm:grid-cols-1 md:grid-cols-2 ls-2 md:gap-10 lg:grid-cols-2 lg:gap-20 xl:grid-cols-3 xl:gap-14'>
                    {filteredTeachers.map((teacher) => (
                        <Teacher
                            props={teacher}
                            key={teacher.id}
                        />
                    ))}
                </div>
            )}
        </>
    );
}