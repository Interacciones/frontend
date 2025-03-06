'use client';
import React, { useState, useEffect } from "react";
import { UserAuth } from '../context/AuthContext';
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export default function TeacherInfo({ user }) {
    console.log(user);
    const fullName = `${user.name} ${user.lastName}`;
    const { user: currentUser } = UserAuth();
    const [belongsToUser, setBelongsToUser] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) return;
            setBelongsToUser(currentUser.email === user.email);
        });
    }, [user.email]);

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <div className='bg-indigo-800 text-white rounded-3xl p-8 w-full max-w-md flex flex-col items-center'>
                <div className='w-44 h-44 border-4 border-yellow-400 rounded-full mx-auto overflow-hidden'>
                    <img className='w-44 h-44 object-cover overflow-hidden' src={user.photo || 'https://interac-ciones.s3.amazonaws.com/default.jpg'} alt=""/>
                </div>
                <h1 className='text-3xl font-bold mt-4'>{fullName}</h1>
                <p className='text-yellow-400 mt-2'>{user.email}</p>
                {/* {belongsToUser && (
                    <div className="top-0 right-0 p-5">
                        <Link href={'/actualizar'}>
                            <svg className="feather feather-edit text-indigo-500 hover:text-yellow-400 transition-all" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                        </Link>
                    </div>
                )} */}
                {/* Hacer un flex que se divida en 2 para poder tener 2 botones, uno que sea para poder visitar el propio perfil de tutor del usuario y otro
                que sea para poner un boton no clickeable, que cuando uno haga hover, aparezca la palabra "proximamente" */}
                <div className='mt-8'>
                    <Link href='/perfil'>
                        <button className='bg-yellow-400 text-indigo-800 font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition-all'>Perfil de profesor</button>
                    </Link>
                </div>

            </div>
        </div>
    );
}