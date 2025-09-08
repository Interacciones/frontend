"use client"
import React, { useState, useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Header from '../components/Header';
import Footer from '../components/Footer';
import RouteLoader from '../components/RouteLoader';

function ProjectForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [instagramProfile, setInstagramProfile] = useState('');
  const [showContact, setShowContact] = useState(true);
  const [photos, setPhotos] = useState([]);
  const [open, setOpen] = useState(false);
  const [redirectUser, setRedirectUser] = useState(false);
  const [message, setMessage] = useState('');
  const [route, setRoute] = useState('');
  const [descriptionCharCount, setDescriptionCharCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const maxCharCount = 2000;
  const maxPhotos = 5;
  const { user } = UserAuth();
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    setRedirectUser(true);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setOpen(true);
        setMessage('Debes iniciar sesión para publicar tu emprendimiento');
        setRoute('/login');
      } else if (!currentUser.emailVerified) {
        setOpen(true);
        setMessage('Debes verificar tu correo para publicar tu emprendimiento');
        setRoute('/');
      }
    });
  }, []);

  if (redirectUser) {
    router.push(route);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (photos.length === 0) {
      alert("Por favor sube al menos una foto de tu emprendimiento.");
      return;
    }
    
    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("instagramProfile", instagramProfile);
      formData.append("showContact", showContact);
      
      // Append each photo to the formData
      photos.forEach((photo, index) => {
        formData.append(`photo${index}`, photo);
      });

      const response = await fetch('http://localhost:3000/projects', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${user.stsTokenManager.accessToken}`
        },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      setMessage('¡Emprendimiento enviado! Quedará pendiente de aprobación.');
      setRoute('/emprendimientos');
      setOpen(true);
    } catch (error) {
      console.error(error);
      setMessage('Error al publicar el emprendimiento. Inténtalo nuevamente.');
      setOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (photos.length + files.length > maxPhotos) {
      alert(`Puedes subir un máximo de ${maxPhotos} fotos.`);
      return;
    }
    
    const invalidFiles = files.filter(file => 
      file.size > 2097152 || !['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)
    );
    
    if (invalidFiles.length > 0) {
      alert("Las imágenes deben ser JPG o PNG y no superar los 2MB.");
      return;
    }
    
    setPhotos(prevPhotos => [...prevPhotos, ...files]);
  };

  const handleRemovePhoto = (index) => {
    setPhotos(prevPhotos => prevPhotos.filter((_, i) => i !== index));
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxCharCount) {
      setDescription(value);
      setDescriptionCharCount(value.length);
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
      
      {user && (
        <>
          {submitting && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
              <RouteLoader />
            </div>
          )}
          <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="min-h-full flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-lg w-full space-y-8">
                <div>
                  <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
                    Publicar tu emprendimiento
                  </h2>
                </div>
                <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
                  {/* Nombre del emprendimiento */}
                  <div className="rounded-md shadow-sm -space-y-px">
                    <h3 className="text-black text-sm font-semibold mb-1">Nombre del emprendimiento</h3>
                    <div className="mb-2">
                      <label htmlFor="name" className="sr-only">
                        Nombre del emprendimiento
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Nombre de tu emprendimiento"
                      />
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="rounded-md shadow-sm -space-y-px">
                    <h3 className="text-black text-sm font-semibold mb-1">Descripción</h3>
                    <div className="mb-2 relative">
                      <label htmlFor="description" className="sr-only">
                        Descripción
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        required
                        value={description}
                        maxLength={maxCharCount}
                        onChange={handleDescriptionChange}
                        className="appearance-none rounded-none relative block w-full h-40 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Describe tu emprendimiento, productos o servicios que ofreces"
                      />
                      <div className="absolute bottom-2 right-2 text-gray-500 text-sm">
                        {descriptionCharCount}/{maxCharCount}
                      </div>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="rounded-md shadow-sm -space-y-px">
                    <h3 className="text-black text-sm font-semibold mb-1">Perfil de Instagram (opcional)</h3>
                    <div className="mb-2">
                      <label htmlFor="instagram" className="sr-only">
                        Perfil de Instagram
                      </label>
                      <div className="flex items-center rounded-md border border-gray-300 focus-within:ring-indigo-500 focus-within:border-indigo-500">
                        <span className="pl-3 text-gray-500">@</span>
                        <input
                          id="instagram"
                          name="instagram"
                          type="text"
                          value={instagramProfile}
                          onChange={(e) => setInstagramProfile(e.target.value)}
                          className="appearance-none block w-full px-3 py-2 border-0 placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm"
                          placeholder="tu_emprendimiento"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mostrar información de contacto */}
                  <div className="flex items-center mb-2">
                    <input
                      id="show-contact"
                      name="show-contact"
                      type="checkbox"
                      checked={showContact}
                      onChange={(e) => setShowContact(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="show-contact" className="ml-2 block text-sm text-gray-900">
                      Mostrar mi información de contacto
                    </label>
                  </div>

                  {/* Subir fotos */}
                  <div className="rounded-md shadow-sm -space-y-px">
                    <h3 className="text-black text-sm font-semibold mb-1">
                      Subir fotos (máximo {maxPhotos})
                    </h3>
                    <div className="mb-4">
                      <label htmlFor="photos" className="sr-only">
                        Fotos del emprendimiento
                      </label>
                      <input
                        id="photos"
                        name="photos"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        multiple
                        onChange={handlePhotoChange}
                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      />
                      <p className="mt-1 text-sm text-gray-800">
                        JPG, JPEG o PNG (MAX. 2MB por foto).
                      </p>
                    </div>
                  </div>

                  {/* Preview de fotos */}
                  {photos.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                      {photos.map((photo, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt={`Preview ${index}`}
                            className="h-24 w-full object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemovePhoto(index)}
                            className="absolute top-1 right-1 bg-red-500 rounded-full p-1 text-white"
                          >
                            <XMarkIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${submitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                      {submitting ? 'Publicando…' : 'Publicar emprendimiento'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
      
      {!user && (
        <RouteLoader />
      )}
    </>
  );
}

export default ProjectForm; 