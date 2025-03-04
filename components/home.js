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
              <div className="mx-auto max-w-2xl py-5">
                  <div className="text-center">
                      <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                          Bienvenido a Interacciones
                      </h1>
                      <div className="mt-10 flex items-center justify-center gap-x-6">
                          <Link
                              href="/profesores"
                              className="rounded-md bg-indigo-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                              Buscar Profesor
                          </Link>

                          <Link
                              href="/postular"
                              className="text-sm font-semibold leading-6 text-gray-900"
                          >
                              Inscribirte como profesor particular <span aria-hidden="true">→</span>
                          </Link>
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
