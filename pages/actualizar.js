"use client";
import Update from "../components/actualizar/update";
import { AuthContextProvider } from '../components/context/AuthContext'
import '../components/globals.css'

export default function Actualizar() {  
 return (
    <AuthContextProvider>
        <Update/>
    </AuthContextProvider>
)
}