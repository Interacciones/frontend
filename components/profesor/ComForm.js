"use client";
import React, { useState, useEffect } from "react";
import { UserAuth } from '../context/AuthContext';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

function Star({ filled, onClick }) {
    return (
        <svg
            className={`h-7 w-7 ${filled ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current hover:text-gray-400'} cursor-pointer transition duration-150`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            onClick={onClick}
        >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
    );
}

export default function CommentForm({ tutorId, email }) {
    const { user } = UserAuth();
    const [commentText, setCommentText] = useState("");
    const [rating, setRating] = useState(0);
    const [isDisabled, setIsDisabled] = useState(true);
    const [belongsToUser, setBelongsToUser] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) return;
            setBelongsToUser(currentUser.email === email);
            setIsVerified(currentUser.emailVerified);
        });
    }, [email]);

    const handleStarClick = (starIndex) => {
        if (starIndex === rating) {
            setRating(0);
        } else {
            setRating(starIndex);
        }
        if (commentText.length === 0 || starIndex === rating) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (commentText.length === 0) {
            console.error("El comentario no puede estar vacío");
            return;
        }
        if (rating === 0) {
            console.error("La calificación no puede ser 0");
            return;
        }

        try {
            const response = await fetch(`${"https://interserver.lat"}/reviews`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${user.stsTokenManager.accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "content": commentText,
                    "rating": rating,
                    "tutorId": tutorId,
                }),
            });
            if (response.ok) {
                if (response.status === 200) {
                    setCommentText("");
                    setRating(0);
                    setIsDisabled(true);
                    setMessage('La reseña se ha enviado con éxito');
                    setOpen(true);
                }
            } else if (response.status === 429) {
                setMessage('Solo se puede comentar una vez para un tutor cada 2 meses');
                setOpen(true);
            } else {
                console.error("Error al enviar el comentario");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    const handleInputChange = (event) => {
        setCommentText(event.target.value);
        if (event.target.value.length === 0 || rating === 0) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
        window.location.reload();
    };

    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <Star
                key={i}
                filled={i <= rating}
                onClick={() => handleStarClick(i)}
            />
        );
    }

    if (user && !belongsToUser && isVerified) {
        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cerrar</Button>
                    </DialogActions>
                </Dialog>
                
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <svg className="h-5 w-5 text-indigo-800 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                        </svg>
                        Escribe una valoración
                    </h2>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            ¿Cómo calificarías a este profesor?
                        </label>
                        <div className="flex items-center space-x-1">
                            {stars}
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                            Tu opinión
                        </label>
                        <textarea
                            id="comment"
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-gray-900"
                            placeholder="Comparte tu experiencia con este profesor..."
                            value={commentText}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isDisabled}
                        className={`inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'transition-colors duration-200'}`}
                    >
                        Enviar valoración
                    </button>
                </div>
            </div>
        );
    } else if (user && !isVerified) {
        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 p-6">
                <div className="flex items-center text-amber-600">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    <p className="text-lg font-semibold">
                        Verifica tu correo electrónico para dejar un comentario
                    </p>
                </div>
            </div>
        );
    } else if (belongsToUser) {
        return null;
    } else {
        return (
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 p-6">
                <div className="flex items-center text-indigo-800">
                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                    </svg>
                    <p className="text-lg font-semibold">
                        Inicia sesión para dejar un comentario
                    </p>
                </div>
            </div>
        );
    }
}
