"use client";
import Link from 'next/link'
import Header from './components/Header';
import Footer from './components/Footer';

export default function Page() {
  return (
    <div>
      <Header />
      <main className="min-h-screen bg-white">
        <div className="bg-white h-full">
          <div className="relative isolate">
              <div className="mx-auto max-w-4xl py-12 px-6">
                  <div className="text-center">
                      <h1 className="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-indigo-800 to-indigo-600">
                          Bienvenido a Interacciones
                      </h1>
                      <p className="mt-6 text-lg leading-8 text-gray-600">
                          La plataforma que conecta estudiantes con profesores particulares para mejorar tu experiencia universitaria
                      </p>
                      <div className="mt-10 flex items-center justify-center gap-x-6">
                          <Link
                              href="/profesores"
                              className="rounded-md bg-white px-5 py-3 text-sm font-semibold text-indigo-800 shadow-sm ring-1 ring-indigo-800 hover:bg-indigo-50 transition duration-300 ease-in-out"
                          >
                              Buscar Profesores
                          </Link>
                          <Link
                              href="/postular"
                              className="rounded-md bg-indigo-800 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition duration-300 ease-in-out"
                          >
                              Inscribirte como Profesor
                          </Link>
                      </div>
                  </div>
              </div>
              <div className="mx-auto max-w-4xl py-10 px-6">
                  <div className="space-y-8">
                      <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-indigo-800 to-indigo-700 text-white p-8 rounded-xl shadow-lg transform transition duration-300 hover:scale-[1.02]">
                          <div className="md:w-3/4">
                              <h2 className="text-2xl font-bold text-white">Encuentra a tu profesor particular</h2>
                              <p className="mt-4 text-white/90 leading-relaxed">
                                ¿Necesitas ayuda con un ramo difícil? Puedes encontrarla a través de tus propios compañeros que te pueden dar la ayuda ideal que necesitas.
                                Explora los distintos perfiles, revisa sus valoraciones, lee sus descripciones y encuentra al profesor particular que necesitas.
                              </p>
                              <Link href="/profesores" className="inline-block mt-4 text-white font-semibold hover:underline">
                                Explorar profesores →
                              </Link>
                          </div>
                          <div className="md:w-1/4 ml-4 mt-6 md:mt-0">
                              <img src="https://interac-ciones.s3.us-east-1.amazonaws.com/teaching_example.jpg" alt="Encuentra a tu profesor particular" className="w-full h-auto rounded-lg shadow-md"/>
                          </div>
                      </div>
                      <div className="flex flex-col md:flex-row-reverse items-center bg-gradient-to-r from-indigo-700 to-indigo-800 text-white p-8 rounded-xl shadow-lg transform transition duration-300 hover:scale-[1.02]">
                          <div className="md:w-3/4">
                              <h2 className="text-2xl font-bold text-white">Disfruta de tu experiencia universitaria</h2>
                              <p className="mt-4 text-white/90 leading-relaxed">
                                La universidad muchas veces es un gran desafío, especialmente cuando nos encontramos con ramos complicados que nos cuestan más de lo que esperábamos.
                                Con interacciones, puedes encontrar a tus compañeros que te pueden ayudar a superar esos desafíos, y así disfrutar más de tu experiencia universitaria.
                              </p>
                          </div>
                          <div className="md:w-1/4 mr-4 mt-6 md:mt-0">
                              <img src="https://interac-ciones.s3.us-east-1.amazonaws.com/university_example.jpg" alt="Disfruta de tu experiencia universitaria" className="w-full h-auto rounded-lg shadow-md"/>
                          </div>
                      </div>
                      <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-indigo-800 to-indigo-700 text-white p-8 rounded-xl shadow-lg transform transition duration-300 hover:scale-[1.02]">
                          <div className="md:w-3/4">
                              <h2 className="text-2xl font-bold text-white">Confía en nosotros</h2>
                              <p className="mt-4 text-white/90 leading-relaxed">
                                Página web creada por estudiantes de ingeniería, donde la idea es poder conectar a los distintos estudiantes dentro de la universidad, especialmente a los estudiantes que necesitan clases particulares con los estudiantes que las imparten. 
                              </p>
                              <p className="mt-4 text-white/90 leading-relaxed">
                                Para su seguridad, el manejo de usuarios y contraseñas está hecho a través de Google Firebase, garantizando la protección de sus datos personales.
                                <Link href="/login" className="ml-2 font-semibold hover:underline">
                                  Inicia sesión ahora →
                                </Link>
                              </p>
                          </div>
                          <div className="md:w-1/4 ml-4 mt-6 md:mt-0">
                              <img src="https://interac-ciones.s3.us-east-1.amazonaws.com/interacciones_firebase.jpg" alt="Confía en nosotros" className="w-full h-auto rounded-lg shadow-md"/>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
    )
}
