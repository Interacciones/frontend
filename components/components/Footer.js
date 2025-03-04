import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 py-6 items-center">
            <span className="flex justify-center">Links de Interes</span>
            <section className="flex justify-center">
                <div className="inline-block">
                    <div className="m-6 inline-flex items-center">
                        <div className="flex flex-col items-center w-1/4">
                            <a href="https://buscacursos.uc.cl/" title="Buscador de Cursos UC" target="_blank">
                                <div className="inline-flex items-center">
                                    <img className="h-12 w-auto" src="/favicon.png" alt="Buscador de Cursos UC"></img>
                                    <span className="m-4 text-sm">Buscador de Cursos UC</span>
                                </div>
                            </a>
                        </div>
                        <div className="flex flex-col items-center w-1/4">
                            <a href="https://cai.cl/" title="Centro de Alumnos de Ingeniería" target="_blank">
                                <div className="inline-flex items-center">
                                    <img className="h-12 w-auto" src="https://www.ing.uc.cl/wp-content/uploads/2017/01/cai.png" alt="Centro de Alumnos de Ingeniería"></img>
                                    <span className="m-4 text-sm">Centro de Alumnos de Ingeniería</span>
                                </div>
                            </a>
                        </div>
                        <div className="flex flex-col items-center w-1/4">
                            <a href="https://www.ing.uc.cl/" title="Ingeniería UC" target="_blank">
                                <div className="inline-flex items-center">
                                    <img className="h-12 w-auto" src="/icon.ico" alt="Ingeniería UC"></img>
                                    <span className="m-4 text-sm">Ingeniería UC</span>
                                </div>
                            </a>
                        </div>
                        <div className="flex flex-col items-center w-1/4">
                            <a href="https://mallastest.ing.uc.cl/" title="Nuevo Planner" target="_blank">
                                <div className="inline-flex items-center">
                                    <img className="h-12 w-auto" src="/logo.png" alt="Nuevo Planner"></img>
                                    <span className="m-4 text-sm">Nuevo Planner</span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
      </footer>
    );
};

export default Footer;