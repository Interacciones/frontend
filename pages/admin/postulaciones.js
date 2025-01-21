"use client";
import Postulations from "../../components/admin/postulaciones/postulations";
import { AuthContextProvider } from '../../components/context/AuthContext'
import '../../components/globals.css'

export default function Postulaciones() {  
 return (
    <AuthContextProvider>
        <Postulations/>
    </AuthContextProvider>
)
}