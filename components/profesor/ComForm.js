"use client";
import React, {  useState, useEffect } from "react";
import { UserAuth } from '../context/AuthContext';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

function Star({ filled, onClick }) {
    return (
        <svg
            className={`h-6 w-6 text-yellow-500 ${filled ? 'fill-current' : 'stroke-current'} cursor-pointer`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            onClick={onClick}
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


export default function CommentForm({tutorId, email}) {
    const { user } = UserAuth();
    const [commentText, setCommentText] = useState("");
    const [rating, setRating] = useState(0);
    const [isDisabled, setIsDisabled] = useState(true);
    const [belongsToUser, setBelongsToUser] = useState(false);
    
    useEffect(() => {
      onAuthStateChanged(auth, (currentUser) => {
        if (!currentUser) return;
        setBelongsToUser(currentUser.email === email);
      });
    }, [])

    const handleStarClick = (starIndex) => {
        if (starIndex === rating) {
            setRating(0); // Si se hace clic en la misma estrella, resetear la calificación
        } else {
            setRating(starIndex); // Establecer la calificación al índice de la estrella clicada
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
            const response = await fetch(`${"http://localhost:3000"}/reviews/create`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${user.stsTokenManager.accessToken}`,
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({
                    "content": commentText,
                    "rating": rating,
                    "TutorId": tutorId,
                }),
            });
            if (response.ok) {
                if (response.status === 201) {
                    setCommentText("");
                    setRating(0);
                    setIsDisabled(true);
                }
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

    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <Star
                key={i}
                filled={i <= rating} // Rellenar estrellas según la calificación
                onClick={() => handleStarClick(i)}
            />
        );
    }


    if (user && !belongsToUser) {
        return (
        <div className="px-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <div className="ml-2">
                        <p className="text-lg font-semibold text-gray-800">
                        Deja un comentario:
                        </p>
                        <div className="flex mt-2">
                            {stars}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <textarea className="w-full h-24 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" placeholder="Escribe tu comentario..." value={commentText} onChange={handleInputChange}></textarea>
            </div>
            <div className="mt-3">
                <button className="px-3.5 py-2.5 text-sm font-semibold rounded-lg justify-center bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 transition-all disabled:bg-yellow-600 disabled:hover:bg-yellow-600 disabled:text-gray-300" type="submit" disabled={isDisabled} onClick={handleSubmit}>
                    Enviar
                </button>
            </div>
        </div>
        )
    } else if (belongsToUser) {
        return (<></>)
    } else {
        return (
            <div className="px-4">
                <p className="text-lg font-semibold text-gray-800">
                    Inicia sesión para dejar un comentario
                </p>
            </div>
        )
    }
}
