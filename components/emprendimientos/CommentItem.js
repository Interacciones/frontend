'use client'
import React, { useMemo, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import ProjectCommentForm from './ProjectCommentForm';
import ReportCommentModal from './ReportCommentModal';

function formatDate(inputDate) {
  try {
    const date = new Date(inputDate);
    if (isNaN(date)) return 'Fecha inválida';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return 'Error en fecha';
  }
}

export default function CommentItem({ comment, projectId, onActionDone }) {
  const { user } = UserAuth();
  const [showReply, setShowReply] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const publisher = useMemo(() => {
    const name = comment.user?.name || '';
    const lastName = comment.user?.lastName || '';
    return `${name} ${lastName}`.trim() || 'Usuario';
  }, [comment]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      {isReportOpen && (
        <ReportCommentModal onClose={() => setIsReportOpen(false)} commentId={comment.id} />
      )}

      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-bold text-lg">
            {publisher.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <p className="font-semibold text-gray-900">{publisher}</p>
            <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
          </div>
        </div>
        {user && (
          <button onClick={() => setIsReportOpen(true)} className="text-red-600 hover:text-red-700 text-sm">Reportar</button>
        )}
      </div>

      <div className="mt-3 text-gray-800 whitespace-pre-line">
        {comment.content}
      </div>

      {user && (
        <div className="mt-3">
          <button onClick={() => setShowReply((s) => !s)} className="text-indigo-700 hover:text-indigo-800 text-sm font-medium">
            {showReply ? 'Cancelar' : 'Responder'}
          </button>
        </div>
      )}

      {showReply && (
        <div className="mt-3">
          <ProjectCommentForm projectId={projectId} parentCommentId={comment.id} onSubmitted={() => { setShowReply(false); onActionDone && onActionDone(); }} />
        </div>
      )}

      {Array.isArray(comment.replies) && comment.replies.length > 0 && (
        <div className="mt-4 pl-4 border-l border-gray-200 space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} projectId={projectId} onActionDone={onActionDone} />
          ))}
        </div>
      )}
    </div>
  );
}


