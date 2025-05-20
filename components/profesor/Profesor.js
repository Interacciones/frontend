import Content from './Content';

function Page({ id, teacher, comments }) {
    return (
        <>
            {teacher !== null ? (
                <Content teacher={teacher} comments={comments} id={id} />
            ) : (
                <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                    <div className="bg-white rounded-xl shadow-md p-8 max-w-md text-center">
                        <div className="inline-block mb-6 p-4 bg-red-100 rounded-full">
                            <svg className="h-12 w-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Ups! Profesor no encontrado</h1>
                        <p className="text-gray-600 mb-6">
                            No se encontró ningún profesor con ese ID. Es posible que haya sido eliminado o que la URL no sea correcta.
                        </p>
                        <a 
                            href="/profesores" 
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-800 hover:bg-indigo-700 transition-colors"
                        >
                            Volver a la lista de profesores
                        </a>
                    </div>
                </div>
            )}
        </>
    );
}

export default Page;