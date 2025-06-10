"use client";
import ProjectForm from "../components/emprendimientos/ProjectForm";
import { AuthContextProvider } from '../components/context/AuthContext'
import '../app/globals.css'

export default function PostularEmprendimientoPage() {  
  return (
    <AuthContextProvider>
      <ProjectForm />
    </AuthContextProvider>
  )
} 