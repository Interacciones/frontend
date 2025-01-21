"use client";
import Profesors from "../components/profesores/profesors";
import { AuthContextProvider } from '../components/context/AuthContext'
import '../components/globals.css'

export default function Profesores() {  
 return (
    <AuthContextProvider>
        <Profesors/>
    </AuthContextProvider>
)
}