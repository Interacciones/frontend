import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

export default function Acordeon({ preguntas }) {
  const [preguntaAbierta, setPreguntaAbierta] = useState(null);

  const togglePregunta = (index) => {
    if (preguntaAbierta === index) {
      setPreguntaAbierta(null);
    } else {
      setPreguntaAbierta(index);
    }
  };

  return (
    <div className="divide-y divide-gray-200">
      {preguntas.map((item, index) => (
        <div key={index} className="py-5 px-6 hover:bg-gray-50 transition-colors">
          <button
            className="w-full flex justify-between items-center text-left focus:outline-none"
            onClick={() => togglePregunta(index)}
            aria-expanded={preguntaAbierta === index}
          >
            <span className="text-lg font-medium text-gray-900">
              {item.pregunta}
            </span>
            <span className="ml-6 flex-shrink-0">
              {preguntaAbierta === index ? (
                <ChevronUpIcon className="h-6 w-6 text-indigo-600 transition-transform duration-300" />
              ) : (
                <ChevronDownIcon className="h-6 w-6 text-indigo-600 transition-transform duration-300" />
              )}
            </span>
          </button>
          
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              preguntaAbierta === index ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="text-base text-gray-700 bg-indigo-50 p-5 rounded-xl border-l-4 border-indigo-500">
              {item.respuesta}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}