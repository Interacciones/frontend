import Link from 'next/link';
import React, { useState } from 'react';

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
      className="h-5 w-5" 
      fill="currentColor" 
      viewBox="0 0 24 24">
      <path 
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function Project({ props }) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const hasMultiplePhotos = props.photos && props.photos.length > 1;

  const nextPhoto = (e) => {
    e.preventDefault();
    if (hasMultiplePhotos) {
      setCurrentPhotoIndex((prev) => 
        prev === props.photos.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevPhoto = (e) => {
    e.preventDefault();
    if (hasMultiplePhotos) {
      setCurrentPhotoIndex((prev) => 
        prev === 0 ? props.photos.length - 1 : prev - 1
      );
    }
  };

  return (
    <Link href={`/emprendimientos/${props.id}`} className='relative overflow-hidden group cursor-pointer bg-indigo-800 text-white rounded-[30px] p-6 h-80 w-80'>
        <div className='absolute inset-0 w-full h-full bg-indigo-900/20 transition-opacity opacity-0 group-hover:opacity-100'></div>
        
        {/* Photo display */}
        <div className='relative h-40 w-full mb-4'>
          {props.photos && props.photos.length > 0 ? (
            <img 
              src={props.photos[currentPhotoIndex]} 
              alt={props.name} 
              className='w-full h-full object-cover rounded-lg'
            />
          ) : (
            <div className='w-full h-full bg-gray-300 rounded-lg flex items-center justify-center'>
              <span className='text-gray-500'>Sin imagen</span>
            </div>
          )}
          
          {/* Navigation arrows for photos */}
          {hasMultiplePhotos && (
            <>
              <button 
                onClick={prevPhoto}
                className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity'
              >
                <ArrowLeft />
              </button>
              <button 
                onClick={nextPhoto}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity'
              >
                <ArrowRight />
              </button>
            </>
          )}
        </div>

        {/* Project name */}
        <h1 className='font-bold text-xl mb-3 text-center'>{props.name}</h1>
        
        {/* Instagram profile centered */}
        {props.instagramProfile && (
          <div className='flex items-center justify-center gap-1 mt-auto'>
            <InstagramIcon />
            <span className='text-sm'>@{props.instagramProfile}</span>
          </div>
        )}
    </Link>
  )
}

export default Project; 