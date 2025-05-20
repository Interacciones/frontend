import Link from 'next/link'
import React, { useRef, useEffect, useState } from 'react'

function FilledStar() {
  return (
      <svg
          className="h-5 w-5 text-yellow-400 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
      >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
  );
}

function EmptyStar() {
  return (
      <svg
          className="h-5 w-5 text-gray-300 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
      >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
  );
}

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

function Teacher({ props }) {
  const fullName = `${props.name} ${props.lastName}`;

  function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
  }

  // Determinar si los cursos deben estar centrados o no
  const [shouldCenterCourses, setShouldCenterCourses] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const coursesRef = useRef(null);
  
  const scrollLeft = () => {
    if (coursesRef.current) {
      coursesRef.current.scrollBy({ left: -100, behavior: 'smooth' });
      checkArrows();
    }
  };

  const scrollRight = () => {
    if (coursesRef.current) {
      coursesRef.current.scrollBy({ left: 100, behavior: 'smooth' });
      checkArrows();
    }
  };

  const checkArrows = () => {
    if (!coursesRef.current || isMobile) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = coursesRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
  };

  // Detectar si es un dispositivo móvil
  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // When on mobile, always allow horizontal scrolling
      if (mobile && coursesRef.current) {
        setShouldCenterCourses(false);
      }
    };
    
    checkIfMobile();
    
    window.addEventListener('resize', checkIfMobile);
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);
  
  useEffect(() => {
    if (coursesRef.current) {
      // Comprobar si los cursos exceden el ancho del contenedor
      const container = coursesRef.current;
      const totalWidth = Array.from(container.children).reduce(
        (sum, child) => sum + child.offsetWidth + 8, 0);
      
      setShouldCenterCourses(totalWidth <= container.offsetWidth);
      setShowRightArrow(!isMobile && totalWidth > container.offsetWidth);
      
      container.addEventListener('scroll', checkArrows);
      
      return () => {
        container.removeEventListener('scroll', checkArrows);
      };
    }
  }, [props.coursesInfo, isMobile]);

  const rating = roundToTwo(props.avgRating);
  
  return (
    <Link href={`profesores/${props.id}`} className="block h-full">
      <div className="relative h-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
        {/* Imagen de fondo con degradado */}
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900 via-indigo-800 to-indigo-700"></div>
        
        {/* Imagen del profesor */}
        <div className="relative pt-6 px-6 flex justify-center">
          <div className="relative w-36 h-36 overflow-hidden rounded-full border-4 border-white shadow-inner">
            <img src={props.photo || "https://via.placeholder.com/150"} alt={fullName} className="w-full h-full object-cover" />
          </div>
        </div>
        
        {/* Información del profesor */}
        <div className="relative px-6 pt-4 pb-8">
          {/* Nombre */}
          <h3 className="text-xl font-bold text-white text-center truncate mb-2">{fullName}</h3>
          
          {/* Rating */}
          <div className="flex items-center justify-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(rating) ? <FilledStar /> : <EmptyStar />}
                </span>
              ))}
            </div>
            <span className="ml-2 text-sm font-semibold text-white">{rating ? rating : "-"}</span>
          </div>
          
          {/* Cursos */}
          <div className="relative">
            {!isMobile && showLeftArrow && (
              <button 
                onClick={(e) => { e.preventDefault(); scrollLeft(); }} 
                className="absolute inset-y-0 left-0 z-10 flex items-center justify-center w-6 bg-indigo-900 bg-opacity-80 rounded-l-md"
              >
                <ArrowLeft />
              </button>
            )}
            
            <div 
              ref={coursesRef}
              onScroll={checkArrows}
              className={`w-full flex ${shouldCenterCourses ? 'justify-center' : 'justify-start'} overflow-x-auto scrollbar-hide gap-1.5 py-2 px-2 ${isMobile ? 'touch-pan-x' : ''}`}
            >
              <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
              `}</style>
              

              {props.coursesInfo.map((ramo, index) => (
                <span 
                  key={index} 
                  className="inline-block px-2 py-1 text-xs font-medium rounded bg-yellow-400 text-indigo-900 whitespace-nowrap"
                >
                  {ramo}
                </span>
              ))}
            </div>
            
            {!isMobile && showRightArrow && (
              <button 
                onClick={(e) => { e.preventDefault(); scrollRight(); }} 
                className="absolute inset-y-0 right-0 z-10 flex items-center justify-center w-6 bg-indigo-900 bg-opacity-80 rounded-r-md"
              >
                <ArrowRight />
              </button>
            )}
          </div>
        </div>
        
        {/* Overlay con botón de ver perfil */}
        <div className="absolute inset-0 bg-indigo-900 bg-opacity-80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <span className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-900 bg-white hover:bg-indigo-50 transition-all">
            Ver perfil
          </span>
        </div>
      </div>
    </Link>
  );
}

export default Teacher;