'use client';
import React, { useState, useEffect } from "react";
import { UserAuth } from '../context/AuthContext';
import ReportTeacher from "./ReportTeacher";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

function renderDescription(description) {
    const lines = description.split('\n');
    return lines.map((line, index) => <p className='text-gray-100 leading-relaxed' key={index}>{line}<br/></p>);
}

export default function TeacherInfo({ teacher }) {
    const fullName = `${teacher.name} ${teacher.lastName}`;
    const [isReportTeacherOpen, setIsReportTeacherOpen] = useState(false);
    const { user } = UserAuth();
    const [belongsToUser, setBelongsToUser] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) return;
            setBelongsToUser(currentUser.email === teacher.email);
        });
    }, [teacher.email]);

    return (
        <div className='relative w-full max-w-7xl mx-auto rounded-xl shadow-xl overflow-hidden transform transition-all'>
            {/* Fondo con degradado y blur */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-800 to-indigo-900 z-0"></div>
            
            {/* Imagen de fondo con blur */}
            <div className="absolute inset-0 opacity-10 z-0">
                <div className="w-full h-full bg-[url('https://interac-ciones.s3.us-east-1.amazonaws.com/teaching_example.jpg')] bg-cover bg-center bg-no-repeat blur-sm"></div>
            </div>
            
            {/* Contenido */}
            <div className='relative z-10 p-6 md:p-8 lg:p-10 text-white'>
                {isReportTeacherOpen && (
                    <ReportTeacher
                        onClose={() => setIsReportTeacherOpen(false)}
                        teacher={teacher}
                    />
                )}
                
                {/* Botones de acción */}
                <div className="flex justify-between mb-4">
                    {belongsToUser && (
                        <Link href='/actualizar' className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-indigo-700 bg-white hover:bg-indigo-50 shadow-lg transition-all">
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                            Editar perfil
                        </Link>
                    )}
                    
                    {user && !belongsToUser && (
                        <button 
                            onClick={() => setIsReportTeacherOpen(true)}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-red-700 bg-white hover:bg-red-50 shadow-lg transition-all ml-auto"
                        >
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                            Reportar
                        </button>
                    )}
                </div>
                
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
                    {/* Columna izquierda - Información personal */}
                    <div className='lg:col-span-1'>
                        <div className="flex flex-col items-center">
                            <div className='w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4'>
                                <img 
                                    src={teacher.photo || "https://via.placeholder.com/150"} 
                                    alt={fullName}
                                    className='w-full h-full object-cover'
                                />
                            </div>
                            
                            <h1 className='text-2xl md:text-3xl font-bold text-center mb-2'>{fullName}</h1>
                            
                            <div className='text-center space-y-1 mt-2'>
                                <p className='text-yellow-400 font-medium'>{teacher.email}</p>
                                <p className='text-yellow-400 font-medium'>{teacher.contactNumber}</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Columna derecha - Detalles académicos */}
                    <div className='lg:col-span-3'>
                        {/* Sección de cursos */}
                        <div className='mb-6'>
                            <h2 className='text-xl font-bold mb-3 flex items-center'>
                                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                                </svg>
                                Cursos
                            </h2>
                            <div className='flex flex-wrap gap-2'>
                                {teacher.courses.map((ramo) => (
                                    <Link key={ramo} href={`/profesores?course=${ramo}`}>
                                        <span className='inline-block px-3 py-1 rounded-full bg-yellow-400 text-indigo-900 text-sm font-medium hover:bg-yellow-300 transition-colors'>
                                            {ramo}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        
                        {/* Sección de áreas */}
                        <div className='mb-6'>
                            <h2 className='text-xl font-bold mb-3 flex items-center'>
                                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                                </svg>
                                Áreas de especialización
                            </h2>
                            <div className='flex flex-wrap gap-2'>
                                {teacher.subjects.map((subject) => (
                                    <Link key={subject.id} href={`/profesores?idSubject=${subject.id}`}>
                                        <span className='inline-block px-3 py-1 rounded-full bg-yellow-400 text-indigo-900 text-sm font-medium hover:bg-yellow-300 transition-colors'>
                                            {subject.subject}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        
                        {/* Sección de descripción */}
                        <div className='mb-6'>
                            <h2 className='text-xl font-bold mb-3 flex items-center'>
                                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                Descripción
                            </h2>
                            <div className='bg-indigo-700 bg-opacity-50 rounded-lg p-4'>
                                {renderDescription(teacher.description)}
                            </div>
                        </div>
                        
                        {/* Sección de precios */}
                        <div>
                            <h2 className='text-xl font-bold mb-3 flex items-center'>
                                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                Precios
                            </h2>
                            <div className='bg-indigo-700 bg-opacity-50 rounded-lg p-4'>
                                {renderDescription(teacher.priceDescription)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}