import React from 'react';
import CommentSection from './ComSect';
import TeacherInfo from './TeacherInfo';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Content({ teacher, comments, id }) {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-gray-50 py-10">
                <TeacherInfo teacher={teacher} />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                    <CommentSection 
                        id={id} 
                        average={teacher.avgRating} 
                        comments={comments} 
                        email={teacher.email} 
                        reviewAmount={teacher.reviewAmount} 
                        oneStarReviews={teacher.oneStarReviews} 
                        twoStarReviews={teacher.twoStarReviews} 
                        threeStarReviews={teacher.threeStarReviews} 
                        fourStarReviews={teacher.fourStarReviews} 
                        fiveStarReviews={teacher.fiveStarReviews} 
                    />
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Content;
