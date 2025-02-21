import Link from 'next/link'
import React from 'react'

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

function Teacher( {props} ) {
  const fullName = `${props.name} ${props.lastName}`;

  function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
  }

  return (
    <Link href={`profesores/${props.id}`} className='relative overflow-hidden group cursor-pointer bg-indigo-800 text-white rounded-[30px] p-6 h-72 w-72'>
        <div className='absolute w-fit h-fit bg-gradient from-100% to-transparent translate-x-8 translate-y-[15px]'>
            <img src={props.photo} alt="Foto profesor" className='relative object-cover mx-auto rounded-lg w-44 h-44'/>
            <div className='absolute translate-y-8 top-0 left-0 w-full h-full bg-gradient-to-t from-indigo-800 to-transparent '></div>
        </div>
        <div className='absolute h-fit self-center flex flex-wrap justify-center w-[85%] mx-auto translate-y-[-15px] group-hover:-translate-y-44 transition-all place-self-center'>
          {props.coursesInfo.map((ramo, index) =>
            {
              return <h2 key={index} className='bg-yellow-400 font-bold w-fit h-fit rounded-sm px-1 mx-[4px] my-[2px] text-black text-sm'>{ramo}</h2>
            }
          )}
        </div>
        <div className='absolute h-fit self-center flex flex-wrap justify-center w-[85%] mx-auto place-self-center -translate-y-40 group-hover:translate-y-[-15px] transition-all'>
          <Star /> <h2 className='place-items-center font-semibold'>{roundToTwo(props.avgRating)? roundToTwo(props.avgRating) : "-"}</h2>
        </div>
        <div className='overflow-hidden'>
          <h1 className='mx-auto w-full overflow-hidden whitespace-nowrap text-ellipsis font-bold text-center drop-shadow-[0_2px_3px_rgba(0,0,0,.6)] group-hover:drop-shadow-[0_2px_5px_rgba(0,0,0,.85)] transition-all text-xl mt-32'>{fullName}</h1>
          <p className='text-justify text-ellipsis overflow-hidden w-full drop-shadow-[0_2px_3px_rgba(0,0,0,.6)] group-hover:drop-shadow-[0_2px_5px_rgba(0,0,0,.85)] transition-all text-sm mt-1 h-[35%]'>{props.description}</p>
        </div>
    </Link>
  )
}

export default Teacher