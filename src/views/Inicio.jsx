//import { productos as data } from '../data/productos'; // desde api manual
import  useSWR  from 'swr';
import Producto from '../components/Producto';
import useKiosco from '../hooks/useKiosco';
import clienteAxios from '../config/axios';

export default function Inicio() {

    /** Una vez que importamos nuestro hook (useKiosco), y dentro de las llaves debemos colocar el mismo nombre que está en el value de KioscoProvider.jsx */
    const { categoriaActual } = useKiosco();

    // Consulta SWR
    const token = localStorage.getItem('AUTH_TOKEN');
    const fetcher = () => clienteAxios('/api/productos', {
        headers: {
			Authorization: `Bearer ${token}`
		}
    }).then(data => data.data)
    const { data, error, isLoading } = useSWR('/api/productos', fetcher, {
        refreshInterval: 1000 // esto es para que los cambios se actualicen en tiempo real (sin refrescar page) en 1s (1000)
    })

    /* console.log(data)
    console.log(error)
    console.log(isLoading) */

    if (isLoading) return 'Cargando...'

    /** Para filtrar los productos */
    const productos = data.data.filter(producto => producto.categoria_id === categoriaActual.id);

	return (
        <>
            <div className='sm:mx-1 2xl:mt-4'>
                <h1 className='text-3xl md:text-4xl font-extrabold mt-1 2xl:text-6xl'>{categoriaActual.nombre}</h1>
                <p className='text-lg my-2.5 sm:text-xl sm:my-4 2xl:text-3xl'>Elige y personaliza tu pedido a continuación</p>
            </div>

            <div className='grid gap-3 grid-cols-2 sm:grid-cols-3 sm:gap-2 md:grid-cols-3 min-[920px]:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4'>
                {productos.map(producto => (
                    <Producto
                        key={producto.imagen}
                        producto={producto}
                        botonAgregar={true}
                    />
                ))}
            </div>
        </>
    );
}
