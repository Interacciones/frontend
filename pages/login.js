"use client";
import LoginPage from "../components/login/login";
import { AuthContextProvider } from '../components/context/AuthContext'
import '../app/globals.css'

export default function Login() {  
 return (
    <AuthContextProvider>
        <LoginPage/>
    </AuthContextProvider>
)
}