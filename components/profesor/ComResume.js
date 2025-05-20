'use client';
import React from 'react';

function Star({ filled }) {
    return (
        <svg
            className={`h-5 w-5 ${filled ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
    );
}

const Resume = ({ average, reviewAmount, oneStarReviews, twoStarReviews, threeStarReviews, fourStarReviews, fiveStarReviews }) => {
  const starsCount = [fiveStarReviews, fourStarReviews, threeStarReviews, twoStarReviews, oneStarReviews];

  // Calcula el porcentaje de reseñas por estrellas
  const starPercentages = starsCount.map((count, index) => ({
    rating: 5 - index,
    percentage: reviewAmount > 0 ? ((count / reviewAmount) * 100).toFixed(1) : 0,
    count: count
  }));

  function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
  }

  const ratingValue = roundToTwo(average);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <svg className="h-6 w-6 text-indigo-800 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
          </svg>
          Valoraciones y opiniones
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Puntuación total */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-indigo-900">{ratingValue}</div>
            <div className="flex items-center my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} filled={i < Math.floor(ratingValue)} />
              ))}
            </div>
            <div className="text-sm text-gray-500">{reviewAmount} valoraciones</div>
          </div>

          {/* Barras de progreso */}
          <div className="lg:col-span-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const data = starPercentages[5 - rating];
              return (
                <div key={rating} className="flex items-center mb-2">
                  <div className="flex items-center w-24">
                    <span className="text-sm font-medium text-gray-700 mr-2">{rating}</span>
                    <Star filled={true} />
                  </div>
                  <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${data.percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-16 text-right">
                    <span className="text-xs font-medium text-gray-500">{data.count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;