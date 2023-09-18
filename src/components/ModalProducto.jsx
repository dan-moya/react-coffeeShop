import { useState, useEffect } from 'react';
import useKiosco from '../hooks/useKiosco';
import { formatearDinero } from '../helpers';

export default function ModalProducto() {
	const { producto, handleClickModal, handleAgregarProducto, pedido } = useKiosco();
    const [cantidad, setCantidad] = useState(1); // el valor inicial es 1, es decir, que desde esa cantidad podra aumentar o reducir la cantidad de productos que desee
    const [edicion, setEdicion] = useState(false)



    /** useEffect, siempre va a tener un callback,
     * Y lo que está entre [] se lo conoce como el arreglo de independencias, y las dependencias son opcionales y no obligatorias. Si le pasamos el arreglo vacío tal cual [], la función del useEffect se ejecutará solo una vez*/
    useEffect(() => {
        /** La variable pedidoState es temporal. Y esta condicional es para saber si el producto que se agregó al resumen está en la lista o no.*/
        if (pedido.some( pedidoState => pedidoState.id === producto.id )) {
            //console.log('Si está en el pedido')
            // y si el producto ya está en la lista, necesitamos extraer la cantidad (y esa cantidad está en pedido)
            /** la variable productoEdicion es para modificar el producto */
            const productoEdicion = pedido.filter( pedidoState => pedidoState.id === producto.id  )[0]
            setCantidad(productoEdicion.cantidad)
            setEdicion(true)
        }
    }, [pedido]);

	return (
		<div className="md:flex gap-5 max-w-xl">
			<div className="flex items-center w-1/2">
			{/* <div className="md:w-1/3"> */}
				<img
                    src={`/img/${producto.imagen}.jpg`}
                    alt={`Imagen Producto ${producto.nombre}`}
                    className='shadow-lg rounded-sm'
                />
			</div>

			<div className={`${producto.nombre.length > 18 ? '' : 'md:w-2/3'}`}>
			{/* <div className="md:w-2/3"> */}
                <div className="flex justify-end">
                    <button onClick={handleClickModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:text-red-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>

                <h1 className='text-3xl font-bold mt-2.5'>
                    {producto.nombre}
                </h1>

                <p className='mt-3 font-black text-2xl text-amber-500'>
                    {formatearDinero(producto.precio)}
                </p>

                <div className='flex justify-center gap-4 mt-5'>
                    <button
                        type='button'
                        onClick={() => {
                            /** para validar que no tenga valores negativos */
                            if (cantidad <= 1) return
                            setCantidad(cantidad - 1)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                    <p className='text-3xl'>{cantidad}</p>
                    <button
                        type='button'
                        onClick={() => {
                            /** para validar que no pase de 5 productos */
                            if (cantidad >= 5) return
                            setCantidad(cantidad + 1)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>

                <div className='flex justify-center'>
                {/** los 3 puntos antes de producto es para que la cantidad sea parte del arreglo, y no separado (para ver la diferencia quitar los 3 puntos y ver la consola y comparar si la colocamos) */}
                    <button
                        type="button"
                        className='bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-3 text-white font-bold uppercase
                        rounded'
                        onClick={() => {
                            handleAgregarProducto({...producto, cantidad})
                            handleClickModal()
                        }}
                    >
                        {edicion ? 'Guardar Cambios' : 'Añadir al Pedido'}
                    </button>
                </div>
            </div>
		</div>
	);
}
