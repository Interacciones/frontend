import Content from './Content';

function Page({ id, teacher, comments }) {
    return (
        <>
            {teacher !== null ? (
                <Content teacher={teacher} comments={comments} id={id} />
            ) : (
                <div className='min-h-screen flex flex-wrap text-black bg-gray-100 justify-start'>
                    <h2 className='mx-auto my-auto text-lg sm:text-2xl md:text-4xl xl:text-5xl'>
                        <span className='font-bold'>¡Ups!</span>
                        No se encontró ningún profesor con ese ID.
                        <br/>
                        Intentalo denuevo más tarde.
                    </h2>
                </div>
            )}
        </>
    );
}

export default Page;