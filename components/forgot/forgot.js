"use client"
import React, { useState, useEffect } from 'react';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import Link from 'next/link'

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState('');
  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);

  useEffect(() => {
    let timer;
    if (isCooldown) {
      timer = setInterval(() => {
        setCooldownTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsCooldown(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isCooldown) {
      setMessage(`Por favor, espere ${cooldownTime} segundos antes de intentar nuevamente.`);
      setDone(true);
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Si existe una cuenta con ese correo electrónico, se ha enviado un correo para restablecer la contraseña.");
      setDone(true);
      setIsCooldown(true);
      setCooldownTime(300); // 300 seconds cooldown (5 minutes)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Recuperar Contraseña
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Campo de correo electrónico */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email-address" className="sr-only">
                Dirección de correo electrónico
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Correo Electrónico"
              />
            </div>
          </div>

          {done && (
            <div className="flex items-left h-2 pb-6">
              <span className='text-indigo-600 text-xs'>{message}</span>
            </div>
          )}

          {/* Botones y opciones */}
          <div className="flex items-center justify-center">
            {/* Agregar boton de volver a la pagina de iniciar sesion*/}
            <div className="text-sm">
              <Link
                href="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Volver a iniciar sesión
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={isCooldown}
            >
              Recuperar contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
