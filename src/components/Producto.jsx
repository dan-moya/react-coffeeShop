/** Directamente llama a la carpeta helpers, porque el archivo JS se llama index, y ya no es necesario llamarlo al .js */
import { formatearDinero } from "../helpers";
import useKiosco from "../hooks/useKiosco";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import LoadingIndicator from "./LoadingIndicator";

/** El parámetro es lo que recibe del otro archivo (Inicio.jsx) que crea los props, en este caso lo que está dentro de la llamada que hace al componente el archivo Inicio.jsx <Producto producto={producto} />, es decir, no pasa de este a otro, sino que recupera del otro. */
export default function Producto({ producto, botonAgregar = false, botonDisponible = false }) {

    const { user } = useAuth({middleware: 'auth'});
    const isAdmin = user && user.admin === 1;
    // console.log(user)

    const { handleClickModal, handleSetProducto, handleClickProductoAgotado } = useKiosco();

    const [botonEnProceso, setBotonEnProceso] = useState(false);

    const { nombre, imagen, precio, disponible } = producto;
    // console.log(producto.disponible === 0)

    /** Los returns son solo para mostrar información, y si queremos algo de lógica (funciones, validaciones, etc) JS debemos hacerlo antes del return */
	return (
		<div className="border p-3 shadow bg-white rounded-md">
			<img
                src={`/img/${imagen}.jpg`}
                alt={`imagen ${nombre}`}
                className="w-full rounded-sm object-cover object-center"
            />

            <div className="p-2 sm:p-5">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold">{nombre}</h3>
                <p className="mt-1.5 font-black text-lg sm:mt-2 sm:text-xl text-amber-500">
                    { formatearDinero(precio) }
                </p>

                {botonAgregar && (
                    <button
                        type="button"
                        className="bg-amber-600 hover:bg-amber-700 text-white w-full mt-3 sm:mt-3.5 md:mt-5 p-2 sm:p-2.5 uppercase font-bold rounded-md tracking-wide text-sm sm:text-sm 2xl:text-xl"
                        onClick={() => {
                            handleClickModal();
                            handleSetProducto(producto);
                        }}
                    >
                        Agregar
                    </button>
                )}

                {botonDisponible && (
                    <button
                        type="button"
                        className={`${disponible ? 'bg-amber-600 hover:bg-amber-700' : 'bg-green-700 hover:bg-green-600'
                        } text-white w-full mt-3 sm:mt-3.5 md:mt-5 p-1.5 sm:p-2.5 uppercase font-bold rounded-md tracking-wide text-sm sm:text-sm 2xl:text-xl ${botonEnProceso ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={async () => {
                            setBotonEnProceso(true);
                            if (isAdmin) {
                                await handleClickProductoAgotado(producto.id, producto.disponible)
                                // toast.success(disponible ? 'Producto Agotado' : 'Producto Disponible');
                                /* toast[disponible ? 'success' : 'warning'](
                                    disponible ? 'Producto Disponible' : 'Producto Agotado'
                                ); */
                            }
                            setBotonEnProceso(false);
                        }}
                        disabled={botonEnProceso}
                    >
                        <LoadingIndicator show={botonEnProceso} text="Espere..." />
                        {!botonEnProceso && (disponible ? 'Marcar Agotado' : 'Hacer disponible')}
                    </button>
                )}
            </div>
		</div>
	);
}
