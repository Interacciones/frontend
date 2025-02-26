"use client";
import Postulate from "../components/postular/postulate";
import { AuthContextProvider } from '../components/context/AuthContext'
import '../app/globals.css'

export default function Postular() {  
 return (
    <AuthContextProvider>
        <Postulate/>
    </AuthContextProvider>
)
}