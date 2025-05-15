"use client";
import Emprendimientos from "../components/emprendimientos/emprendimientos";
import { AuthContextProvider } from '../components/context/AuthContext'
import '../app/globals.css'

export default function EmprendimientosPage() {  
 return (
    <AuthContextProvider>
        <Emprendimientos/>
    </AuthContextProvider>
)
} 