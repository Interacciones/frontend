import React from "react";
import Comment from "./Comment";
import CommentForm from "./ComForm";
import Resume from "./ComResume";

export default function CommentSection({ id, average, comments, email, reviewAmount, oneStarReviews, twoStarReviews, threeStarReviews, fourStarReviews, fiveStarReviews }) {
    const sortedComments = comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="h-6 w-6 text-indigo-800 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                </svg>
                Valoraciones y comentarios
            </h2>
            
            <CommentForm tutorId={id} email={email} />
            
            {comments?.length === 0 ? (
                <div className="bg-white rounded-xl shadow-md p-10 text-center">
                    <div className="inline-block mb-4 p-3 bg-indigo-100 rounded-full">
                        <svg className="h-10 w-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Aún no hay reseñas</h3>
                    <p className="text-gray-600">Sé el primero en compartir tu experiencia con este profesor</p>
                </div>
            ) : (
                <>
                    <Resume 
                        average={average} 
                        reviewAmount={reviewAmount} 
                        oneStarReviews={oneStarReviews} 
                        twoStarReviews={twoStarReviews} 
                        threeStarReviews={threeStarReviews} 
                        fourStarReviews={fourStarReviews} 
                        fiveStarReviews={fiveStarReviews} 
                    />
                    
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {sortedComments.length} {sortedComments.length === 1 ? 'comentario' : 'comentarios'}
                            </h3>
                            
                            <div className="flex items-center text-sm text-indigo-700">
                                <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"></path>
                                </svg>
                                Ordenados por más recientes
                            </div>
                        </div>
                        
                        {sortedComments.map((comment) => (
                            <Comment key={comment.id} comment={comment} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}