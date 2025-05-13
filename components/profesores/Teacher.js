import Link from 'next/link'
import React, { useRef, useEffect, useState } from 'react'

function Star() {
  return (
      <svg
          className={`h-[1.6rem] w-[1.6rem] text-yellow-500 fill-current align-middle place-items-center`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 19 19"
          fill="none"
          stroke="currentColor"
      >
          <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M10 1l1.912 4.67 4.864.353-3.575 3.107.993 4.839-4.194-2.48-4.194 2.48.993-4.839-3.575-3.107 4.864-.353L10 1z"
          />
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
      setIsMobile(window.innerWidth < 768); // 768px es un punto de quiebre común para móviles
    };
    
    checkIfMobile(); // Comprobar al cargar
    
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
        (sum, child) => sum + child.offsetWidth + 8, 0); // 8px por los márgenes
      
      setShouldCenterCourses(totalWidth <= container.offsetWidth);
      setShowRightArrow(!isMobile && totalWidth > container.offsetWidth);
      
      // Añadir listener para el evento scroll
      container.addEventListener('scroll', checkArrows);
      
      return () => {
        container.removeEventListener('scroll', checkArrows);
      };
    }
  }, [props.coursesInfo, isMobile]);

  return (
    <Link href={`profesores/${props.id}`} className='relative overflow-hidden group cursor-pointer bg-indigo-800 text-white rounded-[30px] p-6 h-72 w-72'>
        <div className='absolute w-fit h-fit bg-gradient from-100% to-transparent translate-x-8 translate-y-[15px]'>
            <img src={props.photo} alt="Foto profesor" className='relative object-cover mx-auto rounded-lg w-44 h-44'/>
            <div className='absolute translate-y-8 top-0 left-0 w-full h-full bg-gradient-to-t from-indigo-800 to-transparent '></div>
        </div>
        <div className='absolute w-[85%] mx-auto top-4 flex items-center'>
          {!isMobile && showLeftArrow && (
            <button 
              onClick={(e) => { e.preventDefault(); scrollLeft(); }} 
              className="absolute left-[-15px] z-10 bg-indigo-900 rounded-full p-1 opacity-80 hover:opacity-100"
            >
              <ArrowLeft />
            </button>
          )}
          <div 
            ref={coursesRef}
            onScroll={checkArrows}
            className={`w-full h-fit flex ${shouldCenterCourses ? 'justify-center' : 'justify-start'} overflow-x-auto scrollbar-hide whitespace-nowrap py-1 transition-all`}
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
              <h2 key={index} className='bg-yellow-400 font-bold w-fit h-fit rounded-sm px-1 mx-[4px] my-[2px] text-black text-sm flex-shrink-0'>{ramo}</h2>
            ))}
          </div>
          {!isMobile && showRightArrow && (
            <button 
              onClick={(e) => { e.preventDefault(); scrollRight(); }} 
              className="absolute right-[-15px] z-10 bg-indigo-900 rounded-full p-1 opacity-80 hover:opacity-100"
            >
              <ArrowRight />
            </button>
          )}
        </div>
        <div className='absolute bottom-6 left-0 right-0 overflow-hidden transition-all group-hover:bottom-16'>
          <h1 className='mx-auto w-full overflow-hidden whitespace-nowrap text-ellipsis font-bold text-center drop-shadow-[0_2px_3px_rgba(0,0,0,.6)] group-hover:drop-shadow-[0_2px_5px_rgba(0,0,0,.85)] transition-all text-xl'>{fullName}</h1>
        </div>
        <div className='absolute h-fit flex justify-center items-center w-full left-0 right-0 mx-auto opacity-0 group-hover:opacity-100 transition-all bottom-6'>
          <Star /> <h2 className='place-items-center font-semibold ml-1'>{roundToTwo(props.avgRating) ? roundToTwo(props.avgRating) : "-"}</h2>
        </div>
    </Link>
  )
}

export default Teacher;