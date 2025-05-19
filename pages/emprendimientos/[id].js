"use client";
import ProjectDetail from "../../components/emprendimientos/ProjectDetail";
import { AuthContextProvider } from '../../components/context/AuthContext';
import '../../app/globals.css';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RouteLoader from "../../components/components/RouteLoader";
import Header from '../../components/components/Header';
import Footer from '../../components/components/Footer';

export default function Emprendimiento() {
    const [project, setProject] = useState(null);
    const router = useRouter();
    const id = router.query.id;
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const getData = async () => {
            if (!id) return;
            try {
                const projectRes = await fetch(`http://localhost:3000/projects/${id}?cacheBuster=${new Date().getTime()}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Cache-Control': 'no-cache',
                            'Pragma': 'no-cache',
                        }
                    }
                );
                const projectData = await projectRes.json();
                setProject(projectData.data);
                setLoaded(true);
            } catch (error) {
                console.error(error);
                setLoaded(true); // Still set loaded to true so we show error state
            }
        };
        getData();
    }, [id]);

    return (
        <AuthContextProvider>
            {loaded ? (
                <>
                    <Header />
                    <ProjectDetail id={id} project={project} />
                    <Footer />
                </>
            ) : (
                <RouteLoader />
            )}
        </AuthContextProvider>
    );
} 