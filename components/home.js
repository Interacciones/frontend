"use client";
import Link from 'next/link'
import Header from './components/Header';
import Footer from './components/Footer';

export default function Page() {
  return (
    <div className="bg-white">
      <Header />
      <main className="min-h-screen">
        {/* Hero Section - Inspirado en Otter */}
        <div className="relative bg-indigo-50 overflow-hidden">
          <div className="absolute inset-y-0 w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-indigo-100 opacity-80"></div>
            <div className="h-full w-full bg-[url('https://interac-ciones.s3.us-east-1.amazonaws.com/teaching_example.jpg')] bg-cover bg-right-top md:bg-center bg-no-repeat blur-sm opacity-20"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
            <div className="text-center lg:text-left lg:w-1/2 lg:pr-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-indigo-900">
                Encuentra a tu profesor particular!
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl">
                Busca a tu profesor particular en tu universidad, y contacta con ellos para coordinar tus clases. También puedes postularte como profesor particular y ayudar a otros.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/profesores"
                  className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-indigo-800 rounded-full hover:bg-indigo-700 shadow-lg transition duration-300 ease-in-out"
                >
                  Encontrar Profesor
                </Link>
                <Link
                  href="/postular"
                  className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-indigo-800 bg-white border border-indigo-800 rounded-full hover:bg-indigo-50 shadow-lg transition duration-300 ease-in-out"
                >
                  Convertirme en Profesor
                </Link>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0 lg:w-1/2">
              <div className="relative mx-auto w-full max-w-md">
                <div className="absolute -inset-1 bg-indigo-200 rounded-2xl transform rotate-3"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img 
                    src="https://interac-ciones.s3.us-east-1.amazonaws.com/teaching_example.jpg" 
                    alt="Estudiantes aprendiendo" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Proof Section
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-gray-500 font-medium">
              Confiado por estudiantes de las mejores universidades de Chile
            </p>
            <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="col-span-1 flex justify-center items-center">
                <span className="text-lg font-semibold text-gray-400">Universidad de Chile</span>
              </div>
              <div className="col-span-1 flex justify-center items-center">
                <span className="text-lg font-semibold text-gray-400">Universidad Católica</span>
              </div>
              <div className="col-span-1 flex justify-center items-center">
                <span className="text-lg font-semibold text-gray-400">U. de Concepción</span>
              </div>
              <div className="col-span-1 flex justify-center items-center">
                <span className="text-lg font-semibold text-gray-400">U. Técnica F. Santa María</span>
              </div>
            </div>
          </div>
        </div> */}
        
        {/* How It Works */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900">Cómo funciona Interacciones</h2>
              <p className="mt-4 text-xl text-gray-600">Conectamos estudiantes con profesores particulares en 3 simples pasos</p>
            </div>
            
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              <div className="bg-indigo-50 rounded-xl p-8 text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-800 text-white text-lg font-bold mx-auto">
                  1
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">Encuentra tu profesor</h3>
                <p className="mt-2 text-base text-gray-600">Busca profesores por materia y explora sus perfiles con valoraciones y reseñas.</p>
              </div>
              
              <div className="bg-indigo-50 rounded-xl p-8 text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-800 text-white text-lg font-bold mx-auto">
                  2
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">Coordina tus clases</h3>
                <p className="mt-2 text-base text-gray-600">Contacta directamente con el profesor y organiza horarios que se adapten a tu agenda.</p>
              </div>
              
              <div className="bg-indigo-50 rounded-xl p-8 text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-800 text-white text-lg font-bold mx-auto">
                  3
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">Aprende y mejora</h3>
                <p className="mt-2 text-base text-gray-600">Recibe clases personalizadas y mejora tu rendimiento académico. Deja tu valoración después.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Highlighted Features */}
        <div className="bg-indigo-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">La ayuda académica que necesitas, cuando la necesitas</h2>
                <ul className="mt-8 space-y-5">
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-indigo-800" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <p className="ml-3 text-lg text-gray-600">Profesores particulares de tu propia institución educativa</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-indigo-800" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <p className="ml-3 text-lg text-gray-600">Clases personalizadas adaptadas a tu ritmo de aprendizaje</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-indigo-800" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <p className="ml-3 text-lg text-gray-600">Múltiples áreas de estudio y materias disponibles</p>
                  </li>
                </ul>
                <div className="mt-10">
                  <Link
                    href="/profesores"
                    className="inline-block px-6 py-3 text-base font-medium text-white bg-indigo-800 rounded-full hover:bg-indigo-700 transition duration-300 ease-in-out"
                  >
                    Explorar profesores
                  </Link>
                </div>
              </div>
              
              <div className="relative mx-auto w-full max-w-md lg:max-w-full">
                <div className="absolute -inset-1 bg-indigo-200 rounded-2xl transform -rotate-2"></div>
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img 
                    src="https://interac-ciones.s3.us-east-1.amazonaws.com/university_example.jpg" 
                    alt="Experiencia universitaria" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-indigo-800">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white">Mejora tu rendimiento académico hoy</h2>
            <p className="mt-4 text-xl text-indigo-100">
              Únete a los estudiantes que ya han mejorado sus calificaciones con Interacciones
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/profesores"
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-indigo-800 bg-white rounded-full hover:bg-gray-100 shadow-lg transition duration-300 ease-in-out"
              >
                Encontrar Profesor
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-transparent border border-white rounded-full hover:bg-indigo-700 shadow-lg transition duration-300 ease-in-out"
              >
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  )
}
