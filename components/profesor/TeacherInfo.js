'use client';
import React, { useState, useEffect } from "react";
import { UserAuth } from '../context/AuthContext';
import ReportTeacher from "./ReportTeacher";
import Link from "next/link";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

function renderDescription(description) {
    const lines = description.split('\n');
    return lines.map((line, index) => <p className='text-justify' key={index}>{line}<br/></p>);
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
        <div className='bg-indigo-800 text-white rounded-3xl m-6 p-5 w-full sm:m-9 sm:p-7 lg:m-12 lg:p-8 flex flex-wrap justify-between relative'>
            {isReportTeacherOpen && (
                <ReportTeacher
                    onClose={() => setIsReportTeacherOpen(false)}
                    teacher={teacher}
                />
            )}
            {belongsToUser && (
                <div className="absolute top-0 left-0 p-5 place-items-center">
                    <Link href={'/actualizar'}>
                        <svg className="feather feather-edit text-indigo-500 hover:text-yellow-400 transition-all" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                    </Link>
                </div>
            )}
            {user && !belongsToUser && (
                <div className="absolute top-0 right-0 p-5 place-items-center">
                    <button onClick={() => setIsReportTeacherOpen(true)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            className="text-indigo-500 h-8 w-8 hover:text-red-500 transition-all" // Ajustar el tamaño
                        >
                            <circle cx="10" cy="10" r="8" />
                            <line x1="10" y1="5.5" x2="10" y2="11" />
                            <circle cx="10" y="13.5" r=".2" />
                        </svg>
                    </button>
                </div>
            )}
            <div className='w-full m-0 p-0 flex flex-wrap sm:h-fit lg:w-[25%]'>
                <div className="w-full h-fit sm:w-[55%] lg:w-full text-center">
                    <div className='w-44 h-44 border-4 border-yellow-400 rounded-full mx-auto overflow-hidden'>
                        <img className='w-44 h-44 object-cover overflow-hidden' src={teacher.photo} alt=""/>
                    </div>
                    <h1 className='text-3xl font-bold lg:text-2xl xl:text-3xl mt-4'>{fullName}</h1>
                </div>
                <div className='flex mt-5 drop-shadow-md flex-wrap px-2 h-fit justify-between w-full mx-auto sm:justify-center sm:my-7 sm:w-[30%] lg:w-full text-center'>
                    <p className='text-yellow-400 my-1 lg:w-full'>{teacher.email}</p>
                    <p className="text-yellow-400 my-1 lg:w-full">{teacher.contactNumber}</p>
                </div>
            </div>
            <div className='w-full mt-2 sm:w-full sm:min-h-[65%] lg:w-[70%] lg:my-2 lg:mr-4'>
                <div className='flex flex-wrap text-center justify-center sm:justify-start'>
                    <p className='text-lg font-bold w-full text-left mb-1'>Cursos:</p>
                    {teacher.courses.map((ramo) => {
                        return <p key={ramo} className='bg-yellow-400 text-base my-0.5 w-fit mr-1 px-1 rounded-md text-black font-bold'>{ramo}</p>
                    })}
                </div>
                <div className='flex flex-wrap text-center justify-center sm:justify-start mt-1'>
                    <p className='text-lg font-bold w-full text-left mb-1'>Áreas:</p>
                    {teacher.subjects.map((subject) => {
                        return <p key={subject} className='bg-yellow-400 text-base my-0.5 w-fit mr-1 px-1 rounded-md text-black font-bold'>{subject}</p>
                    })}
                </div>
                <div className='my-2'>
                <p className='text-lg font-bold w-full text-left mb-1'>Descripción:</p>
                    {renderDescription(teacher.description)}
                </div>
                <div className='my-2'>
                <p className='text-lg font-bold w-full text-left mb-1'>Precios:</p>
                    {renderDescription(teacher.priceDescription)}
                </div>
            </div>
        </div>
    );
}