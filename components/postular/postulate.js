// components/Postulate.js
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

function Postulate() {
  const [phone, setPhone] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [course, setCourse] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [photo, setPhoto] = useState(null);
  const [subject, setSubject] = useState('');
  const [subjects, setSubjects] = useState([]);
  const { user } = UserAuth();
  const [open, setOpen] = useState(false);
  const [redirectUser, setRedirectUser] = useState(false);
  const [message, setMessage] = useState('');
  const [route, setRoute] = useState('');
  const [descriptionCharCount, setDescriptionCharCount] = useState(0);
  const [priceCharCount, setPriceCharCount] = useState(0);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const maxCharCount = 1000;
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    setRedirectUser(true); 
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        setOpen(true);
        setMessage('Debes iniciar sesión para postular');
        setRoute('/login');
      } else if (!currentUser.emailVerified) {
        setOpen(true);
        setMessage('Debes verificar tu correo para postular');
        setRoute('/');
      }
    });
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch('http://localhost:3000/subjects');
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

    fetchSubjects();
  }, []);

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
      formData.append("photo", photo);
      formData.append("contactNumber", phone);
      formData.append("priceDescription", price);
  
      const response = await fetch(`http://localhost:3000/tutors`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${user.stsTokenManager.accessToken}`
        },
      });
  
      if (!response.ok) {
        throw new Error(response.statusText)
      };
  
      setMessage('Tu postulación ha sido enviada exitosamente. Pronto revisaremos tu perfil y te notificaremos cuando sea aprobado.');
      setRoute('/');
      setOpen(true);
    } catch ({ message }) {
      console.error(message);
      setMessage('Ha ocurrido un error al enviar tu postulación. Por favor intenta nuevamente.');
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if(file.size > 2097152 ){
        alert("El archivo es muy grande. Tamaño máximo 2MB.");
        setPhoto(null);
        setPhotoPreview(null);
      } else if( file.type === 'image/jpeg'){
        setPhoto(file);
        
        // Create preview
        const reader = new FileReader();
        reader.onload = () => {
          setPhotoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else{
        alert("Por favor elija un archivo .jpg");
        setPhoto(null);
        setPhotoPreview(null);
      }
    }
  };

  const handleCourseChange = () => {
    if (course && subject) {
      const inList = selectedCourses.some(
        (item) => item.course === course && item.subject === subject
      );

      if (!inList) {
        const updatedSelectedCourses = [ ...selectedCourses];
        updatedSelectedCourses.push({ course, subject });
        setSelectedCourses(updatedSelectedCourses);
      }
    }
    setCourse('');
    setSubject('');
  };

  const handleRemoveProfile = (selectedCourse) => {
    const newSelectedCourses = selectedCourses.filter(
      (item) => item.course !== selectedCourse.course || item.subject !== selectedCourse.subject
    );
    setSelectedCourses(newSelectedCourses);
  }

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
              Conviértete en Profesor Particular
            </h1>
            <p className="mt-4 text-xl text-indigo-100 max-w-3xl mx-auto">
              Comparte tus conocimientos con otros estudiantes y haz clases particulares
            </p>
          </div>
        </div>
      </div>
      
      {/* Form Section */}
      <div className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 sm:p-10">
              {user ? (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Profile Photo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Foto de perfil
                    </label>
                    <div className="mt-1 flex items-center space-x-6">
                      <div className={`flex-shrink-0 h-32 w-32 rounded-full overflow-hidden bg-gray-100 ${photoPreview ? 'border-2 border-indigo-500' : ''}`}>
                        {photoPreview ? (
                          <img src={photoPreview} alt="Preview" className="h-full w-full object-cover" />
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
                          Seleccionar foto
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
                    <label className="block text-sm font-medium text-gray-700">
                      Cursos que puedes enseñar
                    </label>
                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label htmlFor="subject" className="block text-xs font-medium text-gray-500">
                          Área de estudio
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-gray-900"
                        >
                          <option value="" disabled className="text-gray-900">Selecciona un área</option>
                          {subjects.map((subjectOption) => (
                            <option key={subjectOption} value={subjectOption} className="text-gray-900">
                              {subjectOption}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="course" className="block text-xs font-medium text-gray-500">
                          Nombre del curso
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="course"
                            id="course"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 text-gray-900"
                            placeholder="Ej: Cálculo I"
                          />
                          <button
                            type="button"
                            onClick={handleCourseChange}
                            disabled={!subject || !course}
                            className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 shadow-sm text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300"
                          >
                            Agregar
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Selected Courses */}
                    {selectedCourses.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-500">Cursos agregados:</h4>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {selectedCourses.map((selectedCourse, index) => (
                            <div 
                              key={index} 
                              className="inline-flex items-center py-1 pl-3 pr-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                            >
                              {selectedCourse.subject}: {selectedCourse.course}
                              <button
                                type="button"
                                onClick={() => handleRemoveProfile(selectedCourse)}
                                className="ml-1 flex-shrink-0 h-5 w-5 rounded-full inline-flex items-center justify-center text-indigo-500 hover:bg-indigo-200 hover:text-indigo-600 focus:outline-none focus:bg-indigo-500 focus:text-white"
                              >
                                <span className="sr-only">Eliminar</span>
                                <XMarkIcon className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div>
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
                          Enviando...
                        </>
                      ) : (
                        'Enviar postulación'
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex justify-center">
                  <RouteLoader />
                </div>
              )}
            </div>
          </div>
          
          {/* Information Box */}
          <div className="mt-8 bg-indigo-50 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">¿Cómo funciona el proceso?</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-800 text-white flex items-center justify-center font-semibold text-sm">1</div>
                <p className="ml-3 text-sm text-gray-600">Completa el formulario con tu información completa y precisa.</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-800 text-white flex items-center justify-center font-semibold text-sm">2</div>
                <p className="ml-3 text-sm text-gray-600">Nuestro equipo revisará tu solicitud, lo que puede tomar hasta 48 horas.</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-800 text-white flex items-center justify-center font-semibold text-sm">3</div>
                <p className="ml-3 text-sm text-gray-600">Recibirás un correo de confirmación cuando tu perfil sea aprobado.</p>
              </div>
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

export default Postulate;
