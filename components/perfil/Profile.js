import Content from './Content';

function Page({ user }) {
    return (
        <>
            {user !== null ? (
                <Content user={user} />
            ) : (
                <div className='min-h-screen flex flex-wrap text-black bg-gray-100 justify-start'>
                    <h2 className='mx-auto my-auto text-lg sm:text-2xl md:text-4xl xl:text-5xl'>
                        <span className='font-bold'>¡Ups!</span>
                        No se encontró el usuario solicitado.
                        <br/>
                        Intentalo denuevo más tarde.
                    </h2>
                </div>
            )}
        </>
    );
}

export default Page;