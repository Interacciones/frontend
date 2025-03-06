"use client";
import Page from "../components/perfil/Profile";
import { AuthContextProvider } from '../components/context/AuthContext';
import '../app/globals.css';
import React, { useEffect, useState } from 'react';
import RouteLoader from "../components/components/RouteLoader";
import Header from '../components/components/Header';
import Footer from '../components/components/Footer';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/firebase";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

export default function Perfil() {
    const [user, setUser] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [route, setRoute] = useState('');

    const handleClose = () => {
        setOpen(false);
        window.location.href = route;
    };

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                setOpen(true);
                setMessage('Debes iniciar sesión para ver tu perfil');
                setRoute('/login');
            } else if (!currentUser.emailVerified) {
                setOpen(true);
                setMessage('Debes verificar tu correo para ver tu perfil');
                setRoute('/');
            } else {
                const getData = async () => {
                    try {
                        const userRes = await fetch(`http://localhost:3000/users-self`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                                'Cache-Control': 'no-cache',
                                'Pragma': 'no-cache',
                                'Authorization': `Bearer ${currentUser.stsTokenManager.accessToken}`
                            }
                        });
                        const userData = await userRes.json();
                        setUser(userData.data);
                        setLoaded(true);
                    } catch (error) {
                        console.log(error);
                    }
                };
                getData();
            }
        });
    }, []);

    return (
        <AuthContextProvider>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cerrar</Button>
                </DialogActions>
            </Dialog>
            {loaded ? (
                <>
                    <Header />
                    <Page user={user} />
                    <Footer />
                </>
            ) : (
                <RouteLoader />
            )}
        </AuthContextProvider>
    );
}
