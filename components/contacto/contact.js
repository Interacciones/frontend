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
            const response = await fetch(`http://localhost:3000/users-self`, {
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
      const response = await fetch(`http://localhost:3000/contact`, {
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

      setMessage('Mensaje enviado');
      setOpen(true);
    } catch (error) {
      console.log(error.message);
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
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="min-h-full flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
                Contacto
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mb-4">
                  <label htmlFor="name" className="sr-only">
                    Nombre
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Nombre"
                    disabled={loading || !!(user && user.emailVerified)}
                  />
                </div>
              </div>
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mb-4">
                  <label htmlFor="lastName" className="sr-only">
                    Apellido
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Apellido"
                    disabled={loading || !!(user && user.emailVerified)}
                  />
                </div>
              </div>
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mb-4">
                  <label htmlFor="email" className="sr-only">
                    Correo Electrónico
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Correo Electrónico"
                    disabled={loading || !!(user && user.emailVerified)}
                  />
                </div>
              </div>
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mb-4 relative">
                  <label htmlFor="content" className="sr-only">
                    Mensaje
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={handleContentChange}
                    className="appearance-none rounded-none relative block w-full h-28 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Mensaje"
                    maxLength={maxCharCount}
                  />
                  <div className="absolute bottom-2 right-2 text-gray-500 text-sm">
                    {charCount}/{maxCharCount}
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;