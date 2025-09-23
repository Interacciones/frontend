"use client";
import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

function Contact() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const { user } = UserAuth();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [charCount, setCharCount] = useState(0);
  const maxCharCount = 500;
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setIsVerified(user.emailVerified);
      if (user.emailVerified) {
        const fetchUserProfile = async () => {
          try {
            const response = await fetch(`https://interserver.lat/users-self`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.stsTokenManager.accessToken}`
              }
            });
            const data = await response.json();
            if (response.ok) {
              setName(data.data.name);
              setLastName(data.data.lastName);
              setEmail(data.data.email);
            } else {
              console.error('Error fetching user profile:', data.message);
            }
          } catch (error) {
            console.error('Error fetching user profile:', error);
          } finally {
            setLoading(false);
          }
        };
        fetchUserProfile();
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleClose = () => {
    setOpen(false);
    router.push('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://interserver.lat/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user && { 'Authorization': `Bearer ${user.stsTokenManager.accessToken}` })
        },
        body: JSON.stringify({
          name,
          lastName,
          email,
          content
        })
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      setMessage('Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.');
      setOpen(true);
      if (!user) {
        setName('');
        setLastName('');
        setEmail('');
      }
      setContent('');
      setCharCount(0);
    } catch (error) {
      console.error(error.message);
      setMessage('Ha ocurrido un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
      setOpen(true);
    }
  };

  const handleContentChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxCharCount) {
      setContent(value);
      setCharCount(value.length);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-indigo-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://interac-ciones.s3.us-east-1.amazonaws.com/university_example.jpg')] bg-cover bg-center bg-no-repeat opacity-10"></div>
        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Contáctanos
            </h1>
            <p className="mt-4 text-xl text-indigo-100 max-w-3xl mx-auto">
              Estamos aquí para responder tus dudas y escuchar tus sugerencias
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact Form Section */}
      <div className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nombre
                    </label>
                    <div className="mt-1">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-500 text-gray-900"
                        placeholder="Tu nombre"
                        disabled={loading || !!(user && user.emailVerified)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Apellido
                    </label>
                    <div className="mt-1">
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-500 text-gray-900"
                        placeholder="Tu apellido"
                        disabled={loading || !!(user && user.emailVerified)}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo Electrónico
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100 disabled:text-gray-500 text-gray-900"
                      placeholder="tu@email.com"
                      disabled={loading || !!(user && user.emailVerified)}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                    Mensaje
                  </label>
                  <div className="mt-1 relative">
                    <textarea
                      id="content"
                      name="content"
                      required
                      value={content}
                      onChange={handleContentChange}
                      rows={6}
                      className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                      placeholder="Escribe tu mensaje aquí..."
                      maxLength={maxCharCount}
                    />
                    <div className="absolute bottom-3 right-3 text-sm text-gray-500">
                      {charCount}/{maxCharCount}
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                  >
                    Enviar mensaje
                  </button>
                </div>
                
              </form>
              
              {/* Contact Info */}
              <div className="mt-10 pt-6 border-t border-gray-200">
                <div className="flex items-center text-indigo-800">
                  <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">equipo.interacciones@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      
      {/* Dialog for success/error messages */}
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: '#4338CA' }}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Contact;