import { useState } from "react";
import useKiosco from "../hooks/useKiosco";
import Categoria from "./Categoria";
// movemos las categorias hacia el provider (KioscoProvider)
// import { categorias } from "../data/categorias";
import { useAuth } from "../hooks/useAuth";
import Loader from "./Loader";

export default function Sidebar() {

    /** lo que está dentro de las llaves es lo que tenemos en el value de KioscoProvider */
    const { categorias } = useKiosco();
    const { logout, user } = useAuth({middleware: 'auth'})
    const [cancelarOrden, setCancelarOrden] = useState(false);

    const handleCancelarOrden = async () => {
        setCancelarOrden(true);
        try {
            await logout(); // Supongamos que logout es una función asincrónica
        } catch (error) {
            console.error(error);
        } finally {
            setCancelarOrden(false);
        }
    }

	return (
        // <aside className="w-full sm:w-1 md:w-72">
        <aside className="flex flex-col
                            sm:w-full
                            md:w-screen md:flex-row-reverse
                            lg:flex-col xl:w-72 xl:justify-between"
        >
            <div className="flex items-center order-first
                            sm:gap-x-10
                            md:flex-col md:w-2/5
                            lg:flex-row lg:items-center lg:justify-center lg:w-full
                            xl:flex-col xl:items-start"
            >
                {/* LOGO */}
                <div className="p-2 w-1/2 flex justify-center sm:w-auto">
                    <img
                        src="img/logo.svg"
                        alt="Imagen Logo"
                        className="w-32 sm:w-40 md:w-32 lg:w-44 xl:w-40 2xl:w-60"
                        />
                </div>
                <div className="flex flex-col w-2/3
                                sm:flex-row-reverse sm:w-full sm:items-end sm:justify-center sm:gap-x-10
                                md:flex-col md:items-center md:justify-center
                                lg:w-auto"
                >
                    <div className="my-2 px-3 bg-white 2xl:mt-10">
                        <p className="text-lg font-medium lg:text-xl xl:text-lg 2xl:text-2xl">
                            Bienvenido(a): <br className="hidden 2xl:inline-block"/>
                            <span className="font-semibold 2xl:text-3xl"> {user?.name}</span>
                        </p>
                        <hr />
                    </div>
                    <div className="mt-7 px-5 xl:hidden bg-white md:my-3 lg:text-lg">
                        <button
                            type="button"
                            className={`text-center bg-red-500 w-full p-2.5 font-bold text-white truncate rounded-md hover:bg-red-600 ${cancelarOrden ? 'opacity-50 cursor-no-drop' : ''}`}
                            onClick={handleCancelarOrden}
                            disabled={cancelarOrden}
                        >
                            {cancelarOrden ? (
                                    <div className="flex items-center justify-center">
                                        <Loader /> Saliendo ...
                                    </div>
                                ) : (
                                    'Cancelar Orden'
                                )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-4 sm:mt-5 order-last grid grid-cols-2 gap-x-0.5
                            sm:grid-cols-3 sm:px-1
                            md:grid-cols-2 md:mt-1 md:w-3/5 md:gap-1
                            lg:grid-cols-6 lg:w-screen
                            xl:w-72 xl:grid-cols-1 xl:gap-0 xl:px-0
                            ">
                {/* Map itera y genera un nuevo arreglo de las categorias, o cualquier arreglo en general
                y Foreach solo itera, y en nuestro caso queremos que genere un nuevo arreglo */}
                {/** En el map se está utilizando un callback, pero cuando no hay lógica dentro y directamente se quiere retornar algo se coloca paréntesis "..." => (), pero si hay lógica se debe utilizar llaves y después el retorno en paréntesis "..." => { lógica....... return ( ... )  }, el hecho de los paréntesis es de react y el map de js */}
                {categorias.map( categoria => (
                    /** En vez de iterar cada uno, vamos a crear un componente y esta acción se la conoce como "props"
                     * y los props son argumentos que se pasan entre componentes de React, de esa manera, si un componente tiene cierta información se la pueda pasar a otro componente; ese es caso de las categorías, que en otro componente específico de las categorías tiene toda la info, y dentro de este "map" iterará y renderizará ese componente
                    */
                    // <p>{categoria.nombre}</p>
                    <Categoria
                        key={categoria.id}
                        categoria={categoria}
                    />

                    /** La parte de la izquierda es el "prop" (se recomienda nombrarlo igual) y el de la derecha su valor
                     * El "key" es un prop especial debido a que React se queda esperando siempre que estemos iterando una colección, y este caso el arreglo, pero ese key no necesariamente tiene que ser el id de algo, sino que algo que sea único, un ejemplo, es que si una img es única, pues no hay problema en pasarlo, la cosa es que espera algo único.
                     */
                ))}
            </div>

            <div className="my-3 px-5 hidden xl:inline-block order-2 xl:order-last 2xl:text-2xl 2xl:my-5">
                <button
                    type="button"
                    className={`text-center bg-red-500 w-full p-2.5 font-bold text-white truncate rounded-md hover:bg-red-600 2xl:p-3 ${cancelarOrden ? 'opacity-50 cursor-no-drop' : ''}`}
                    onClick={handleCancelarOrden}
                    disabled={cancelarOrden}
                >
                    {cancelarOrden ? (
							<div className="flex items-center justify-center">
								<Loader /> Saliendo ...
							</div>
						) : (
							'Cancelar Orden'
						)}
                </button>
            </div>
        </aside>
    );
}
