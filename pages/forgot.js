"use client";
import ForgotPage from "../components/forgot/forgot";
import { AuthContextProvider } from '../components/context/AuthContext'
import '../app/globals.css'

export default function Forgot() {  
 return (
    <AuthContextProvider>
        <ForgotPage/>
    </AuthContextProvider>
)
}