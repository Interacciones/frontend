"use client"
import Preguntas from '../components/preguntas/Preguntas';
import { AuthContextProvider } from '../components/context/AuthContext';
import '../app/globals.css';

export default function PreguntasFrecuentes() {
  return (
    <AuthContextProvider>
        <Preguntas />
    </AuthContextProvider>
  )
}