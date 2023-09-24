import useSWR from 'swr';
import clienteAxios from '../config/axios';
import Producto from '../components/Producto'


export default function Productos() {

	const token = localStorage.getItem('AUTH_TOKEN');
	const fetcher = () => clienteAxios('/api/productos', {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}).then(datos => datos.data)

	const { data, error, isLoading } = useSWR('/api/productos', fetcher, {refreshInterval: 10000})

	if(isLoading) return 'Cargando...'
	
	// console.log(data.data)

	return (
		<div>
			<div className='sm:mx-1 2xl:mt-4'>
				<h1 className="text-2xl sm:text-4xl font-extrabold tracking-wider">Productos</h1>
                <p className="text-lg mt-1 mb-5 sm:text-2xl sm:my-2">Maneja la disponibilidad desde aquí.</p>
            </div>

			<div className='grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
                {data.data.map(producto => (
                    <Producto
                        key={producto.imagen}
                        producto={producto}
						botonDisponible={true}
                    />
                ))}
            </div>
		</div>
	);
}
