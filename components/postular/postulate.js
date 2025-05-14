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
  
      setMessage('Postulación enviada');
      setRoute('/');
      setOpen(true);
    } catch ({ message }) {
      console.error(message);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if(file.size > 2097152 ){
      alert("El archivo es muy grande. Tamaño máximo 2MB.");
      setPhoto(null);
    } else if( file.type === 'image/jpeg'){
      setPhoto(file);
    } else{
      alert("Por favor elija un archivo .jpg");
      setPhoto(null);
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
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
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
        <div className="min-h-screen bg-gray-100">
          <Header/>  
          <div className="min-h-full flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
                  Postular como profesor particular
                </h2>
              </div>
              <form className="mt-8 space-y-3" onSubmit={handleSubmit}>

                {/* Campo de teléfono de contacto */}
                <div className="rounded-md shadow-sm -space-y-px">
                  <h3 className="text-black text-sm font-semibold mb-1">Teléfono</h3>
                  <div className="mb-2">
                    <label htmlFor="contact-phone" className="sr-only">
                      Teléfono de contacto
                    </label>
                    <input
                      id="contact-phone"
                      name="contact-phone"
                      type="tel"
                      pattern="(\+)(569)[0-9]{8}"
                      title="+56912345678"
                      autoComplete="contact-phone"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="+569..."
                    />
                  </div>
                </div>

                {/* Campo de descripción */}
                <div className="rounded-md shadow-sm -space-y-px">
                  <h3 className="text-black text-sm font-semibold mb-1">Descripción</h3>
                  <div className="mb-2">
                    <label htmlFor="description" className="sr-only">
                      Descripción
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={description}
                      maxLength={maxCharCount}
                      onChange={handleDescriptionChange}
                      className="appearance-none rounded-none relative block w-full h-28 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Hola!!! Soy ..."
                    />
                    <div className="absolute bottom-2 right-2 text-gray-500 text-sm">
                      {descriptionCharCount}/{maxCharCount}
                    </div>
                  </div>
                </div>

                {/* Campo de descripción del precio */}
                <div className="rounded-md shadow-sm -space-y-px">
                  <h3 className="text-black text-sm font-semibold mb-1">Descripción del precio</h3>
                  <div className="mb-2">
                    <label htmlFor="price" className="sr-only">
                      Descripción del precio
                    </label>
                    <textarea
                      id="price"
                      name="price"
                      value={price}
                      maxLength={maxCharCount}
                      onChange={handlePriceChange}
                      className="appearance-none rounded-none relative block w-full h-28 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Por clase cobro..."
                    />
                    <div className="absolute bottom-2 right-2 text-gray-500 text-sm">
                      {priceCharCount}/{maxCharCount}
                    </div>
                  </div>
                </div>

                {/* Campo de curso */}
                <div className="flex flex-col">
                  <h3 className="text-black text-sm font-semibold mb-1">Agregar curso</h3>
                  <div className="flex flex-row justify-between">
                    <label htmlFor="course" className="sr-only">
                      Curso
                    </label>
                    <input
                      id="course"
                      name="course"
                      type="text"
                      maxLength={50}
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      className="appearance-none rounded-none relative block w-3/4 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Nombre curso (ej. Calculo I)"
                    />
                    <select
                      id="subject"
                      name="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="appearance-none rounded-none relative block w-3/4 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    >
                      <option value="" disabled>Selecciona un área</option>
                      {subjects.map((subject, index) => (
                        <option key={index} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                    <div>
                      <button
                        type="button"
                        onClick={handleCourseChange}
                        className="group relative justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>

                <div className="item-list">
                  {selectedCourses.map(
                    ({ course, subject }, index) =>
                      (
                        <div className="item-container" key={index}>
                          <div className="item-name">
                            <div className="flex w-full ring-1 ring-inset rounded-md border-1 px-3.5 py-1 my-1 text-gray-900 shadow-sm ring-gray-300">
                              <span>{course} - {subject}</span>
                              <div className="flex-grow"> </div>
                              <div
                                  className="flex-col items-center justify-between hover:bg-red-100"
                                  onClick={() => handleRemoveProfile({ course, subject })}
                              >
                                  <XMarkIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  }
                </div>

                {/* Campo de foto de perfil */}
                <div className="rounded-md shadow-sm -space-y-px">
                  <h3 className="text-black text-sm font-semibold mb-1">Subir foto de perfil</h3>
                  <div className="mb-4">
                    <label htmlFor="photo" className="sr-only">
                      Foto de perfil
                    </label>
                    <input
                      id="photo"
                      name="photo"
                      type="file"
                      accept=".jpg"
                      placeholder='Escoja una foto de perfil'
                      onChange={(e) => handlePhotoChange(e)}
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                    <p className="mt-1 text-sm text-gray-800" id="file_input_help">JPG (MAX. 2MB).</p>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Postular
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer/> 
      </>
      )}
      {!user && (
        <RouteLoader/>
      )}
    </>
  );
}

export default Postulate;
