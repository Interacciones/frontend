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
          <div className="relative isolate pt-2 pb-20">
              <div className="mx-auto max-w-4xl py-5">
                  <div className="text-center">
                      <h1 className="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                          Bienvenido a Interacciones
                      </h1>
                      <div className="mt-8 flex items-center justify-center gap-x-6">
                          <Link
                              href="/postular"
                              className="rounded-md bg-indigo-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                              Inscribirte como profesor particular
                          </Link>
                      </div>
                  </div>
              </div>
              <div className="mx-auto max-w-4xl py-10">
                  <div className="space-y-10">
                      <div className="flex flex-col md:flex-row items-center bg-indigo-800 text-white p-5 rounded-lg">
                          <div className="md:w-3/4">
                              <h2 className="text-2xl font-bold text-white">Encuentra a tu profesor particular</h2>
                              <p className="mt-4 text-white">Texto descriptivo sobre encontrar a tu profesor particular.</p>
                          </div>
                          <div className="md:w-1/4 ml-4">
                              <img src="https://interac-ciones.s3.us-east-1.amazonaws.com/teaching_example.jpg" alt="Encuentra a tu profesor particular" className="w-full h-auto rounded-lg"/>
                          </div>
                      </div>
                      <div className="flex flex-col md:flex-row-reverse items-center bg-indigo-800 text-white p-5 rounded-lg">
                          <div className="md:w-3/4">
                              <h2 className="text-2xl font-bold text-white">Disfruta de tu experiencia universitaria</h2>
                              <p className="mt-4 text-white">Texto descriptivo sobre disfrutar de la experiencia universitaria.</p>
                          </div>
                          <div className="md:w-1/4 mr-4">
                              <img src="https://interac-ciones.s3.us-east-1.amazonaws.com/university_example.jpg" alt="Disfruta de tu experiencia universitaria" className="w-full h-auto rounded-lg"/>
                          </div>
                      </div>
                      <div className="flex flex-col md:flex-row items-center bg-indigo-800 text-white p-5 rounded-lg">
                          <div className="md:w-3/4">
                              <h2 className="text-2xl font-bold text-white">Confía en nosotros</h2>
                              <p className="mt-4 text-white">Página web creadas por estudiantes de ingeniería, donde la idea es poder conectar a los distintos estudiantes dentro de la universidad, para poder conectar a las personas que necesitan clases con las que las están buscando. </p>
                              
                              <p className="mt-0 text-white">Para su seguridad, el manejo de usuarios y contraseñas está hecho a través de una plataforma de google llamada “Firebase”, por lo que pueden confiar que no tendremos acceso a datos personales suyos, como sus contraseñas. Entonces, que esperas, inicia sesión en interacciones.</p>
                          </div>
                          <div className="md:w-1/4 ml-4">
                              <img src="https://interac-ciones.s3.us-east-1.amazonaws.com/interacciones_firebase.jpg" alt="Confía en nosotros" className="w-full h-auto rounded-lg"/>
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
