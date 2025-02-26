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

const Resume = ({ average, reviewAmount, oneStarReviews, twoStarReviews, threeStarReviews, fourStarReviews, fiveStarReviews }) => {
  const starsCount = [fiveStarReviews, fourStarReviews, threeStarReviews, twoStarReviews, oneStarReviews];

  // Calcula el porcentaje de reseñas por estrellas
  const starPercentages = starsCount.map((count, index) => ({
    rating: 5 - index,
    percentage: reviewAmount > 0 ? ((count / reviewAmount) * 100).toFixed(1) : 0,
  }));

  function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
  }

  return (
    <div className="md:w-1/2 lg:w-1/3 m-2 py-3 px-5 bg-white rounded-md shadow-md">
        <div className='flex items-center px-3'>
            <Star filled={true} color={"yellow-500"} size={4} />
            <h1 className='font-bold ml-2'>{roundToTwo(average)} <span className='font-normal text-gray-500'>({reviewAmount} reseñas)</span></h1>
        </div>
        <div className='p-0'>
            {[5, 4, 3, 2, 1].map(starRating => (
                <div key={starRating} className="bg-gray-200 rounded-md h-6 my-2 p-0 overflow-hidden relative group">
                    <div style={{ width: `${starPercentages[5 - starRating]?.percentage}%` }} className={`h-6 bg-yellow-400 flex items-center px-0`}>
                        <div className='flex items-center h-full mx-2'>
                            <div className='flex items-center'>
                                {[...Array(starRating)].map((_, index) => (
                                    <Star key={index} filled={true} color={"black"} size={3} />
                                ))}
                            </div>
                            <h1 className='font-semibold ml-2 text-sm whitespace-nowrap'>{starsCount[5 - starRating]} <span className='font-normal'>({starPercentages[5 - starRating]?.percentage}%)</span></h1>
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {starsCount[5 - starRating]} ({starPercentages[5 - starRating]?.percentage}%)
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}

export default Resume;