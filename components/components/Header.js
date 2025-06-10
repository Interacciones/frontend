"use client"; // This is a client component
import { useState, useEffect } from 'react'
import { Dialog, Popover, Transition } from '@headlessui/react'
import {
    XMarkIcon,
    Bars3Icon,
} from '@heroicons/react/24/outline'
import { UserAuth } from '../context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { user, logout } = UserAuth();
    const router = useRouter();

    // Add scroll effect for header
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle logout
    const handleLogout = async () => {
        try {
            await logout();
            router.push('/');
        } catch (error) {
            console.error('Error during logout', error);
        }
    };

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${
            scrolled 
                ? 'bg-gradient-to-r from-indigo-900 to-indigo-800 shadow-md' 
                : 'bg-gradient-to-r from-indigo-800 to-indigo-700'
        }`}>
            <div className="mx-auto max-w-7xl">
                <nav className="flex items-center justify-between px-6 py-4 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="flex items-center gap-2 p-1.5 rounded-lg transition-all hover:bg-indigo-700/50">
                            {/* You can replace this with an actual logo image if available */}
                            {/* <div className="bg-white h-8 w-8 rounded-full flex items-center justify-center">
                                <span className="text-indigo-800 font-bold text-lg">I</span>
                            </div> */}
                            <span className="sr-only">INTERACCIONES</span>
                            <span className="text-white text-2xl font-bold tracking-tight">INTERACCIONES</span>
                        </Link>
                    </div>
                    
                    {/* Mobile menu button */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-full p-2.5 text-white hover:bg-indigo-700/50 transition-all"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Abrir menu principal</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    
                    {/* Desktop navigation */}
                    <Popover.Group className="hidden lg:flex lg:gap-x-8">
                        <Link 
                            href="/profesores" 
                            className={`text-sm font-semibold leading-6 px-3 py-2 rounded-full transition-all ${
                                router.pathname === '/profesores' 
                                    ? 'text-white bg-indigo-600' 
                                    : 'text-indigo-100 hover:bg-indigo-700/50'
                            }`}
                        >
                            Buscar Profesor Particular
                        </Link>
                        <Link 
                            href="/preguntas" 
                            className={`text-sm font-semibold leading-6 px-3 py-2 rounded-full transition-all ${
                                router.pathname === '/preguntas' 
                                    ? 'text-white bg-indigo-600' 
                                    : 'text-indigo-100 hover:bg-indigo-700/50'
                            }`}
                        >
                            Preguntas Frecuentes
                        </Link>
                        <Link 
                            href="/contacto" 
                            className={`text-sm font-semibold leading-6 px-3 py-2 rounded-full transition-all ${
                                router.pathname === '/contacto' 
                                    ? 'text-white bg-indigo-600' 
                                    : 'text-indigo-100 hover:bg-indigo-700/50'
                            }`}
                        >
                            Contacto
                        </Link>
                        {user && (
                            <Link 
                                href="/perfil" 
                                className={`text-sm font-semibold leading-6 px-3 py-2 rounded-full transition-all ${
                                    router.pathname === '/perfil' 
                                        ? 'text-white bg-indigo-600' 
                                        : 'text-indigo-100 hover:bg-indigo-700/50'
                                }`}
                            >
                                Perfil
                            </Link>
                        )}
                    </Popover.Group>
                    
                    {/* User authentication buttons */}
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {user ? (
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex items-center text-sm font-semibold leading-6 px-4 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all"
                            >
                                <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 019.75 18h-5.5A2.25 2.25 0 012 15.75V4.25z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M7.22 7.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l.97-.97H6.75a.75.75 0 010-1.5h1.44l-.97-.97a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>
                                Cerrar Sesión
                            </button>
                        ) : (
                            <Link 
                                href="/login" 
                                className="flex items-center text-sm font-semibold leading-6 px-4 py-2 bg-white text-indigo-800 rounded-full hover:bg-indigo-50 transition-all"
                            >
                                Inicio de Sesión
                                <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 019.75 18h-5.5A2.25 2.25 0 012 15.75V4.25z" clipRule="evenodd" />
                                    <path fillRule="evenodd" d="M7.22 7.97a.75.75 0 011.06 0l2.25 2.25a.75.75 0 010 1.06l-2.25 2.25a.75.75 0 01-1.06-1.06l.97-.97H6.75a.75.75 0 010-1.5h1.44l-.97-.97a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </nav>
            </div>
            
            {/* Mobile menu */}
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                            <div className="flex items-center gap-2">
                                <div className="bg-indigo-800 h-8 w-8 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">I</span>
                                </div>
                                <span className="text-indigo-800 text-xl font-bold">INTERACCIONES</span>
                            </div>
                        </Link>
                        <button
                            type="button"
                            className="rounded-full p-2.5 text-gray-700 hover:bg-gray-100"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Cerrar menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link 
                                    href="/profesores" 
                                    className={`-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 ${
                                        router.pathname === '/profesores' 
                                            ? 'bg-indigo-50 text-indigo-800' 
                                            : 'text-gray-900 hover:bg-gray-50'
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Buscar Profesor Particular
                                </Link>
                                <Link 
                                    href="/preguntas" 
                                    className={`-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 ${
                                        router.pathname === '/preguntas' 
                                            ? 'bg-indigo-50 text-indigo-800' 
                                            : 'text-gray-900 hover:bg-gray-50'
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Preguntas Frecuentes
                                </Link>
                                <Link 
                                    href="/contacto" 
                                    className={`-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 ${
                                        router.pathname === '/contacto' 
                                            ? 'bg-indigo-50 text-indigo-800' 
                                            : 'text-gray-900 hover:bg-gray-50'
                                    }`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Contacto
                                </Link>
                                {user && (
                                    <Link 
                                        href="/perfil" 
                                        className={`-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 ${
                                            router.pathname === '/perfil' 
                                                ? 'bg-indigo-50 text-indigo-800' 
                                                : 'text-gray-900 hover:bg-gray-50'
                                        }`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Perfil
                                    </Link>
                                )}
                            </div>
                            
                            <div className="py-6">
                                {user ? (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            handleLogout();
                                            setMobileMenuOpen(false);
                                        }}
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 bg-indigo-800 text-white hover:bg-indigo-700"
                                    >
                                        Cerrar Sesión
                                    </button>
                                ) : (
                                    <Link 
                                        href="/login" 
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 bg-indigo-800 text-white hover:bg-indigo-700"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Inicio de Sesión
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}