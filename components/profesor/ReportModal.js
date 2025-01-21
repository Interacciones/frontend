import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';


const ReportModal = ({ onClose, commentId, commentCreator }) => {
    const { user } = UserAuth();


    const handleSubmit = async (event) => {
        onClose();
        try {
            const response = await fetch(`${"https://raitesting.me"}/reviewReports/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user.stsTokenManager.accessToken}`
                },
                body: JSON.stringify({
                    "reportedUserId": commentCreator,
                    "reviewId": commentId,
                }),
            });
            if (response.ok) {
                // Realizar acciones
            } else {
                console.error("Error al enviar el comentario");
            }

        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
        onClose();
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white w-[95%] md:w-3/4 lg:w-[60%] rounded-md p-4 shadow-lg mx-auto text-center">
        <h2 className="text-xl font-semibold mb-4 mx-auto">¿Seguro que quieres reportar esta reseña?</h2>
        <div className="flex justify-center mt-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md mr-2"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={handleSubmit}
          >
            Reportar
          </button>
        </div>
      </div>
    </div>
  );
};


export default ReportModal;