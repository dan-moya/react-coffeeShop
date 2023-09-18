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
        <aside className="md:w-72">
            <div className="p-2">
                <img
                    src="img/logo.svg"
                    alt="Imagen Logo"
                    className="w-32"
                />
            </div>

            <p className="mt-2.5 my-1 px-3 text-lg font-medium">Bienvenido(a): {user?.name}</p>
            <hr />

            <div className="mt-5">
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

            <div className="my-3 px-5">
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
        </aside>
    );
}
