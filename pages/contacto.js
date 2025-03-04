"use client";
import Contact from "../components/contacto/contact";
import { AuthContextProvider } from '../components/context/AuthContext'
import '../app/globals.css'

export default function Contacto() {  
 return (
    <AuthContextProvider>
        <Contact/>
    </AuthContextProvider>
)
}