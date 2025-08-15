'use client'
import React, { useEffect, useState, useCallback } from 'react';
import { UserAuth } from '../context/AuthContext';
import ProjectCommentForm from './ProjectCommentForm';
import CommentItem from './CommentItem';

export default function CommentsSection({ projectId }) {
  const { user } = UserAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchComments = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`https://interaccionesuni.com/projects/${projectId}/comments?cacheBuster=${new Date().getTime()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
        }
      });
      const data = await res.json();
      if (res.ok) {
        setComments(Array.isArray(data.data) ? data.data : []);
      } else {
        setError(data.message || 'Error al cargar comentarios');
      }
    } catch (e) {
      setError('Error de red al cargar comentarios');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (!projectId) return;
    fetchComments();
  }, [projectId, fetchComments]);

  return (
    <div className="w-full mt-6">
      <h2 className="text-2xl font-bold text-indigo-800 mb-4">Comentarios</h2>

      {user && (
        <div className="mb-6">
          <ProjectCommentForm projectId={projectId} onSubmitted={fetchComments} />
        </div>
      )}

      {loading && (
        <p className="text-gray-700">Cargando comentarios...</p>
      )}
      {error && !loading && (
        <p className="text-red-600">{error}</p>
      )}
      {!loading && !error && comments.length === 0 && (
        <p className="text-gray-700">Aún no hay comentarios. ¡Sé el primero en comentar!</p>
      )}

      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} projectId={projectId} onActionDone={fetchComments} />)
        )}
      </div>
    </div>
  );
}


