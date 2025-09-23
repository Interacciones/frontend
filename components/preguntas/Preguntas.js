"use client";
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Acordeon from './Acordeon';
import Link from 'next/link';

export default function Preguntas() {
  // Lista de preguntas frecuentes
  const preguntas = [
    {
      pregunta: "¿Cómo funciona la página?",
      respuesta: "Nuestra plataforma conecta a estudiantes con profesores particulares y también permite publicar emprendimientos universitarios. Puedes buscar perfiles públicos de profes, ver reseñas y contactarlos, y además descubrir (o crear) proyectos de emprendimiento. Pronto agregaremos más funcionalidades. Si tienes dudas, escribenos desde la página de contacto."
    },
    {
      pregunta: "Tengo problemas con el link para verificar mi usuario ¿Qué hago?",
      respuesta: "Al registrarte vas a recibir un correo con un enlace de verificación. Debes abrir ese correo y hacer clic en el enlace para verificar tu usuario. Si no lo encuentras, revisa tu carpeta de Spam/No deseado."
    },
    {
      pregunta: "Postulé para crear un perfil de profe particular o un emprendimiento, ¿cuánto tarda la aceptación?",
      respuesta: "La revisión suele demorar entre 24 y 48 horas. Si pasa más tiempo, por favor contáctanos desde la página de contacto."
    },
    {
      pregunta: "Quiero actualizar mi información de profesor particular, ¿cómo lo hago?",
      respuesta: "Ingresa a tu perfil, edita tu información y envía los cambios. Se enviará al equipo para revisión y, al igual que al crear, quedará pendiente de aprobación."
    },
    {
      pregunta: "Quiero actualizar mi emprendimiento, ¿cómo lo hago?",
      respuesta: "Desde tu perfil puedes editar tu(s) emprendimiento(s). Al guardar, los cambios se envían para revisión y quedan pendientes de aprobación."
    },
    {
      pregunta: "Tuve un problema con un profesor, ¿qué hacen ustedes?",
      respuesta: "Puedes escribirnos desde la página de contacto con los detalles. Podemos ayudar a establecer un diálogo con el profesor, pero no nos hacemos responsables por acuerdos, pagos u otros aspectos externos a la plataforma."
    },
    {
      pregunta: "¿Cobran comisión por el uso de la página?",
      respuesta: "No. La plataforma no cobra comisión por el uso ni por contactarse con profesores o publicar emprendimientos."
    },
    {
      pregunta: "Quiero colaborar con ustedes, ¿cómo hago?",
      respuesta: "Visita la página de contacto, contanos tu idea y veremos cómo podemos colaborar."
    },
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-indigo-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://interac-ciones.s3.us-east-1.amazonaws.com/university_example.jpg')] bg-cover bg-center bg-no-repeat opacity-10"></div>
        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Preguntas Frecuentes
            </h1>
            <p className="mt-4 text-xl text-indigo-100 max-w-3xl mx-auto">
              Encuentra respuestas a las dudas más comunes sobre nuestra plataforma
            </p>
          </div>
        </div>
      </div>
      
      {/* FAQ Content */}
      <div className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-1">
              <Acordeon preguntas={preguntas} />
            </div>
          </div>
          
          {/* Additional Help Section */}
          <div className="mt-12 bg-indigo-50 rounded-xl p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900">¿No encontraste lo que buscabas?</h2>
            <p className="mt-2 text-gray-600">
              Si tienes alguna otra duda o necesitas ayuda adicional, no dudes en contactarnos.
            </p>
            <div className="mt-4">
              <Link 
                href="/contacto" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                Contactar soporte
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}