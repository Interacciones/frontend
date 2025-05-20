import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Filter from './Filter';
import Grid from './Grid';
import RouteLoader from '../components/RouteLoader';

function Profesores() {
  const [teachers, setTeachers] = useState([]);
  const [filter, setFilter] = useState({ course: '', idSubject: '' });
  const [quantity, setQuantity] = useState(15);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getTeachers = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          cantidad: quantity,
          pagina: page,
          course: filter.course,
          idSubject: filter.idSubject,
        }).toString();

        const res = await fetch(`http://localhost:3000/tutors?${queryParams}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          }
        });
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
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getTeachers();
  }, [quantity, page, filter]);

  useEffect(() => {
    const { course, idSubject } = router.query;
    setFilter({ course: course || '', idSubject: idSubject || '' });
  }, [router.query]);

  const totalPages = Math.ceil(totalCount / quantity);

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col bg-gray-100 py-4 lg:py-8 px-4 sm:px-6 lg:px-8">
        {/* Filtro centrado */}
        <div className='w-full max-w-4xl mx-auto mb-8'>
          <Filter setFilter={setFilter} />
        </div>
        
        {/* Resultados de profesores */}
        {loading ? (
          <div className="w-full flex justify-center">
            <RouteLoader />
          </div>
        ) : (
          <div className="w-full">
            <Grid teachers={teachers} filter={filter} totalCount={totalCount} cantidad={quantity} pagina={page} setPagina={setPage} />
          </div>
        )}

        {/* Paginación */}
        <div className='flex justify-center mt-8 mb-4'>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${page === index + 1 ? 'bg-indigo-800 text-white' : 'bg-gray-200 text-gray-700 hover:bg-indigo-100'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Selector de cantidad */}
        <div className='flex justify-center pb-4'>
          <div className="flex items-center">
            <span className="mr-2 text-gray-700">Mostrar:</span>
            <select
              name="Cantidad"
              id="Cantidad"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className='bg-gray-200 text-gray-700 px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500'
            >
              <option value={9}>9</option>
              <option value={15}>15</option>
              <option value={21}>21</option>
            </select>
            <span className="ml-2 text-gray-700">por página</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profesores;