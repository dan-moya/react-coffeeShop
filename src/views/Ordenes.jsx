import useSWR from 'swr';
import useKiosco from '../hooks/useKiosco'
import clienteAxios from '../config/axios';
import { formatearDinero } from '../helpers';
import { useState } from 'react';
// import { toast } from "react-toastify";
import LoadingIndicator from '../components/LoadingIndicator';

export default function Ordenes() {


    const token = localStorage.getItem('AUTH_TOKEN')
    const fetcher = () => clienteAxios('/api/pedidos', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    //refreshInterval para que cada segundo se esté revalidando la información de los pedidos
    //const { data, error, isLoading } = useSWR('/api/pedidos', fetcher)
    const { data, error, isLoading } = useSWR('/api/pedidos', fetcher, {refreshInterval: 1000})
    // console.log(data)
    /* console.log(data?.data)
    console.log(error)
    console.log(isLoading) */
    const { handleClickCompletarPedido } = useKiosco()
    const [pedidoEnProceso, setPedidoEnProceso] = useState(null);


    if(isLoading) return 'Cargando...'

	return (
        <div>
            <div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-wider xl:mt-2">Órdenes</h1>
                <p className="text-lg mt-1 mb-5 sm:text-2xl sm:my-2 xl:my-3">Administra las órdenes desde aquí</p>
            </div>

            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2'>
                {/* El segundo data es porque la colección así lo retorna */}
                {data.data.data.map(pedido => (
                    <div key={pedido.id} className='p-5 bg-white shadow space-y-2 border-b rounded-md'>
                        <p className='text-2xl font-bold text-slate-700 border-b'>
                            Contenido del Pedido:
                        </p>

                        <p className='text-xl font-bold text-slate-600'>
                            Cliente: {''}
                            <span className='font-normal'>{pedido.user.name}</span>
                        </p>

                        <div className='md:grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'>
                            {pedido.productos.map(producto => (
                                <div
                                    key={producto.id}
                                    className='border-b border-b-slate-200 last-of-type:border-none py-4 flex gap-4 items-center'
                                >
                                    {/* <p>ID: {producto.id}</p> */}
                                    <img
                                        src={`/img/${producto.imagen}.jpg`}
                                        alt={`imagen ${producto.nombre}`}
                                        className="rounded-md w-24 h-full sm:w-20 md:w-16 md:h-auto lg:w-24"
                                    />
                                    <div>
                                        <p className='text-xl font-bold'>{producto.nombre}</p>
                                        <p className='space-x-1 text-amber-400'>
                                            {/* Cantidad: {''} */}
                                            <span className='text-xl font-bold'>X</span>
                                            <span className='font-extrabold text-4xl'>{producto.pivot.cantidad}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>


                        <p className='text-xl font-bold text-amber-500 tracking-wide'>
                            Total a Pagar: {''}
                            <span className='font-bold text-slate-900'>{formatearDinero(pedido.total)}</span>
                        </p>

                        <div className='flex justify-end'>
                            <button
                                type="button"
                                className={`bg-indigo-600 mt-2 hover:bg-indigo-800 px-7 py-2 rounded-md uppercase font-bold text-white text-center w-auto cursor-pointer tracking-wider text-base ${pedidoEnProceso === pedido.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={async () => {
                                    setPedidoEnProceso(pedido.id);
                                    await handleClickCompletarPedido(pedido.id);
                                    setPedidoEnProceso(null);
                                }}
                                disabled={pedidoEnProceso === pedido.id}
                            >
                                <div className="flex items-center justify-center">
                                    {/* {pedidoEnProceso === pedido.id && <Loader />}
                                    {pedidoEnProceso === pedido.id && <span className="ml-2">Espere...</span>} */}
                                    <LoadingIndicator show={pedidoEnProceso === pedido.id} text="Espere..." />
                                </div>
                                {pedidoEnProceso !== pedido.id && 'Completar'}
                            </button>
                        </div>
                    </div>
                ))}

            </div>
        </div>
	);
}
