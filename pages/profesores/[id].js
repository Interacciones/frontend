"use client";
import Page from "../../components/profesor/Profesor";
import { AuthContextProvider } from '../../components/context/AuthContext';
import '../../app/globals.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RouteLoader from "../../components/components/RouteLoader";
import Header from '../../components/components/Header';
import Footer from '../../components/components/Footer';

export default function Profesor() {
    const [teacher, setTeacher] = useState(null);
    const [comments, setComments] = useState([]);
    const router = useRouter();
    const id = router.query.id;
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const getData = async () => {
            if (!id) return;
            try {
                const teacherRes = await fetch(`https://interserver.lat/tutors/${id}?cacheBuster=${new Date().getTime()}`,
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
                setTeacher(teacherData.data);
                setComments(teacherData.data.reviews);
                setLoaded(true);
            } catch (error) {
                console.error(error);
            }
        };
        getData();
    }, [id]);

    return (
        <AuthContextProvider>
            {loaded ? (
                <>
                    <Header />
                    <Page teacher={teacher} comments={comments} id={id} />
                    <Footer />
                </>
            ) : (
                <RouteLoader />
            )}
        </AuthContextProvider>
    );
}
