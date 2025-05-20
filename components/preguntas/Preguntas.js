"use client";
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Acordeon from './Acordeon';

export default function Preguntas() {
  // Lista de preguntas frecuentes
  const preguntas = [
    {
      pregunta: "¿Cómo funciona la página?",
      respuesta: "Esta página está hecha para que puedan encontrar a otros alumnos que son profesores particulares para clases de apoyo, o para que puedan postular como profesores particulares. Los perfiles de los profesores son públicos y estos pueden ser contactados a través de sus métodos de contacto que aparecen en su perfil. Se pueden dejar comentarios en estos depeniendo como fue la clase y si es que se recomienda o no. En caso de cualquier duda nos pueden contactar a través de la página de contacto :)"
    },
    {
      pregunta: "Tengo problemas con el link para verificar mi usuario ¿Qué hago?",
      respuesta: "Este es un problema en el que estamos trabajando actualmente. Si al apretar el link aparece que el link no es válido y aparece \"Try again\", la cuenta ya se verificó y no es necesario volver a hacerlo. Para poder hacer esto efectivo, habría que cerrar sesión y volver a abrirla.  "
    },
    {
      pregunta: "Postulé para crear un perfil de profe particular ¿Cuánto tiempo tarda para que lo acepten?",
      respuesta: "Una vez que postulan para poder tener su perfil arriba, esta postulación llega a los administradores de la página para que la puedan manejar y aceptar. El tiempo de respuesta depende de la disponibilidad del equipo, pero no debería ser más de 48 horas. Si no recibieron respuesta en ese tiempo, por favor contactenos a través de la página de contacto."
    },
    {
      pregunta: "Quiero actualizar mi información de profe particular ¿Cómo lo hago?",
      respuesta: "Para poder actualizar la información de su perfil, deben ingresar a su perfil y apretar el botón de \"Perfil de profesor\". Esto los llevará a su perfil y en la esquina superior izquierda deberían ver un ícono que al apretarlo debería permitirles actualizar su perfil. Ahí cambian la información que deseen cambiar, envían la solicitud y esta será recibida por el equipo. Una vez que la solicitud sea aceptada, recibirán un mail de confirmación. "
    },
    // {
    //   pregunta: "Inicié sesión y verifiqué pero no me funcionan los botones de la página, ¿Qué hago?",
    //   respuesta: "Este caso es muy raro, pero si llegase a ocurrir, por favor cierren sesión y vuelvan a iniciar sesión. Si el problema persiste, por favor contáctenos a través de la página de contacto."
    // }
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
              <a 
                href="/contacto" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              >
                Contactar soporte
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}