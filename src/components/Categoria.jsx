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
            className={
                `${categoriaActual.id === id ? "bg-amber-400" : "bg-white"}
                flex items-center gap-2.5 border w-full p-3 hover:bg-amber-400 cursor-pointer rounded-md shadow-md
                sm:gap-4
                lg:shadow-none
                xl:rounded-none xl:border-t-0 xl:border-x-0
                2xl:py-6`}
            onClick={() => handleClickCategoria(id)}
        >
			<img
                src={`/img/icono_${icono}.svg`}
                alt="Imagen icono"
                className="w-12 2xl:w-14"
            />

            {/** cuando demos click llamará a la función handleClickCategoria, lo cual irá al KioscoProvider y hará lo que esté en ese archivo (de esa función).
             * Y el hecho de colocar un callback en el onClick es para que la función no se llame automáticamente, sino que espere el evento, que en este caso es el Onclick
            */}
			<button
                type='button'
                className="text-lg font-bold cursor-pointer truncate lg:text-xl lg:tracking-wider 2xl:text-2xl"
                // onClick={() => handleClickCategoria(id)}
            >
                {nombre}
            </button>
		</div>
	);
}
