'use client';
import React, { useState, useEffect } from "react";
import { UserAuth } from '../context/AuthContext';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function TeacherInfo({ user }) {
    const fullName = user && user.name && user.lastName ? `${user.name} ${user.lastName}` : '';
    const { user: currentUser } = UserAuth();
    const [belongsToUser, setBelongsToUser] = useState(false);
    const [tutorId, setTutorId] = useState(null);
    const [tutorPhoto, setTutorPhoto] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) return;
            setBelongsToUser(currentUser.email === (user?.email || ''));
        });
    }, [user?.email]);

    useEffect(() => {
        const checkTutorProfile = async () => {
            if (!currentUser) return;
            try {
                const response = await fetch(`https://interaccionesuni.com/tutors-self`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${currentUser.stsTokenManager.accessToken}`
                    }
                });
                if (response.status === 200) {
                    const data = await response.json();
                    setTutorId(data.data.id);
                    setTutorPhoto(data.data.photo);
                } else if (response.status === 404) {
                    setTutorId(null);
                }
            } catch (error) {
                console.error("Error checking tutor profile:", error);
            }
        };
        checkTutorProfile();
    }, [currentUser]);

    const handleButtonClick = () => {
        if (tutorId) {
            window.location.href = `/profesores/${tutorId}`;
        } else {
            window.location.href = '/postular';
        }
    };

    if (!user) {
        return (
            <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <div className="p-8 bg-white rounded-xl shadow-md">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100">
                            <svg className="h-10 w-10 text-indigo-600 animate-pulse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="mt-4 text-xl font-medium text-gray-900">Cargando información de usuario...</h2>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Gradient Background Header */}
                    <div className="relative h-48 bg-indigo-800">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 to-indigo-700 opacity-90"></div>
                        <div className="absolute inset-0 bg-[url('https://interac-ciones.s3.us-east-1.amazonaws.com/university_example.jpg')] bg-cover bg-center opacity-20"></div>
                    </div>
                    
                    {/* Profile Content */}
                    <div className="relative px-6 pb-8 -mt-20">
                        {/* Profile Photo */}
                        <div className="flex justify-center">
                            <div className="w-32 h-32 border-4 border-white rounded-full overflow-hidden shadow-lg bg-white">
                                <img 
                                    className="w-full h-full object-cover" 
                                    src={tutorPhoto || 'https://interac-ciones.s3.amazonaws.com/default.jpg'} 
                                    alt={fullName || 'Usuario'}
                                />
                            </div>
                        </div>
                        
                        {/* Profile Info */}
                        <div className="mt-6 text-center">
                            <h1 className="text-3xl font-bold text-gray-900">{fullName}</h1>
                            <p className="mt-1 text-indigo-600">{user.email}</p>
                            
                            {/* Card with status and actions */}
                            <div className="mt-8 bg-indigo-50 rounded-xl p-6">
                                <div className="text-center">
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        {tutorId ? 'Ya eres profesor particular' : 'Aún no eres profesor particular'}
                                    </h2>
                                    <p className="mt-2 text-gray-600">
                                        {tutorId 
                                            ? 'Tienes un perfil de profesor activo. Los estudiantes pueden contactarte para clases particulares.' 
                                            : 'Comparte tus conocimientos y ayuda a otros estudiantes mientras generas ingresos extras.'}
                                    </p>
                                    
                                    <div className="mt-6">
                                        <button
                                            onClick={handleButtonClick}
                                            className={`px-8 py-3 font-medium rounded-full shadow-md transition-all ${
                                                tutorId 
                                                ? 'bg-indigo-800 text-white hover:bg-indigo-700' 
                                                : 'bg-gradient-to-r from-indigo-800 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-600'
                                            }`}
                                        >
                                            {tutorId ? 'Ver mi perfil de profesor' : 'Convertirme en profesor particular'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}