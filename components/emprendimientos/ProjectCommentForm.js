'use client'
import React, { useEffect, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

export default function ProjectCommentForm({ projectId, parentCommentId = null, onSubmitted }) {
  const { user } = UserAuth();
  const [content, setContent] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const maxCharCount = 1000;

  useEffect(() => {
    if (user) {
      setIsVerified(user.emailVerified);
    }
  }, [user]);

  useEffect(() => {
    if (content.trim().length === 0) setIsDisabled(true);
    else setIsDisabled(false);
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    if (!isVerified) {
      setMessage('Debes verificar tu correo para comentar');
      setOpen(true);
      return;
    }
    try {
      const response = await fetch(`https://interserver.lat/projects/${projectId}/comments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.stsTokenManager.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: projectId,
          parentCommentId: parentCommentId,
          content: content.trim(),
        }),
      });
      if (response.ok) {
        setContent('');
        if (onSubmitted) onSubmitted();
      } else {
        setMessage('Error al enviar el comentario');
        setOpen(true);
      }
    } catch (error) {
      setMessage('Error en la solicitud');
      setOpen(true);
    }
  };

  const handleClose = () => setOpen(false);

  if (!user) {
    return null;
  }

  if (user && !isVerified) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 rounded-md">
        Verifica tu correo para poder comentar.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border border-gray-300 rounded-md p-2 text-gray-900"
          value={content}
          onChange={(e) => setContent(e.target.value.slice(0, maxCharCount))}
          placeholder={parentCommentId ? 'Escribe una respuesta...' : 'Escribe un comentario...'}
          rows={3}
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={isDisabled}
            className={`px-4 py-2 rounded-md text-white ${isDisabled ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
          >
            {parentCommentId ? 'Responder' : 'Comentar'}
          </button>
        </div>
      </form>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


