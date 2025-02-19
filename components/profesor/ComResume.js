'use client';
import React from 'react';

function Star({ filled, color, size }) {
    return (
        <svg
            className={`h-${size} w-${size} text-${color} ${filled ? 'fill-current' : 'stroke-current'} align-middle`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 17.7 17.7"
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

const Resume = ({ reviews, average }) => {
  const totalReviews = reviews.length;
  const stars = [0, 0, 0, 0, 0];   // 5 estrellas, 4 estrellas, 3 estrellas, 2 estrellas, 1 estrella, 0 estrellas
  const starsCount = [0, 0, 0, 0, 0];   // 5 estrellas, 4 estrellas, 3 estrellas, 2 estrellas, 1 estrella, 0 estrellas

  // Calcula la cantidad de reseñas por estrellas
  reviews.forEach(review => {
    stars[5 - review.rating]++;
    starsCount[5 - review.rating]++;
  });

  // Calcula el promedio de estrellas
  const totalStars = stars.reduce((acc, count, index) => acc + count * (index + 1), 0);
  const averageStars = totalReviews > 0 ? (totalStars / totalReviews).toFixed(1) : 0;

  // Calcula el porcentaje de reseñas por estrellas
  const starPercentages = stars.map((count, index) => ({
    rating: index + 1,
    percentage: totalReviews > 0 ? ((count / totalReviews) * 100).toFixed(1) : 0,
  }));

  function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
  }

  return (
    <div className="md:w-1/2 lg:w-1/3 m-2 py-3 px-5 bg-white rounded-md shadow-md">
        <div className='flex place-items-center px-3'>
            <Star filled={true} color={"yellow-500"} size={5} />
            <h1 className='font-bold ml-1'>{roundToTwo(average)} <span className='font-normal text-gray-500'>({totalReviews} reseñas)</span></h1>
        </div>
        <div className='p-0'>
            {[5, 4, 3, 2, 1].map(starRating => (
                <div key={starRating} className="bg-gray-200 rounded-md h-6 my-2 p-0 overflow-hidden">
                    <div style={{ width: `${starPercentages[5 - starRating]?.percentage}%` }} className={`h-6 bg-yellow-400 place-items-center px-0 align-middle`}>
                        <div className='flex w-screen place-items-center h-full mx-2 items-center align-middle'>
                            <div className='flex items-center align-middle h-fit'>
                                {[...Array(starRating)].map((_, index) => (
                                    <Star key={index} filled={true} color={"black"} size={3} />
                                ))}
                            </div>
                            <h1 className='font-semibold ml-1 text-sm'>{starPercentages[5 - starRating]?.percentage}% <span className='font-normal'>({starsCount[5 - starRating]})</span></h1>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}

export default Resume;