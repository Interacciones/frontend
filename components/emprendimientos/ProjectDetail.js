'use client';
import React, { useState, useEffect } from "react";
import { UserAuth } from '../context/AuthContext';
import Link from "next/link";
import CommentsSection from './CommentsSection';
import ReportProjectModal from './ReportProjectModal';

function ArrowLeft() {
  return (
    <svg 
      className="h-5 w-5 text-white" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path 
        fillRule="evenodd" 
        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" 
        clipRule="evenodd" 
      />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg 
      className="h-5 w-5 text-white" 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 20 20" 
      fill="currentColor"
    >
      <path 
        fillRule="evenodd" 
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
        clipRule="evenodd" 
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg 
      className="h-6 w-6" 
      fill="currentColor" 
      viewBox="0 0 24 24">
      <path 
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function renderDescription(description) {
    const lines = description.split('\n');
    return lines.map((line, index) => <p className='text-justify' key={index}>{line}<br/></p>);
}

function ProjectDetail({ id, project }) {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const { user } = UserAuth();
    const [isReportOpen, setIsReportOpen] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        const checkOwnership = async () => {
            try {
                if (!user) return;
                const res = await fetch('http://localhost:3000/projects-self', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache',
                        'Pragma': 'no-cache',
                        'Authorization': `Bearer ${user.stsTokenManager.accessToken}`
                    }
                });
                if (!res.ok) return;
                const data = await res.json();
                const myProjects = Array.isArray(data?.data) ? data.data : [];
                const ownsThis = myProjects.some((p) => String(p.id) === String(id));
                setIsOwner(ownsThis);
            } catch (e) {
                setIsOwner(false);
            }
        };
        checkOwnership();
    }, [user, id]);

    if (!project) {
        return (
            <div className='min-h-screen flex flex-wrap text-black bg-gray-100 justify-start'>
                <h2 className='mx-auto my-auto text-lg sm:text-2xl md:text-4xl xl:text-5xl'>
                    <span className='font-bold'>¡Ups!</span>
                    No se encontró ningún emprendimiento con ese ID.
                    <br/>
                    Inténtalo de nuevo más tarde.
                </h2>
            </div>
        );
    }

    const hasMultiplePhotos = project.photos && project.photos.length > 1;

    const nextPhoto = () => {
        if (hasMultiplePhotos) {
            setCurrentPhotoIndex((prev) => 
                prev === project.photos.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevPhoto = () => {
        if (hasMultiplePhotos) {
            setCurrentPhotoIndex((prev) => 
                prev === 0 ? project.photos.length - 1 : prev - 1
            );
        }
    };

    return (
        <div className='min-h-screen flex flex-wrap text-black bg-gray-100 justify-start'>
            {isReportOpen && !isOwner && (
                <ReportProjectModal onClose={() => setIsReportOpen(false)} projectId={project.id} />
            )}
            <div className='bg-indigo-800 text-white rounded-3xl m-6 p-5 w-full sm:m-9 sm:p-7 lg:m-12 lg:p-8 flex flex-wrap justify-between'>
                <div className='w-full m-0 p-0 flex flex-wrap sm:h-fit lg:w-[30%]'>
                    <div className="w-full h-fit text-center">
                        <div className='relative w-full h-64 mx-auto overflow-hidden rounded-lg mb-4'>
                            {project.photos && project.photos.length > 0 ? (
                                <>
                                    <img 
                                        className='w-full h-full object-cover' 
                                        src={(project.photos[currentPhotoIndex]?.url) || project.photos[currentPhotoIndex]} 
                                        alt={project.name}
                                    />
                                    {/* Navigation arrows for photos */}
                                    {hasMultiplePhotos && (
                                        <>
                                            <button 
                                                onClick={prevPhoto}
                                                className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-1'
                                            >
                                                <ArrowLeft />
                                            </button>
                                            <button 
                                                onClick={nextPhoto}
                                                className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-1'
                                            >
                                                <ArrowRight />
                                            </button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className='w-full h-full bg-gray-300 rounded-lg flex items-center justify-center'>
                                    <span className='text-gray-500'>Sin imagen</span>
                                </div>
                            )}
                        </div>
                        <h1 className='text-3xl font-bold lg:text-2xl xl:text-3xl mt-4'>{project.name}</h1>
                    </div>
                    
                    {project.instagramProfile && (
                        <div className='flex mt-5 flex-wrap px-2 h-fit justify-center w-full mx-auto'>
                            <a
                                href={`https://instagram.com/${String(project.instagramProfile).replace('@','')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='flex items-center justify-center text-yellow-400 my-1 hover:underline'
                            >
                                <InstagramIcon />
                                <span className='ml-2'>@{project.instagramProfile}</span>
                            </a>
                        </div>
                    )}
                    {Array.isArray(project.categories) && project.categories.length > 0 && (
                        <div className='flex flex-wrap gap-2 mt-3 justify-center px-2'>
                            {project.categories.map((c) => (
                                <Link key={c.id} href={`/emprendimientos?categoryId=${c.id}`} className='px-2 py-1 text-xs font-medium rounded bg-yellow-400 text-indigo-900 hover:bg-yellow-300'>
                                    {c.name}
                                </Link>
                            ))}
                        </div>
                    )}
                    
                    {project.user && (
                        <div className='flex mt-5 flex-wrap px-2 h-fit justify-center w-full mx-auto'>
                            <p className='text-yellow-400 my-1 text-center w-full'>
                                {`${project.user.name} ${project.user.lastName}`}
                            </p>
                            <p className='text-yellow-400 my-1 text-center w-full'>
                                {project.user.email}
                            </p>
                        </div>
                    )}
                </div>
                
                <div className='w-full mt-4 sm:w-full sm:min-h-[65%] lg:w-[65%] lg:my-2 lg:mr-4'>
                    <div className='w-full flex justify-end mb-2'>
                        {user && (
                            isOwner ? (
                                <Link href={`/editar-emprendimiento/${id}`} className='inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1.5 px-3 rounded-md'>
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5h2m-1 0v14m9-7H3" />
                                    </svg>
                                    Editar emprendimiento
                                </Link>
                            ) : (
                                <button onClick={() => setIsReportOpen(true)} className='inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-1.5 px-3 rounded-md'>
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                    </svg>
                                    Reportar emprendimiento
                                </button>
                            )
                        )}
                    </div>
                    <div className='my-2'>
                        <p className='text-lg font-bold w-full text-left mb-1'>Descripción:</p>
                        {renderDescription(project.description)}
                    </div>
                </div>
            </div>
            {/* Comments section outside of the blue container for better readability */}
            <div className='w-full px-6 sm:px-9 lg:px-12 mb-8'>
                <div className='bg-white rounded-2xl p-5 shadow-sm'>
                    <CommentsSection projectId={id} />
                </div>
            </div>
        </div>
    );
}

export default ProjectDetail; 