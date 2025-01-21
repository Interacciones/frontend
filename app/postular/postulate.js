// components/Postulate.js
"use client"
import React, { useState, useEffect} from 'react';
import { UserAuth } from '../../components/context/AuthContext';
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
import { auth } from "../../components/firebase";
import RouteLoader from '../components/RouteLoader';

function Postulate() {
  const [phone, setPhone] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [course, setCourse] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const { user } = UserAuth();
  const [open, setOpen] = useState(false);
  const [redirectUser, setRedirectUser] = useState(false);
  const [message, setMessage] = useState('');
  const [route, setRoute] = useState('');
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
  }, [])

  if (redirectUser) {
    router.push(route);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("token", user.uid);
      formData.append("description", description);
      formData.append("courses", selectedCourses);
      formData.append("photo", photo);
      formData.append("contactNumber", phone);
  
      const response = await fetch(`https://raitesting.me/tutors/create`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${user.stsTokenManager.accessToken}`
        },
      });
  
      if (!response.ok) {
        const result = await response.json()
        throw new Error(response.statusText)
      };
  
      setMessage('Postulación enviada');
      setRoute('/');
      setOpen(true);
    } catch ({ message }) {
      console.log(message);
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
    const regex = /^[A-Za-z][A-Za-z][A-Za-z]\d\d\d\d$/i;
   
    if (regex.test(course)) {
      const inList = selectedCourses.includes(
        course
      );

      if (!inList) {
        const updatedSelectedCourses = [ ...selectedCourses];
        updatedSelectedCourses.push(course);
        setSelectedCourses(updatedSelectedCourses);
      }
    }
    setCourse('');
  };

  const handleRemoveProfile = (selectedCourse) => {
    const newSelectedCourses = [ ...selectedCourses];

    const isSelectedCourse = (courseInList) => courseInList == selectedCourse
    
    const courseIndex = newSelectedCourses.findIndex(isSelectedCourse);
    if (courseIndex !== -1) {
      newSelectedCourses.splice(courseIndex, 1);
    }
    setSelectedCourses(newSelectedCourses);
  }


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
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
                  Postular como profesor particular
                </h2>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

                {/* Campo de telefono de contacto */}
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="mb-4">
                    <label htmlFor="contact-phone" className="sr-only">
                      Telefono de contacto
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
                      placeholder="Telefono de contacto"
                    />
                  </div>
                </div>

                {/* Campo de descripcion */}
                <div className="rounded-md shadow-sm -space-y-px">
                  <div className="mb-4 break-words break-all">
                    <label htmlFor="description" className="sr-only">
                      Descripción
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={description}
                      maxLength={1000}
                      onChange={(e) => setDescription(e.target.value)}
                      className="appearance-none rounded-none relative block w-full h-28 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Descripción"
                    />
                  </div>
                </div>

                {/* Campo de curso */}
                <div className="flex flex-row justify-between">
                  <label htmlFor="description" className="sr-only">
                    Curso
                  </label>
                  <input
                      id="description"
                      name="description"
                      type="text"
                      pattern="^[A-Za-z][A-Za-z][A-Za-z]\d\d\d\d$"
                      title="IIC2143"
                      value={course}
                      onChange={(e) => setCourse(e.target.value.toUpperCase())}
                      className="appearance-none rounded-none relative block w-3/4 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Sigla de curso que dicta (ej: IIC2413)"
                    />
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

                <div className="item-list">
                  {Object.entries(selectedCourses).map(
                    ([courseId, listCourse]) =>
                      (
                        <div className="item-container" key={courseId}>
                          <div className="item-name">
                            <div className="block w-full flex ring-1 ring-inset rounded-md border-1 px-3.5 py-1 my-1 text-gray-900 shadow-sm ring-gray-300">
                              <span>{listCourse}</span>
                              <div className="flex-grow"> </div>
                              <div
                                  className="flex-col items-center justify-between hover:bg-red-100"
                                  onClick={() => handleRemoveProfile(listCourse)}
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
