import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Grid from './Grid';
import RouteLoader from '../components/RouteLoader';
import Link from 'next/link';

function Emprendimientos() {
  const [projects, setProjects] = useState([]);
  const [quantity, setQuantity] = useState(15);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getProjects = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          quantity: quantity,
          page: page,
        }).toString();

        const res = await fetch(`http://localhost:3000/projects?${queryParams}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          }
        });
        const data = await res.json();
        if (res.ok) {
          setProjects(data.data);
          setTotalCount(data.data.length);
        } else {
          console.error('Error fetching projects:', data.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, [quantity, page]);

  const totalPages = Math.ceil(totalCount / quantity);

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-wrap justify-center text-black bg-gray-100 py-4 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-800 mb-4">Emprendimientos Universitarios</h1>
          <Link href="/postular-emprendimiento">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Publicar mi emprendimiento
            </button>
          </Link>
        </div>
        {loading ? (
          <RouteLoader />
        ) : (
          <Grid projects={projects} totalCount={totalCount} cantidad={quantity} pagina={page} setPagina={setPage} />
        )}
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
      <div className='flex justify-center bg-gray-100 py-4'>
        <select
          name="Cantidad"
          id="Cantidad"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className='bg-gray-200 text-gray-700 px-3 py-1 rounded'
        >
          <option value={9}>9</option>
          <option value={15}>15</option>
          <option value={21}>21</option>
        </select>
      </div>
      <Footer />
    </>
  );
}

export default Emprendimientos; 