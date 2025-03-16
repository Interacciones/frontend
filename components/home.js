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
                              <p className="mt-4 text-white">
                                ¿Necesitas ayuda con un ramo difícil? Puedes encontrarla a través de tus propios compañeros que te pueden dar la ayuda ideal que necesitas.
                                Explora los distintos perfiles, revisa sus valoraciones, lee sus descripciones y encuentra al profesor particular que necesitas.
                                Contacta a tu profesor particular, coordina la clase y disfruta de tu aprendizaje.
                              </p>
                          </div>
                          <div className="md:w-1/4 ml-4">
                              <img src="https://interac-ciones.s3.us-east-1.amazonaws.com/teaching_example.jpg" alt="Encuentra a tu profesor particular" className="w-full h-auto rounded-lg"/>
                          </div>
                      </div>
                      <div className="flex flex-col md:flex-row-reverse items-center bg-indigo-800 text-white p-5 rounded-lg">
                          <div className="md:w-3/4">
                              <h2 className="text-2xl font-bold text-white">Disfruta de tu experiencia universitaria</h2>
                              <p className="mt-4 text-white">
                                La universidad muchas veces es un gran desafío, especialmente cuando nos encontramos con ramos complicados que nos cuestan más de lo que esperábamos.
                                Con interacciones, puedes encontrar a tus compañeros que te pueden ayudar a superar esos desafíos, y así disfrutar más de tu experiencia universitaria.
                                Tanto los alumnos que ayudar en los ramos, como los que necesitan ayuda, pueden aprovechar esta plataforma para tener una mejor experiencia universitaria.
                              </p>
                          </div>
                          <div className="md:w-1/4 mr-4">
                              <img src="https://interac-ciones.s3.us-east-1.amazonaws.com/university_example.jpg" alt="Disfruta de tu experiencia universitaria" className="w-full h-auto rounded-lg"/>
                          </div>
                      </div>
                      <div className="flex flex-col md:flex-row items-center bg-indigo-800 text-white p-5 rounded-lg">
                          <div className="md:w-3/4">
                              <h2 className="text-2xl font-bold text-white">Confía en nosotros</h2>
                              <p className="mt-4 text-white">
                                Página web creadas por estudiantes de ingeniería, donde la idea es poder conectar a los distintos estudiantes dentro de la universidad, especialmente a los estudiantes que necesitan clases particulares con los estudiantes que las imparten. 
                                </p>
                              <p className="mt-0 text-white">
                                Para su seguridad, el manejo de usuarios y contraseñas está hecho a través de una plataforma de google llamada “Firebase”, por lo que pueden confiar que no tendremos acceso a datos personales suyos, como sus contraseñas. Entonces, que esperas,
                                <Link href="/login"> inicia sesión en interacciones</Link>.
                              </p>
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
