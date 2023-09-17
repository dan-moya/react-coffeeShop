// importamos el hook
import useKiosco from '../hooks/useKiosco';

/** El parámetro {categoria} es la comunicación entre Sidebar.jsx y Categoría.jsx, es decir, trae los props */
export default function Categoria({ categoria }) {

    /** para la categoría que se está haciendo click */
    const { handleClickCategoria, categoriaActual } = useKiosco();

	/** En vez de escribir, categoria.x, categoria.y, categoria.z, etc etc, es decir, en vez de acceder a cada elemento uno por uno, podemos hacer un "destraction" */
	const { icono, id, nombre } = categoria; // dentro de las llaves van los atributos que tiene el arreglo de categoria

	// console.log(categoria)

	return (
		<div
            className={`${categoriaActual.id === id ? "bg-amber-400" : "bg-white"} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}
            onClick={() => handleClickCategoria(id)}
        >
			<img
                src={`/img/icono_${icono}.svg`}
                alt="Imagen icono"
                className="w-12"
            />

            {/** cuando demos click llamará a la función handleClickCategoria, lo cual irá al KioscoProvider y hará lo que esté en ese archivo (de esa función).
             * Y el hecho de colocar un callback en el onClick es para que la función no se llame automáticamente, sino que espere el evento, que en este caso es el Onclick
            */}
			<button
                type='button'
                className="text-lg font-bold cursor-pointer truncate"
                // onClick={() => handleClickCategoria(id)}
            >
                {nombre}
            </button>
		</div>
	);
}
