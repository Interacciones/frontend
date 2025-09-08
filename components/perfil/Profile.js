import Content from './Content';
import Link from 'next/link';

function Page({ user, project }) {
    return (
        <>
            {user !== null ? (
                <Content user={user} project={project} />
            ) : (
                <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-md">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100">
                            <svg className="h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="mt-4 text-2xl font-bold text-gray-900">Usuario no encontrado</h2>
                        <p className="mt-2 text-base text-gray-600">No se encontró el usuario solicitado. Por favor, inténtalo de nuevo más tarde.</p>
                        <div className="mt-6">
                            <Link href="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all">
                                Volver al inicio
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Page;