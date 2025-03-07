'use client';
import React, { useState, useEffect } from "react";
import { UserAuth } from '../context/AuthContext';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function TeacherInfo({ user }) {
    const fullName = `${user.name} ${user.lastName}`;
    const { user: currentUser } = UserAuth();
    const [belongsToUser, setBelongsToUser] = useState(false);
    const [tutorId, setTutorId] = useState(null);
    const [tutorPhoto, setTutorPhoto] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) return;
            setBelongsToUser(currentUser.email === user.email);
        });
    }, [user.email]);

    useEffect(() => {
        const checkTutorProfile = async () => {
            if (!currentUser) return;
            try {
                const response = await fetch(`http://localhost:3000/tutors-self`, {
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

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-indigo-800 text-white rounded-3xl p-8 w-full max-w-md flex flex-col items-center'>
                <div className='w-44 h-44 border-4 border-yellow-400 rounded-full mx-auto overflow-hidden'>
                    <img className='w-44 h-44 object-cover overflow-hidden' src={tutorPhoto || 'https://interac-ciones.s3.amazonaws.com/default.jpg'} alt=""/>
                </div>
                <h1 className='text-3xl font-bold mt-4'>{fullName}</h1>
                <p className='text-yellow-400 mt-2'>{user.email}</p>
                <div className='mt-8'>
                    <button
                        className={`bg-yellow-400 text-indigo-800 font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition-all ${tutorId === null ? 'cursor-not-allowed' : ''}`}
                        onClick={handleButtonClick}
                    >
                        {tutorId ? 'Perfil de profesor' : 'Postular'}
                    </button>
                </div>
            </div>
        </div>
    );
}