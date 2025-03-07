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
  const [subject, setSubject] = useState('');
  const [subjects, setSubjects] = useState([]);
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
    const fetchProfile = async (currentUser) => {
      try {
        console.log(currentUser)
        const response = await fetch(`http://localhost:3000/tutors-self`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${currentUser.accessToken}`
          }, 
        });
        const result = await response.json();
        setPhone(result.data.contactNumber);
        setDescription(result.data.description);
        setPrice(result.data.priceDescription);
        setSelectedCourses(result.data.courses || []);
        setSelectedSubjects(result.data.subjects || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchSubjects = async () => {
      try {
        const response = await fetch('http://localhost:3000/subjects');
        const data = await response.json();
        if (response.ok) {
          setSubjects(data.data.split(', '));
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
        setMessage('Debes iniciar sesión para postular');
        setRoute('/login');
      } else if (!currentUser.emailVerified) {
        setOpen(true);
        setMessage('Debes verificar tu correo para postular');
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
  
      const response = await fetch(`http://localhost:3000/own-tutor`, {
        method: 'PATCH',
        body: formData,
        headers: {
          'Authorization': `Bearer ${user.stsTokenManager.accessToken}`
        }
      });
  
      if (!response.ok) throw Error(message);
  
      setMessage('Perfil actualizado');
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
  }

  const handleRemoveSubject = (subject) => {
    const newSelectedSubjects = selectedSubjects.filter(
      (item) => item !== subject
    );
    setSelectedSubjects(newSelectedSubjects);
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
                Actualizar perfil de tutor
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
                    onChange={(e) => setDescription(e.target.value)}
                    className="appearance-none rounded-none relative block w-full h-28 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Descripción"
                  />
                </div>
              </div>

              {/* Campo de precio */}
              <div className="rounded-md shadow-sm -space-y-px">
                <div className="mb-4 break-words break-all">
                  <label htmlFor="price" className="sr-only">
                    Descripción precio
                  </label>
                  <textarea
                    id="price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="appearance-none rounded-none relative block w-full h-28 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Descripción del precio"
                  />
                </div>
              </div>

              {/* Campo de curso */}
              <div className="flex flex-row justify-between">
                <label htmlFor="course" className="sr-only">
                  Curso
                </label>
                <input
                    id="course"
                    name="course"
                    type="text"
                    pattern="^[A-Za-z][A-Za-z][A-Za-z]\d\d\d\d$"
                    title="IIC2143"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="appearance-none rounded-none relative block w-3/4 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Nombre curso (ej. Calculo I)"
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

              <p className="mt-1 text-sm text-gray-800" id="file_input_help">Cursos anteriores</p>
              <hr className="my-2 border-gray-300" />

              <div className="item-list">
                {selectedCourses.map(
                  (course, index) =>
                    (
                      <div className="item-container" key={index}>
                        <div className="item-name">
                          <div className="w-full flex ring-1 ring-inset rounded-md border-1 px-3.5 py-1 my-1 text-gray-900 shadow-sm ring-gray-300">
                            <span>{course}</span>
                            <div className="flex-grow"> </div>
                            <div
                                className="flex-col items-center justify-between hover:bg-red-100"
                                onClick={() => handleRemoveCourse(course)}
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

              {/* Campo de subject */}
              <div className="flex flex-row justify-between">
                <label htmlFor="subject" className="sr-only">
                  Área
                </label>
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
                    onClick={handleSubjectChange}
                    className="group relative justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Agregar
                  </button>
                </div>
              </div>

              <p className="mt-1 text-sm text-gray-800" id="file_input_help">Áreas anteriores</p>
              <hr className="my-2 border-gray-300" />

              <div className="item-list">
                {selectedSubjects.map(
                  (subject, index) =>
                    (
                      <div className="item-container" key={index}>
                        <div className="item-name">
                          <div className="w-full flex ring-1 ring-inset rounded-md border-1 px-3.5 py-1 my-1 text-gray-900 shadow-sm ring-gray-300">
                            <span>{subject}</span>
                            <div className="flex-grow"> </div>
                            <div
                                className="flex-col items-center justify-between hover:bg-red-100"
                                onClick={() => handleRemoveSubject(subject)}
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
                  Actualizar
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

export default Actualizar;
