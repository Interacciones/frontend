import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

const ReportModal = ({ onClose, commentId, commentCreator }) => {
    const { user } = UserAuth();
    const [reason, setReason] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (event) => {
        setReason(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${"http://localhost:3000"}/reports/review`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user.stsTokenManager.accessToken}`
                },
                body: JSON.stringify({
                    "reviewId": commentId,
                    "description": reason,
                }),
            });
            if (response.ok) {
                if (response.status === 201) {
                    setMessage('Reporte enviado con éxito');
                    setOpen(true);
                }
            } else {
                console.error("Error al enviar el reporte");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };

    const handleClose = () => {
        setOpen(false);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
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
            <div className="bg-white w-[95%] md:w-3/4 lg:w-[60%] rounded-md p-4 shadow-lg mx-auto text-center">
                <p className="text-black text-lg font-bold mb-2">
                    ¿Por qué estás reportando esta reseña?
                </p>
                <textarea
                    className="w-full h-24 border rounded-md p-2 text-black"
                    placeholder="Escribe la razón del reporte..."
                    value={reason}
                    onChange={handleChange}
                />
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