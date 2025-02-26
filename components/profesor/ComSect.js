import React from "react";
import Comment from "./Comment";
import CommentForm from "./ComForm";
import Resume from "./ComResume";

export default function CommentSection({ id, average, comments, email, reviewAmount, oneStarReviews, twoStarReviews, threeStarReviews, fourStarReviews, fiveStarReviews }) {
    return (
        <div className="w-full">
            <CommentForm tutorId={id} email={email} />
            <div className="mt-4">
                {comments?.length === 0 ? (
                    <div className='flex flex-wrap my-10 h-32 text-black bg-gray-100 justify-start'>
                        <h2 className='mx-auto text-lg sm:text-2xl md:text-4xl xl:text-5xl'><span className="font-bold">Aún no hay reseñas.</span><br />Se el primero en comentar.</h2>
                    </div>
                ) : (
                    <div>
                        <Resume average={average} reviewAmount={reviewAmount} oneStarReviews={oneStarReviews} twoStarReviews={twoStarReviews} threeStarReviews={threeStarReviews} fourStarReviews={fourStarReviews} fiveStarReviews={fiveStarReviews} />
                        {comments?.length === 0 ? (
                            <div>No hay comentarios</div>
                            ) : (
                            <div>
                                {comments.map((comment) => (
                                <Comment key={comment.id} comment={comment} />
                                ))}
                            </div>
                            )}
                    </div>
                )}
            </div>
        </div>
    )
}