import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Filter from './Filter';
import Grid from './Grid';

function Profesores() {
  const [teachers, setTeachers] = useState([]);
  const [filter, setFilter] = useState({ nombre: '', curso: '', area: '' });
  const [quantity, setQuantity] = useState(15);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const queryParams = new URLSearchParams({
          cantidad: quantity,
          pagina: page,
          nombre: filter.nombre,
          curso: filter.curso,
          area: filter.area,
        }).toString();

        const res = await fetch(`${"http://localhost:3000"}/tutors?${queryParams}`, 
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache',
              'Pragma': 'no-cache',
            }
          }
        )
        const data = await res.json();
        if (res.ok) {
          const formattedTeachers = data.data.map((teacher) => ({
            ...teacher,
            fullName: `${teacher.name} ${teacher.lastName}`,
            coursesInfo: teacher.courses,
          }));
          setTeachers(formattedTeachers);
          setTotalCount(data.totalCount);
        } else {
          console.error('Error fetching teachers:', data.message);
        }
      } catch (error) {
        console.log(error);
        return [];
      }
    }
    getTeachers();
  }, [quantity, page, filter]);

  const totalPages = Math.ceil(totalCount / quantity);

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-wrap justify-between text-black bg-gray-100 py-4 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className='w-full mx-auto mb-7 lg:w-[25rem] lg:ml-1 lg:mr-0'>
          <Filter setFilter={setFilter} setCantidad={setQuantity} />
        </div>
        <Grid teachers={teachers} filter={filter} totalCount={totalCount} cantidad={quantity} pagina={page} setPagina={setPage} />
      </div>
      <div className='flex justify-center bg-gray-100 py-4'>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${page === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <Footer />
    </>
  )
}

export default Profesores;