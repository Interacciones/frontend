"use client";
import React, { useState, useEffect, useRef } from "react";
import { UserAuth } from '../context/AuthContext';
import ReportModal from './ReportModal';


function Star({ filled }) {
    return (
        <svg
            className={`h-4 w-4 text-yellow-500 ${filled ? 'fill-current' : 'stroke-current'}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M10 1l1.912 4.67 4.864.353-3.575 3.107.993 4.839-4.194-2.48-4.194 2.48.993-4.839-3.575-3.107 4.864-.353L10 1z"
            />
        </svg>
    );
}

export default function Comment({ comment }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const menuRef = useRef(null);
    const { user } = UserAuth();
    const publisher = `${comment.User.name} ${comment.User.lastName}`

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(<Star key={i} filled={i <= rating} />);
        }
        return stars;
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleReport = () => {
        // Lógica para reportar el comentario
        setIsReportModalOpen(true);
    };

    const formatDate = (inputDate) => {
        try {
            const date = new Date(inputDate);
            if (isNaN(date)) {
                return 'Fecha inválida';
            }
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        } catch (error) {
            console.error('Error al formatear la fecha:', error);
            return 'Error en fecha';
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
          }
        };
      
        const handleEscapeKey = (event) => {
          if (event.key === 'Escape') {
            setIsMenuOpen(false);
          }
        };
      
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);
      
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
          document.removeEventListener('keydown', handleEscapeKey);
        };
      }, [menuRef]);


    return (
        <div className="border-t-2 px-4 py-3 sm:p-4">
            {isReportModalOpen && (
                <ReportModal
                    onClose={() => setIsReportModalOpen(false) }
                    commentId={comment.id}
                    commentCreator={comment.UserId}
                />
            )}
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="ml-2">
                        <p className="text-lg font-semibold text-gray-800">
                        {publisher}
                        </p>
                        <div className="flex items-center">
                            {renderStars(comment.rating)}
                        </div>   
                        <p className="text-xs font-medium text-gray-400">
                        {formatDate(comment.createdAt)}
                        </p>
                    </div>
                </div>
                {user && (
                    <div className="relative inline-block text-left" ref={menuRef}>
                    <button onClick={toggleMenu} type="button" className="focus:outline-none">
                        <svg className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                        </svg>
                    </button>
                    {isMenuOpen && (
                        <div className="origin-top-right absolute right-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none animate-slideIn transition duration-300">
                            <div className="py-1">
                                {/*
                                <button onClick={handleReport} className="block w-full text-left px-4 py-1 text-sm text-black hover:bg-gray-100">
                                    Borrar
                                </button>
                                */}
                                <button onClick={handleReport} className="block w-full text-left px-4 py-1 text-sm font-semibold text-red-500 hover:bg-gray-100">
                                    Reportar
                                </button>
                            </div>
                        </div>
                    )}
                    </div>
                )}
            </div>
            <div className="mt-4">
                <p className="text-gray-600 text-sm">{comment.content}</p>
            </div>
        </div>
    );
}
