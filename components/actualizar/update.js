// components/Actualizar.js
"use client"
import React, { useState, useEffect} from 'react';
import { UserAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import RouteLoader from '../components/RouteLoader';

function Actualizar() {
  const [phone, setPhone] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [course, setCourse] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [currentPhoto, setCurrentPhoto] = useState(null);
  const [subject, setSubject] = useState('');
  const [subjects, setSubjects] = useState([]);
  const { user } = UserAuth();
  const [open, setOpen] = useState(false);
  const [redirectUser, setRedirectUser] = useState(false);
  const [message, setMessage] = useState('');
  const [route, setRoute] = useState('');
  const [descriptionCharCount, setDescriptionCharCount] = useState(0);
  const [priceCharCount, setPriceCharCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const maxCharCount = 1000;
  const router = useRouter();
  
  const handleClose = () => {
    setOpen(false);
    setRedirectUser(true); 
  };

  useEffect(() => {
    const fetchProfile = async (currentUser) => {
      try {
        setInitialLoading(true);
        const response = await fetch(`https://interserver.lat/tutors-self`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${currentUser.accessToken}`
          }, 
        });
        const result = await response.json();
        setPhone(result.data.contactNumber);
        setDescription(result.data.description);
        setDescriptionCharCount(result.data.description ? result.data.description.length : 0);
        setPrice(result.data.priceDescription);
        setPriceCharCount(result.data.priceDescription ? result.data.priceDescription.length : 0);
        setSelectedCourses(result.data.courses || []);
        setSelectedSubjects(result.data.subjects || []);
        setCurrentPhoto(result.data.photo);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setInitialLoading(false);
      }
    };

    const fetchSubjects = async () => {
      try {
        const response = await fetch('https://interserver.lat/subjects');
        const data = await response.json();
        if (response.ok) {
          setSubjects(data.data.map(subject => subject.subject));
        } else {
          console.error('Error fetching subjects:', data.message);
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setOpen(true);
        setMessage('Debes iniciar sesión para actualizar tu perfil');
        setRoute('/login');
      } else if (!currentUser.emailVerified) {
        setOpen(true);
        setMessage('Debes verificar tu correo para actualizar tu perfil');
        setRoute('/');
      } else {
        fetchProfile(currentUser);
        fetchSubjects();
      }
    });
  }, [])

  if (redirectUser) {
    router.push(route);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("courses", JSON.stringify(selectedCourses));
      formData.append("subjects", JSON.stringify(selectedSubjects));
      formData.append("photo", photo);
      formData.append("contactNumber", phone);
      formData.append("priceDescription", price);

      if (!photo) {
        formData.append("changedPhoto", false);
      } else {
        formData.append("changedPhoto", true);
      }
  
      const response = await fetch(`https://interserver.lat/own-tutor`, {
        method: 'PATCH',
        body: formData,
        headers: {
          'Authorization': `Bearer ${user.stsTokenManager.accessToken}`
        }
      });
  
      if (!response.ok) throw Error(message);
  
      setMessage('Tu perfil ha sido actualizado exitosamente. Los cambios se verán reflejados inmediatamente.');
      setRoute('/');
      setOpen(true);
    } catch ({ message }) {
      console.error('Error updating profile:', message);
      setMessage('Ha ocurrido un error al actualizar tu perfil. Por favor intenta de nuevo.');
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if(file.size > 2097152) {
        alert("El archivo es muy grande. Tamaño máximo 2MB.");
        setPhoto(null);
        setPhotoPreview(null);
      } else if(file.type === 'image/jpeg') {
        setPhoto(file);
        
        // Create preview
        const reader = new FileReader();
        reader.onload = () => {
          setPhotoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Por favor elija un archivo .jpg");
        setPhoto(null);
        setPhotoPreview(null);
      }
    }
  };

  const handleCourseChange = () => {
    if (course) {
      const inList = selectedCourses.includes(course);

      if (!inList) {
        const updatedSelectedCourses = [ ...selectedCourses];
        updatedSelectedCourses.push(course);
        setSelectedCourses(updatedSelectedCourses);
      }
    }
    setCourse('');
  };

  const handleSubjectChange = () => {
    if (subject) {
      const inList = selectedSubjects.includes(subject);

      if (!inList) {
        const updatedSelectedSubjects = [ ...selectedSubjects];
        updatedSelectedSubjects.push(subject);
        setSelectedSubjects(updatedSelectedSubjects);
      }
    }
    setSubject('');
  };

  const handleRemoveCourse = (course) => {
    const newSelectedCourses = selectedCourses.filter(
      (item) => item !== course
    );
    setSelectedCourses(newSelectedCourses);
  };

  const handleRemoveSubject = (subject) => {
    const newSelectedSubjects = selectedSubjects.filter(
      (item) => item !== subject
    );
    setSelectedSubjects(newSelectedSubjects);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxCharCount) {
      setDescription(value);
      setDescriptionCharCount(value.length);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxCharCount) {
      setPrice(value);
      setPriceCharCount(value.length);
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header/>
      
      {/* Hero Section */}
      <div className="relative bg-indigo-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://interac-ciones.s3.us-east-1.amazonaws.com/teaching_example.jpg')] bg-cover bg-center bg-no-repeat opacity-10"></div>
        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Actualizar Perfil de Profesor
            </h1>
            <p className="mt-4 text-xl text-indigo-100 max-w-3xl mx-auto">
              Mantén tu información actualizada para que los estudiantes puedan encontrarte
            </p>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 sm:p-10">
              {initialLoading ? (
                <div className="flex justify-center py-8">
                  <RouteLoader />
                </div>
              ) : user ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Profile Photo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Foto de perfil
                    </label>
                    <div className="mt-1 flex items-center space-x-6">
                      <div className={`flex-shrink-0 h-32 w-32 rounded-full overflow-hidden bg-gray-100 ${photoPreview || currentPhoto ? 'border-2 border-indigo-500' : ''}`}>
                        {photoPreview ? (
                          <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" />
                        ) : currentPhoto ? (
                          <img src={currentPhoto} alt="Current" className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-gray-200">
                            <svg className="h-16 w-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div>
                        <label htmlFor="photo-upload" className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Cambiar foto
                        </label>
                        <input
                          id="photo-upload"
                          name="photo"
                          type="file"
                          accept=".jpg,.jpeg"
                          onChange={handlePhotoChange}
                          className="sr-only"
                        />
                        <p className="mt-2 text-xs text-gray-500">JPG solamente. Máx. 2MB.</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Teléfono */}
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700">
                      Teléfono de contacto
                    </label>
                    <div className="mt-1">
                      <input
                        id="contact-phone"
                        name="contact-phone"
                        type="tel"
                        pattern="(\+)(569)[0-9]{8}"
                        title="+56912345678"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                        placeholder="+569XXXXXXXX"
                      />
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Formato: +56912345678</p>
                  </div>
                  
                  {/* Descripción */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Tu descripción como profesor
                    </label>
                    <div className="mt-1 relative">
                      <textarea
                        id="description"
                        name="description"
                        rows={5}
                        required
                        value={description}
                        onChange={handleDescriptionChange}
                        maxLength={maxCharCount}
                        className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                        placeholder="Preséntate a tus futuros estudiantes. Incluye tu experiencia, área de estudio, estilo de enseñanza, etc."
                      />
                      <div className="absolute bottom-3 right-3 text-sm text-gray-500">
                        {descriptionCharCount}/{maxCharCount}
                      </div>
                    </div>
                  </div>
                  
                  {/* Descripción del precio */}
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Descripción de precios y modalidades
                    </label>
                    <div className="mt-1 relative">
                      <textarea
                        id="price"
                        name="price"
                        rows={4}
                        required
                        value={price}
                        onChange={handlePriceChange}
                        maxLength={maxCharCount}
                        className="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-900"
                        placeholder="Detalla tus tarifas por hora/sesión, descuentos para grupos, modalidades disponibles (presencial/online), etc."
                      />
                      <div className="absolute bottom-3 right-3 text-sm text-gray-500">
                        {priceCharCount}/{maxCharCount}
                      </div>
                    </div>
                  </div>
                  
                  {/* Cursos */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cursos</label>
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {selectedCourses.map((selectedCourse, index) => (
                          <div 
                            key={index} 
                            className="inline-flex items-center py-1 pl-3 pr-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                          >
                            {selectedCourse}
                            <button
                              type="button"
                              onClick={() => handleRemoveCourse(selectedCourse)}
                              className="ml-1 flex-shrink-0 h-5 w-5 rounded-full inline-flex items-center justify-center text-indigo-500 hover:bg-indigo-200 hover:text-indigo-600 focus:outline-none focus:bg-indigo-500 focus:text-white"
                            >
                              <span className="sr-only">Eliminar</span>
                              <XMarkIcon className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          name="course"
                          id="course"
                          value={course}
                          onChange={(e) => setCourse(e.target.value)}
                          className="flex-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm text-gray-900"
                          placeholder="Ingresa un curso (ej. Cálculo I, Programación, etc.)"
                        />
                        <button
                          type="button"
                          onClick={handleCourseChange}
                          disabled={!course}
                          className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300"
                        >
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Áreas de estudio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Áreas de estudio</label>
                    <div className="flex flex-col space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {selectedSubjects.map((selectedSubject, index) => (
                          <div 
                            key={index}
                            className="inline-flex items-center py-1 pl-3 pr-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                          >
                            {selectedSubject}
                            <button
                              type="button"
                              onClick={() => handleRemoveSubject(selectedSubject)}
                              className="ml-1 flex-shrink-0 h-5 w-5 rounded-full inline-flex items-center justify-center text-indigo-500 hover:bg-indigo-200 hover:text-indigo-600 focus:outline-none focus:bg-indigo-500 focus:text-white"
                            >
                              <span className="sr-only">Eliminar</span>
                              <XMarkIcon className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <select
                          id="subject"
                          name="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="flex-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-sm text-gray-900"
                        >
                          <option value="" disabled className="text-gray-900">Selecciona un área</option>
                          {subjects.map((subjectOption) => (
                            <option key={subjectOption} value={subjectOption} className="text-gray-900">
                              {subjectOption}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={handleSubjectChange}
                          disabled={!subject}
                          className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300"
                        >
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Actualizando...
                        </>
                      ) : (
                        'Guardar cambios'
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex justify-center py-8">
                  <RouteLoader />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer/>
      
      {/* Dialog */}
      <Dialog 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="alert-dialog-title" 
        aria-describedby="alert-dialog-description"
      >
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

export default Actualizar;
