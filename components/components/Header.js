"use client"; // This is a client component
import { useState } from 'react'
import { Dialog, Popover } from '@headlessui/react'
import {
    XMarkIcon,
    Bars3Icon,
} from '@heroicons/react/24/outline'
import { UserAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { user, logout } = UserAuth();

    return (
        <header className="bg-indigo-800 border border-blue-600">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link href="/" className="p-0">
                        <span className="sr-only">INTERACCIONES</span>
                        <span className="text-white text-4xl font-bold hover:text-gray-500">INTERACCIONES</span>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Abrir menu principal</span>
                        <Bars3Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">
                    <Link href="/profesores" className="text-sm font-semibold leading-6 text-white hover:text-gray-500">
                        Buscar Profesor Particular
                    </Link>
                    <Link href="/contacto" className="text-sm font-semibold leading-6 text-white hover:text-gray-500">
                        Contacto
                    </Link>
                    {user && (
                        <Link href="/perfil" className="text-sm font-semibold leading-6 text-white hover:text-gray-500">
                            Perfil
                        </Link>
                    )}
                </Popover.Group>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {user ? (
                        <button
                            type="button"
                            className="text-sm font-semibold leading-6 text-white hover:text-gray-500"
                            onClick={logout}
                        >
                            Cerrar Sesión
                        </button>
                    ) : (
                        <Link href="/login" className="text-sm font-semibold leading-6 text-white hover:text-gray-500">
                            Inicio de Sesión <span aria-hidden="true">&rarr;</span>
                        </Link>
                    )}
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="p-0">
                            <span className="sr-only">INTERACCIONES</span>
                            <span className="text-gray-900 text-4xl font-bold hover:text-gray-500">INTERACCIONES</span>
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Cerrar menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link href="/profesores" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                    Buscar Profesor Particular
                                </Link>
                                <Link href="/contacto" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                    Contacto
                                </Link>
                                {user && (
                                    <Link href="/perfil" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                        Perfil
                                    </Link>
                                )}
                            </div>
                            <div className="py-6">
                                {user ? (
                                    <button
                                        type="button"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        onClick={logout}
                                    >
                                        Cerrar Sesión
                                    </button>
                                ) : (
                                    <Link href="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
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