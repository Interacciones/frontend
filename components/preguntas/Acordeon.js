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
        <div key={index} className="py-4 px-4 sm:px-6">
          <button
            className="w-full flex justify-between items-center text-left focus:outline-none"
            onClick={() => togglePregunta(index)}
          >
            <span className="text-lg font-medium text-gray-900">
              {item.pregunta}
            </span>
            {preguntaAbierta === index ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {preguntaAbierta === index && (
            <div className="mt-3 text-base text-gray-700 bg-gray-50 p-4 rounded-md">
              {item.respuesta}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}