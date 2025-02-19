import React from 'react';
import CommentSection from './ComSect';
import TeacherInfo from './TeacherInfo';

function Content({ teacher, comments, id }) {
    return (
        <>
            <div className="min-h-screen flex flex-wrap text-black bg-gray-100 justify-start">
                <TeacherInfo teacher={teacher} />
                <CommentSection id={id} average={teacher.average} comments={comments} email={teacher.email} />
            </div>
        </>
    );
}

export default Content;
