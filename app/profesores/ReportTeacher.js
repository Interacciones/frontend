import React, { useState } from 'react';
import { UserAuth } from '../components/context/AuthContext';


function ReportTeacher({ onClose, teacher }) {
    const [reason, setReason] = useState('');
    const { user } = UserAuth();
  
    const handleChange = (event) => {
        setReason(event.target.value);
    };
  
    const handleSubmit = async (event) => {
        event.preventDefault();
        onClose();
        try {
            const response = await fetch(`${"http://localhost:3000"}/reports/create/${teacher.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user.stsTokenManager.accessToken}`
                },
                body: JSON.stringify({
                    content: reason,
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
    };
  
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white w-[95%] md:w-3/4 lg:w-[60%] rounded-md p-4 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Reportar Profesor</h2>
                <p className="text-black text-lg font-bold mb-2">
                    ¿Por qué estás reportando a este profesor?
                </p>
                <textarea
                    className="w-full h-24 border rounded-md p-2 text-black"
                    placeholder="Escribe la razón del reporte..."
                    value={reason}
                    onChange={handleChange}
                />
                <div className="flex justify-end mt-4">
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
                        Enviar reporte
                    </button>
                </div>
            </div>
        </div>
    );
}
  
  export default ReportTeacher;