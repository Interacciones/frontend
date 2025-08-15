'use client'
import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

export default function ReportProjectModal({ onClose, projectId }) {
  const { user } = UserAuth();
  const [reason, setReason] = useState('');
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const maxCharCount = 1000;

  useEffect(() => {
    if (user) {
      setIsVerified(user.emailVerified);
    }
  }, [user]);

  const handleChange = (event) => {
    const value = event.target.value;
    if (value.length <= maxCharCount) {
      setReason(value);
      setCharCount(value.length);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://interaccionesuni.com/reports/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.stsTokenManager.accessToken}`
        },
        body: JSON.stringify({
          projectId: projectId,
          description: reason,
        }),
      });
      if (response.ok) {
        setMessage('Reporte enviado con éxito');
        setOpen(true);
      } else {
        setMessage('Error al enviar el reporte');
        setOpen(true);
      }
    } catch (error) {
      setMessage('Error en la solicitud');
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  if (user && !isVerified) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
        <div className="bg-white w-[95%] md:w-3/4 lg:w-[60%] rounded-md p-4 shadow-lg mx-auto text-center">
          <p className="text-black text-lg font-bold mb-2">
            Para poder reportar, necesitas verificar tu usuario
          </p>
          <div className="flex justify-center mt-4">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white w-[95%] md:w-3/4 lg:w-[60%] rounded-md p-4 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Reportar emprendimiento</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700 mb-1">Motivo</label>
          <textarea
            value={reason}
            onChange={handleChange}
            maxLength={maxCharCount}
            className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
            rows={5}
            placeholder="Describe el motivo del reporte"
          />
          <div className="text-right text-sm text-gray-500 mt-1">{charCount}/{maxCharCount}</div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-gray-200 text-gray-800">Cancelar</button>
            <button type="submit" className="px-4 py-2 rounded-md bg-red-600 text-white">Enviar reporte</button>
          </div>
        </form>
      </div>

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
    </div>
  );
}


