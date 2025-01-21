"use client";
import LoginPage from "../../components/admin/login/login";
import { AuthContextProvider } from '../../components/context/AuthContext'
import '../../components/globals.css'

export default function Login() {  
 return (
    <AuthContextProvider>
      <LoginPage/>
    </AuthContextProvider>
)
}