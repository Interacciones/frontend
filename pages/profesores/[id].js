"use client";
import Page from "../../components/profesor/Profesor";
import { AuthContextProvider } from '../../components/context/AuthContext'
import '../../components/globals.css'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RouteLoader from "../../components/components/RouteLoader";
import Header from '../../components/components/Header';
import Footer from '../../components/components/Footer';

export default function Profesor() {
    const [teacher, setTeacher] = useState(null);
    const [comments, setComments] = useState(null);
    const router = useRouter();
    const id = router.query.id;
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const getData = async () => {
            if (!id) return;
            try {
                const teacherRes = await fetch(`https://raitesting.me/tutors/getTutor/${id}?cacheBuster=${new Date().getTime()}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-cache',
                            'Pragma': 'no-cache',
                        }
                    }
                    );
                    const teacherData = await teacherRes.json();
                    setTeacher(teacherData);
                    const commentsRes = await fetch(`https://raitesting.me/reviews/getByTutor/${id}?cacheBuster=${new Date().getTime()}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-cache',
                            'Pragma': 'no-cache',
                        },
                    });
                    const commentsData = await commentsRes.json();
                    setComments(commentsData);
                    setLoaded(true);
                } catch (error) {
                    console.log(error);
                }
            }
            getData();
        }, [id]);
        
        return (
            <AuthContextProvider>
        {loaded ? (
            <>
                <Header />
                    <Page teacher={teacher} comments={comments} id={id}/>
                <Footer />
            </>
        ) : (
        <RouteLoader/>
        )}
    </AuthContextProvider>
)
}
