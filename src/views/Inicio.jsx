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
        refreshInterval: 1000 // esto es para que los cambios se actualicen en tiempo real (sin refrescar page) en 1s
    })

    /* console.log(data)
    console.log(error)
    console.log(isLoading) */

    if (isLoading) return 'Cargando...'

    /** Para filtrar los productos */
    const productos = data.data.filter(producto => producto.categoria_id === categoriaActual.id);

	return (
        <>
            <h1 className='text-4xl font-extrabold mt-1'>{categoriaActual.nombre}</h1>
            <p className='text-2xl my-4'>Elige y personaliza tu pedido a continuación.</p>

            <div className='grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
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
