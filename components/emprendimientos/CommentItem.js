'use client'
import React, { useMemo, useRef, useState, useEffect } from 'react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const publisher = useMemo(() => {
    // API returns User or user
    const author = comment.User || comment.user || {};
    const name = author.name || '';
    const lastName = author.lastName || '';
    return `${name} ${lastName}`.trim() || 'Usuario';
  }, [comment]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

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
          <div className="relative" ref={menuRef}>
            <button 
              onClick={toggleMenu}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
              aria-label="Abrir menú"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                <button 
                  onClick={() => { setIsReportOpen(true); setIsMenuOpen(false); }}
                  className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                  Reportar
                </button>
                <button 
                  onClick={() => { setShowReply(true); setIsMenuOpen(false); }}
                  className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Responder
                </button>
              </div>
            )}
          </div>
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


