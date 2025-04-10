// components/Login.js
"use client"
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";
import { UserAuth } from '../context/AuthContext';
import Link from 'next/link'
import { useRouter } from 'next/router';
import LoadingIcon from '../components/LoadingIcon'; // Import the LoadingIcon component

/*
El sign in puede tirar estos errores:
"auth/invalid-email" ==> Thrown if the email address is not valid.
"auth/user-disabled" ==> Thrown if the user corresponding to the given email has been disabled.
"auth/user-not-found" ==> Thrown if there is no user corresponding to the given email
"auth/wrong-password" ==> Thrown if the password is invalid for the given email, or the account corresponding to the email does not have a password set.
*/

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { user } = UserAuth();
  const [error, setError] = useState(false);
  const [message, setMessage] = useState('');
  const [redirectUser, setRedirectUser] = useState(false);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const router = useRouter();
  
  if (redirectUser) {
    router.push('/');
  }

  // Transform the function above to a async await function
  async function registerUser() {
    setLoading(true);
    if (password === confirmPassword) {
      try {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        
        await fetch((`https://interaccionesuni.com/users`), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "token": userCredentials.user.uid, 
            "email": email,
            "name": nombre, 
            "lastName": apellido, 
          }),
        });
        
        const createdUser = userCredentials.user;
        await sendEmailVerification(createdUser);
        
        // Cerrar sesión después del registro
        await auth.signOut();
        
        // Mostrar mensaje de éxito y instrucciones
        setMessage("Registro exitoso. Por favor, verifica tu correo electrónico antes de iniciar sesión.");
        setError(false); // No es un error, es un mensaje de éxito
        
        // Volver a la vista de inicio de sesión
        setIsRegistering(false);
        
        // Limpiar los campos del formulario
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setNombre('');
        setApellido('');
        
      } catch(error) {
        // Manejar específicamente el caso de correo ya en uso
        if (error.code === 'auth/email-already-in-use') {
          setMessage("Este correo electrónico ya está registrado. Por favor, usa otro o intenta iniciar sesión.");
        } else {
          setMessage(error.message);
        }
        setError(true);
      } finally {
        setLoading(false);
      }
    } else {
      setMessage("Las contraseñas no coinciden");
      setError(true);
      setLoading(false);
    }
  };

  async function loginUser() {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      // Verificar si el correo electrónico está verificado
      if (!userCredential.user.emailVerified) {
        // Si no está verificado, cerrar sesión y mostrar mensaje
        await auth.signOut();
        setMessage("Por favor verifica tu correo electrónico antes de iniciar sesión. Revisa tu bandeja de entrada.");
        setError(true);
        setLoading(false);
        return;
      }
      
      // Si está verificado, redirigir al usuario
      setRedirectUser(true);
    } catch({message}) {
      setMessage("Email y/o contraseña incorrectos");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      // Register
      await registerUser();
    } else {
      // Login
      await loginUser();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
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
                pattern=".+@uc\.cl"
                title="@uc.cl"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Correo Electrónico"
              />
            </div>
          </div>

          {/* Campo de contraseña */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>
          </div>

          {/* Confirmación de contraseña (solo si se está registrando) */}
          {isRegistering && (
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label htmlFor="password-confirm" className="sr-only">
                  Confirmar Contraseña
                </label>
                <input
                  id="password-confirm"
                  name="password-confirm"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Confirmar Contraseña"
                />
              </div>
            </div>
          )}

          {/* Campo de Nombre */}
          {isRegistering && (<div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="given-name" className="sr-only">
                Nombre
              </label>
              <input
                id="given-name"
                name="given-name"
                autoComplete="given-name"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Nombre"
              />
            </div>
          </div>
          )}

          {/* Campo de Apellido */}
          {isRegistering && (
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="apellido" className="sr-only">
                Apellido
              </label>
              <input
                id="family-name"
                name="family-name"
                autoComplete="family-name"
                required
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Apellido"
              />
            </div>
          </div>
          )}

          {message && (
            <div className={`flex items-left h-auto ${error ? 'text-red-600' : 'text-green-600'} text-xs`}>
              <span>{message}</span>
            </div>
          )}

          {/* Botones y opciones */}
          <div className="flex items-center justify-between">

            <div className="text-sm">
              <button
                type="button"
                onClick={() => setIsRegistering(!isRegistering)}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {isRegistering ? 'Iniciar Sesión' : 'Registrarse'}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`mb-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {loading ? <LoadingIcon /> : (isRegistering ? 'Registrarse' : 'Iniciar Sesión')}
            </button>
          </div>
          <Link
            href="/forgot"
            className="font-medium text-indigo-600 hover:text-indigo-500 text-center"
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </form>
        <div>
            <Link
              href="/"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Volver
            </Link>
          </div>
      </div>
    </div>
  );
}

export default Login;
