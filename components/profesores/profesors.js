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

        const res = await fetch(`https://interaccionesuni.com/tutors?${queryParams}`, {
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
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-indigo-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://interac-ciones.s3.us-east-1.amazonaws.com/teaching_example.jpg')] bg-cover bg-center bg-no-repeat opacity-10"></div>
        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Encuentra a tu profesor particular
            </h1>
            <p className="mt-4 text-xl text-indigo-100 max-w-3xl mx-auto">
              Explora perfiles de profesores en tu institución y conecta con quien mejor se adapte a tus necesidades académicas
            </p>
          </div>
        </div>
      </div>
      
      {/* Filter Section */}
      <div className="relative z-10 -mt-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Filter setFilter={setFilter} />
      </div>
      
      {/* Results Section */}
      <div className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <RouteLoader />
            </div>
          ) : (
            <>
              <Grid teachers={teachers} filter={filter} totalCount={totalCount} />
              
              {/* Pagination Controls */}
              {totalCount > 0 && (
                <div className="mt-12 space-y-6">
                  <div className="flex justify-center">
                    <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => page > 1 && setPage(page - 1)}
                        disabled={page === 1}
                        className={`relative inline-flex items-center px-3 py-2 rounded-l-md border ${
                          page === 1 
                            ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'border-gray-300 bg-white text-indigo-600 hover:bg-indigo-50'
                        }`}
                      >
                        <span className="sr-only">Anterior</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        const pageNum = i + 1;
                        const isCurrentPage = pageNum === page;
                        
                        return (
                          <button
                            key={i}
                            onClick={() => setPage(pageNum)}
                            className={`relative inline-flex items-center px-4 py-2 border ${
                              isCurrentPage
                                ? 'z-10 bg-indigo-600 border-indigo-600 text-white'
                                : 'bg-white border-gray-300 text-gray-900 hover:bg-indigo-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => page < totalPages && setPage(page + 1)}
                        disabled={page === totalPages}
                        className={`relative inline-flex items-center px-3 py-2 rounded-r-md border ${
                          page === totalPages 
                            ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'border-gray-300 bg-white text-indigo-600 hover:bg-indigo-50'
                        }`}
                      >
                        <span className="sr-only">Siguiente</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                  
                  <div className="flex justify-center items-center">
                    <label htmlFor="cantidad" className="mr-2 text-sm font-medium text-gray-700">Mostrar</label>
                    <select
                      id="cantidad"
                      name="cantidad"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-gray-900 font-medium focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                      <option value={9}>9</option>
                      <option value={15}>15</option>
                      <option value={21}>21</option>
                    </select>
                    <span className="ml-2 text-sm font-medium text-gray-700">por página</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default Profesores;