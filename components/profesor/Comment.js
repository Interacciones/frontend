"use client";
import React, { useState, useEffect, useRef } from "react";
import { UserAuth } from '../context/AuthContext';
import ReportModal from './ReportModal';

function Star({ filled }) {
    return (
        <svg
            className={`h-4 w-4 ${filled ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
    );
}

export default function Comment({ comment }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const menuRef = useRef(null);
    const { user } = UserAuth();
    const publisher = `${comment.name || ''} ${comment.lastName || ''}`;

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
        <div className="bg-white p-6 rounded-lg shadow-sm mb-4 transition-all duration-300 hover:shadow-md">
            {isReportModalOpen && (
                <ReportModal
                    onClose={() => setIsReportModalOpen(false)}
                    commentId={comment.id}
                    commentCreator={comment.UserId}
                />
            )}
            
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                    {/* Avatar (representación visual) */}
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-bold text-lg">
                        {publisher.charAt(0).toUpperCase()}
                    </div>
                    
                    <div className="ml-3">
                        <p className="font-semibold text-gray-900">{publisher}</p>
                        <div className="flex items-center mt-1">
                            <div className="flex mr-2">
                                {renderStars(comment.rating)}
                            </div>
                            <p className="text-xs text-gray-500">
                                {formatDate(comment.createdAt)}
                            </p>
                        </div>
                    </div>
                </div>
                
                {user && (
                    <div className="relative" ref={menuRef}>
                        <button 
                            onClick={toggleMenu}
                            className="text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                            </svg>
                        </button>
                        
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10 transform transition-all duration-200 ease-in-out">
                                <button 
                                    onClick={handleReport}
                                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                >
                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                    </svg>
                                    Reportar
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            
            <div className="mt-3 text-gray-700 leading-relaxed">
                <p>{comment.content}</p>
            </div>
        </div>
    );
}
