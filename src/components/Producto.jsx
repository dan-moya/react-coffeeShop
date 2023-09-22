/** Directamente llama a la carpeta helpers, porque el archivo JS se llama index, y ya no es necesario llamarlo al .js */
import { formatearDinero } from "../helpers";
import useKiosco from "../hooks/useKiosco";

/** El parámetro es lo que recibe del otro archivo (Inicio.jsx) que crea los props, en este caso lo que está dentro de la llamada que hace al componente el archivo Inicio.jsx <Producto producto={producto} />, es decir, no pasa de este a otro, sino que recupera del otro. */
export default function Producto({ producto, botonAgregar = false, botonDisponible = false }) {

    const { handleClickModal, handleSetProducto, handleClickProductoAgotado } = useKiosco();

    const { nombre, imagen, precio } = producto;

    /** Los returns son solo para mostrar información, y si queremos algo de lógica (funciones, validaciones, etc) JS debemos hacerlo antes del return */
	return (
		<div className="border p-3 shadow bg-white rounded-md">
			<img
                src={`/img/${imagen}.jpg`}
                alt={`imagen ${nombre}`}
                className="w-full rounded-sm object-cover object-center"
            />

            <div className="p-2 sm:p-5">
                <h3 className="text-sm sm:text-lg md:text-xl font-semibold">{nombre}</h3>
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
                        className="bg-amber-600 hover:bg-amber-700 text-white text-sm w-full mt-5 p-3 uppercase font-bold rounded-md"
                        onClick={() => handleClickProductoAgotado(producto.id)}
                    >
                        Producto Agotado
                    </button>
                )}
            </div>
		</div>
	);
}
