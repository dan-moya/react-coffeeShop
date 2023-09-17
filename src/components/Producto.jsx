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
                className="w-full object-cover object-center"
            />

            <div className="p-5">
                <h3 className="text-xl font-semibold">{nombre}</h3>
                <p className="mt-3 font-black text-2xl text-amber-500">
                    { formatearDinero(precio) }
                </p>
                {botonAgregar && (
                    <button
                        type="button"
                        className="bg-amber-600 hover:bg-amber-700 text-white w-full mt-5 p-2.5 uppercase font-bold rounded-md tracking-wide"
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
