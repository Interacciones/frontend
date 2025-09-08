"use client";
import React, { useEffect, useState } from 'react';
import { AuthContextProvider } from '../components/context/AuthContext';
import '../app/globals.css';
import Header from '../components/components/Header';
import Footer from '../components/components/Footer';
import RouteLoader from '../components/components/RouteLoader';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { UserAuth } from '../components/context/AuthContext';

function EditProjectContent() {
  const { user } = UserAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [instagramProfile, setInstagramProfile] = useState('');
  const [showContact, setShowContact] = useState(true);
  const [photos, setPhotos] = useState([]); // new photos to upload
  const [photosToKeep, setPhotosToKeep] = useState([]); // ids of existing photos kept (if available)
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSelfProject = async () => {
      if (!user) return;
      try {
        const res = await fetch('http://localhost:3000/projects-self', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Authorization': `Bearer ${user.stsTokenManager.accessToken}`
          }
        });
        const data = await res.json();
        setProject(data.data);
        setName(data.data?.name || '');
        setDescription(data.data?.description || '');
        setInstagramProfile(data.data?.instagramProfile || '');
        setShowContact(Boolean(data.data?.showContact));
        // If API returns photo objects with ids, we can keep them via photosToKeep
        if (Array.isArray(data.data?.photos)) {
          // backend for GET projects-self may return [{id, url}] according to doc
          const existingIds = data.data.photos.map(p => p.id).filter(Boolean);
          setPhotosToKeep(existingIds);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchSelfProject();
  }, [user]);

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(prev => [...prev, ...files]);
  };

  const handleRemoveNewPhoto = (index) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const toggleKeepPhoto = (photoId) => {
    setPhotosToKeep(prev => prev.includes(photoId) ? prev.filter(id => id !== photoId) : [...prev, photoId]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!project) return;
    try {
      const formData = new FormData();
      if (name) formData.append('name', name);
      if (description) formData.append('description', description);
      if (instagramProfile) formData.append('instagramProfile', instagramProfile);
      formData.append('showContact', showContact);
      if (photosToKeep.length > 0) formData.append('photosToKeep', photosToKeep.join(','));
      photos.forEach((photo, index) => {
        formData.append(`photo${index}`, photo);
      });

      const res = await fetch(`http://localhost:3000/projects/${project.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${user.stsTokenManager.accessToken}`
        },
        body: formData
      });
      if (res.ok) {
        setMessage('Actualizado. Quedará pendiente de aprobación.');
        setOpen(true);
      } else {
        setMessage('Error al actualizar el emprendimiento');
        setOpen(true);
      }
    } catch (e) {
      setMessage('Error en la solicitud');
      setOpen(true);
    }
  };

  const handleDelete = async () => {
    if (!project) return;
    try {
      const res = await fetch(`http://localhost:3000/projects/${project.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.stsTokenManager.accessToken}`
        }
      });
      if (res.ok) {
        setMessage('Emprendimiento eliminado');
        setOpen(true);
      } else {
        setMessage('Error al eliminar el emprendimiento');
        setOpen(true);
      }
    } catch (e) {
      setMessage('Error en la solicitud');
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    window.location.href = '/emprendimientos';
  };

  return (
    <>
      {loading ? (
        <RouteLoader />
      ) : (
        <>
          <Header />
          <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl bg-white rounded-2xl p-6 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Editar emprendimiento</h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 text-gray-900" rows={5} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
                  <div className="flex items-center rounded-md border border-gray-300">
                    <span className="pl-3 text-gray-500">@</span>
                    <input value={instagramProfile} onChange={(e) => setInstagramProfile(e.target.value)} className="appearance-none block w-full px-3 py-2 border-0 placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm" />
                  </div>
                </div>
                <div className="flex items-center">
                  <input id="show-contact" type="checkbox" checked={showContact} onChange={(e) => setShowContact(e.target.checked)} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                  <label htmlFor="show-contact" className="ml-2 block text-sm text-gray-900">Mostrar mi información de contacto</label>
                </div>
                {Array.isArray(project?.photos) && project.photos.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Fotos actuales</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {project.photos.map((p, idx) => (
                        <label key={idx} className="block">
                          <img src={p.url || p} alt="Foto actual" className="h-24 w-full object-cover rounded-md" />
                          {p.id && (
                            <div className="mt-1 text-sm text-gray-700">
                              <input type="checkbox" checked={photosToKeep.includes(p.id)} onChange={() => toggleKeepPhoto(p.id)} className="mr-2" />
                              Mantener
                            </div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subir nuevas fotos (máx 5 total)</label>
                  <input type="file" multiple accept=".jpg,.jpeg,.png" onChange={handlePhotoChange} />
                  {photos.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                      {photos.map((photo, index) => (
                        <div key={index} className="relative">
                          <img src={URL.createObjectURL(photo)} alt={`Preview ${index}`} className="h-24 w-full object-cover rounded-md" />
                          <button type="button" onClick={() => handleRemoveNewPhoto(index)} className="absolute top-1 right-1 bg-red-500 rounded-full p-1 text-white text-xs">X</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between gap-3 pt-2">
                  <button type="submit" className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700">Guardar cambios</button>
                  <button type="button" onClick={handleDelete} className="inline-flex items-center px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700">Eliminar emprendimiento</button>
                </div>
              </form>
            </div>
          </div>
          <Footer />
          <Dialog open={open} onClose={handleClose}>
            <DialogContent>
              <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cerrar</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </>
  );
}

export default function EditarEmprendimientoPage() {
  return (
    <AuthContextProvider>
      <EditProjectContent />
    </AuthContextProvider>
  );
}


