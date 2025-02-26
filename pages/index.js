"use client";
import Page from "../components/home";
import { AuthContextProvider } from '../components/context/AuthContext'
import '../app/globals.css'

export default function Index() {  
 return (
    <AuthContextProvider>
        <Page/>
    </AuthContextProvider>
)
}