import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import Loader from "./Loader";
import LoadingIndicator from "./LoadingIndicator";

export default function AdminSidebar() {

    const { logout, user } = useAuth({middleware: 'auth'});

    const [cerrarSesion, setCerrarSesion] = useState(false);

    const handleCerrarSesion = async () => {
        setCerrarSesion(true);
        try {
            await logout(); // Supongamos que logout es una función asincrónica
        } catch (error) {
            console.error(error);
        } finally {
            setCerrarSesion(false);
        }
    }


	return (
		<aside className="flex flex-col
                            sm:w-full
                            md:w-64 md:h-screen
                            lg:flex-col
                            xl:w-64"
        >
			<div className="flex items-center order-first
                            sm:gap-x-10 sm:justify-center
                            md:flex-col md:w-full
                            lg:flex-row lg:items-center lg:justify-center lg:w-full"
            >
                {/* LOGO */}
                <div className="p-2 w-full flex justify-between items-center sm:w-1/2 md:w-auto">
                    <img
                        src="../img/logo.svg"
                        alt="Imagen Logo"
                        className="w-32 sm:w-40 lg:w-44 xl:w-48 2xl:w-60"
                    />
                    <div className="mt-7 px-5 md:hidden bg-white md:my-3 sm:text-lg ">
                        <button
                            type="button"
                            className={`text-center bg-red-500 w-full p-2.5 sm:px-3 font-bold text-white truncate rounded-md hover:bg-red-600 ${cerrarSesion ? 'opacity-50 cursor-no-drop' : ''}`}
                            onClick={handleCerrarSesion}
                            disabled={cerrarSesion}
                        >
                            {cerrarSesion ? (
                                    <div className="flex items-center justify-center">
                                        <Loader /> Saliendo ...
                                    </div>
                                ) : (
                                    'Cerrar Sesión'
                                )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="my-2 px-3 bg-white 2xl:mt-10 sm:text-center">
                <p className="text-lg font-medium sm:text-xl xl:text-xl 2xl:text-2xl">
                    Bienvenido(a): <br className="hidden md:inline-block"/>
                    <span className="font-semibold 2xl:text-3xl"> {user?.name}</span>
                </p>
                <hr className="my-3"/>
            </div>

            <nav className="grid grid-cols-2 p-4 gap-4 sm:grid-cols-2 md:grid-cols-1">
                <Link to="/admin" className="font-bold text-lg rounded-md shadow-lg p-2 flex justify-between items-center bg-amber-50 sm:text-xl">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#ea580c" d="M18 3h-3.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H6c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h6.11a6.743 6.743 0 0 1-1.42-2H6V5h2v1c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V5h2v5.08c.71.1 1.38.31 2 .6V5c0-1.1-.9-2-2-2zm-6 2c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1zm5 7c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5zm1.29 7l-1.65-1.65a.51.51 0 0 1-.15-.35v-2.49c0-.28.22-.5.5-.5s.5.22.5.5v2.29l1.5 1.5a.495.495 0 1 1-.7.7z"/>
                    </svg>
                    <span>Órdenes</span>
                </Link>
                <Link to="/admin/productos" className="font-bold text-lg rounded-md shadow-md p-2 flex justify-between items-center bg-amber-50 sm:text-xl">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#ea580c" d="m1344 2l704 352v785l-128-64V497l-512 256v258l-128 64V753L768 497v227l-128-64V354L1344 2zm0 640l177-89l-463-265l-211 106l497 248zm315-157l182-91l-497-249l-149 75l464 265zm-507 654l-128 64v-1l-384 192v455l384-193v144l-448 224L0 1735v-676l576-288l576 288v80zm-640 710v-455l-384-192v454l384 193zm64-566l369-184l-369-185l-369 185l369 184zm576-1l448-224l448 224v527l-448 224l-448-224v-527zm384 576v-305l-256-128v305l256 128zm384-128v-305l-256 128v305l256-128zm-320-288l241-121l-241-120l-241 120l241 121z"/>
                    </svg>
                    <span>Productos</span>
                </Link>
            </nav>

            <div className="my-3 px-5 hidden md:inline-block order-2 xl:order-last xl:text-lg 2xl:text-2xl 2xl:my-5">
                <button
                    type="button"
                    className={`text-center bg-red-500 w-full p-2.5 font-bold text-white truncate rounded-md hover:bg-red-600 xl:tracking-wide ${cerrarSesion ? 'opacity-50 cursor-no-drop' : ''}`}
                    onClick={handleCerrarSesion}
                    disabled={cerrarSesion}
                >
                    <LoadingIndicator show={cerrarSesion} text="Saliendo..." />
                    {!cerrarSesion && 'Cerrar Sesión'}
                </button>
            </div>
		</aside>
	);
}
